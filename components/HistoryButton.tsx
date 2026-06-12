import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import Colors from '../theme/colors';

interface HistoryButtonProps {
  count?: number;
}

const HistoryButton = ({ count }: HistoryButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => router.push('/history' as any)}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>⏱ History</Text>
      {count != null && count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.keyDefault,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: Colors.shiftLabel,
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: Colors.brandBlue,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
});

export default HistoryButton;