import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar, FlatList, Alert,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../theme/colors';
import { HistoryEntry, loadHistory, clearHistory, formatTimestamp } from '../utils/historyData';

const HistoryScreen = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const data = await loadHistory();
    setHistory(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleClear = () => {
    Alert.alert(
      'Clear History',
      'Delete all calculation history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All', style: 'destructive',
          onPress: async () => {
            await clearHistory();
            setHistory([]);
          },
        },
      ]
    );
  };

  const handleUse = (entry: HistoryEntry) => {
    router.push({
      pathname: '/calculator',
      params: { recallExpr: entry.expression, recallResult: entry.result },
    } as any);
  };

  const renderItem = ({ item, index }: { item: HistoryEntry; index: number }) => (
    <TouchableOpacity
      style={[styles.card, index === 0 && styles.cardFirst]}
      onPress={() => handleUse(item)}
      activeOpacity={0.75}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.expr} numberOfLines={1}>{item.expression}</Text>
        <Text style={styles.result}>= {item.result}</Text>
        <View style={styles.meta}>
          <Text style={styles.badge}>{item.angleMode}</Text>
          <Text style={styles.time}>{formatTimestamp(item.timestamp)}</Text>
        </View>
      </View>
      <Text style={styles.recallIcon}>↩</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          {history.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.titleRow}>
          <View style={styles.brandBar}>
            <Text style={styles.brandText}>CASIO</Text>
          </View>
          <Text style={styles.title}>Calculation History</Text>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Loading…</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🧮</Text>
          <Text style={styles.emptyText}>No history yet</Text>
          <Text style={styles.emptyHint}>Complete a calculation to see it here</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Footer */}
      {history.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{history.length} / 50 entries  •  tap any entry to recall it</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.calcBody,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: Colors.keyDefault,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backText: {
    color: Colors.shiftLabel,
    fontSize: 12,
    fontWeight: '600',
  },
  clearBtn: {
    backgroundColor: Colors.keyDel,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  clearText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandBar: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 2,
  },
  brandText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 4,
  },
  title: {
    color: '#dddddd',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  list: {
    padding: 12,
    gap: 8,
  },
  card: {
    backgroundColor: Colors.calcBody,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFirst: {
    borderColor: Colors.brandBlue,
    borderWidth: 1.5,
  },
  cardLeft: {
    flex: 1,
    marginRight: 10,
  },
  expr: {
    color: '#888899',
    fontSize: 12,
    marginBottom: 3,
  },
  result: {
    color: '#e0e0f0',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: Colors.keyMode,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  time: {
    color: '#666677',
    fontSize: 11,
  },
  recallIcon: {
    color: Colors.shiftLabel,
    fontSize: 22,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyIcon: {
    fontSize: 52,
  },
  emptyText: {
    color: '#aaaaaa',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyHint: {
    color: '#555566',
    fontSize: 13,
  },
  footer: {
    backgroundColor: Colors.calcBody,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#555566',
    fontSize: 11,
  },
});

export default HistoryScreen;