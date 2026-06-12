import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  FlatList, TouchableOpacity, TextInput, StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../theme/colors';
import { formulas, formulaCategories, Formula } from '../utils/formulaData';
import * as math from 'mathjs';

const FormulaLibraryScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [calcResult, setCalcResult] = useState<string | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  const categories = ['All', ...formulaCategories];

  const filtered = useMemo(() => {
    return formulas.filter(f => {
      const matchCat = selectedCategory === 'All' || f.category === selectedCategory;
      const matchSearch =
        !search ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.formula.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  const handleExpand = (name: string) => {
    if (expandedItem === name) {
      setExpandedItem(null);
    } else {
      setExpandedItem(name);
      setInputValues({});
      setCalcResult(null);
      setCalcError(null);
    }
  };

  const handleCalculate = (item: Formula) => {
    if (!item.inputs || !item.expr) return;
    try {
      const scope: Record<string, number> = {};
      for (const v of item.inputs) {
        const val = parseFloat(inputValues[v.symbol] ?? '');
        if (isNaN(val)) {
          setCalcError(`Enter a valid number for ${v.label}`);
          setCalcResult(null);
          return;
        }
        scope[v.symbol] = val;
      }
      const result = math.evaluate(item.expr, scope);
      setCalcResult(`${item.result} = ${Number(result).toPrecision(8).replace(/\.?0+$/, '')}`);
      setCalcError(null);
    } catch {
      setCalcError('Calculation failed. Check inputs.');
      setCalcResult(null);
    }
  };

  const renderFormula = ({ item }: { item: Formula }) => {
    const isExpanded = expandedItem === item.name;
    const hasCalc = !!(item.inputs && item.expr && item.result);

    return (
      <View style={styles.formulaCard}>
        {/* Only header is tappable to expand/collapse */}
        <TouchableOpacity onPress={() => handleExpand(item.name)} activeOpacity={0.8}>
          <View style={styles.formulaHeader}>
            <View style={styles.formulaLeft}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.category}</Text>
              </View>
              <Text style={styles.formulaName}>{item.name}</Text>
            </View>
            <View style={styles.headerRight}>
              {hasCalc && <Text style={styles.calcBadge}>fx</Text>}
              <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
            </View>
          </View>
          <Text style={styles.formulaText}>{item.formula}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedBox}>
            <View style={styles.variablesBox}>
              <Text style={styles.varLabel}>Variables:</Text>
              <Text style={styles.varText}>{item.variables}</Text>
            </View>

            {hasCalc && (
              <View style={styles.calcSection}>
                <Text style={styles.calcTitle}>Calculate {item.result}</Text>
                {item.inputs!.map(v => (
                  <View key={v.symbol} style={styles.inputRow}>
                    <Text style={styles.inputLabel}>{v.symbol} — {v.label}</Text>
                    <TextInput
                      style={styles.inputField}
                      placeholder={`Enter ${v.symbol}`}
                      placeholderTextColor="#555"
                      keyboardType="numeric"
                      value={inputValues[v.symbol] ?? ''}
                      onChangeText={text => {
                        setInputValues(prev => ({ ...prev, [v.symbol]: text }));
                        setCalcResult(null);
                        setCalcError(null);
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity style={styles.calcBtn} onPress={() => handleCalculate(item)}>
                  <Text style={styles.calcBtnText}>CALCULATE</Text>
                </TouchableOpacity>
                {calcError && <Text style={styles.errorText}>{calcError}</Text>}
                {calcResult && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>{calcResult}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Formula Library</Text>
        <Text style={styles.countText}>{filtered.length} formulas</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search formulas..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.chipRow}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={c => c}
          contentContainerStyle={styles.chipList}
          renderItem={({ item: cat }) => (
            <TouchableOpacity
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.name}
        renderItem={renderFormula}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No formulas found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: Colors.calcBody, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { marginRight: 10 },
  backText: { color: Colors.brandBlue, fontSize: 14, fontWeight: '600' },
  headerTitle: { flex: 1, color: '#ffffff', fontSize: 16, fontWeight: '700' },
  countText: { color: '#888888', fontSize: 11 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.calcBody, margin: 10, borderRadius: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: Colors.border },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, color: '#ffffff', fontSize: 14, paddingVertical: 10 },
  clearBtn: { color: '#888', fontSize: 14, padding: 4 },
  chipRow: { paddingBottom: 6 },
  chipList: { paddingHorizontal: 10, gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: Colors.calcBody, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.brandBlue, borderColor: Colors.brandBlue },
  chipText: { color: '#aaaaaa', fontSize: 12 },
  chipTextActive: { color: '#ffffff', fontWeight: '700' },
  list: { padding: 10, gap: 8, paddingBottom: 30 },
  formulaCard: { backgroundColor: Colors.calcBody, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: Colors.border, marginBottom: 6 },
  formulaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  formulaLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,102,204,0.2)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginBottom: 4 },
  categoryBadgeText: { color: Colors.brandBlue, fontSize: 10, fontWeight: '600' },
  formulaName: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  formulaText: { color: Colors.shiftLabel, fontSize: 14, fontFamily: 'monospace', marginTop: 2 },
  expandIcon: { color: '#888', fontSize: 11, marginTop: 2 },
  calcBadge: { backgroundColor: 'rgba(0,180,80,0.2)', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2, color: '#00c853', fontSize: 10, fontWeight: '800' },
  expandedBox: { marginTop: 10 },
  variablesBox: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: 8, borderLeftWidth: 3, borderLeftColor: Colors.shiftLabel, marginBottom: 10 },
  varLabel: { color: '#aaaaaa', fontSize: 11, fontWeight: '600', marginBottom: 2 },
  varText: { color: '#dddddd', fontSize: 12 },
  calcSection: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: Colors.border },
  calcTitle: { color: '#00c853', fontSize: 12, fontWeight: '700', marginBottom: 10, letterSpacing: 0.5 },
  inputRow: { marginBottom: 8 },
  inputLabel: { color: '#aaaaaa', fontSize: 11, marginBottom: 4 },
  inputField: { backgroundColor: Colors.background, borderRadius: 6, borderWidth: 1, borderColor: Colors.border, color: '#ffffff', fontSize: 15, paddingVertical: 8, paddingHorizontal: 10 },
  calcBtn: { backgroundColor: Colors.keyEquals, borderRadius: 6, paddingVertical: 10, alignItems: 'center', marginTop: 6 },
  calcBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '800', letterSpacing: 1.5 },
  errorText: { color: '#ff6666', fontSize: 12, textAlign: 'center', marginTop: 8 },
  resultBox: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: '#00c853' },
  resultText: { color: '#00c853', fontSize: 18, fontWeight: '700', fontFamily: 'monospace', textAlign: 'center' },
  empty: { alignItems: 'center', padding: 40 },
  emptyText: { color: '#888888', fontSize: 14 },
});

export default FormulaLibraryScreen;