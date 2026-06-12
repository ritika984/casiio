import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DISPLAY_BG     = '#c8d4a0';
const DISPLAY_BORDER = '#8a9a60';
const DISPLAY_TEXT   = '#2a3a10';

interface DisplayProps {
  expression: string;
  result:     string;
  mode:       string;
  angleMode:  string;
  isShift:    boolean;
  isAlpha:    boolean;
  history?:   { expr: string; result: string }[];
}

const Display: React.FC<DisplayProps> = ({
  expression, result, mode, angleMode, isShift, isAlpha,
}) => {
  return (
    <View style={styles.screen}>
      {/* Status row */}
      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          {isShift && <Text style={styles.statusChip}>S</Text>}
          {isAlpha && <Text style={[styles.statusChip, { backgroundColor:'rgba(100,200,100,0.25)', color:'#3a8a3a' }]}>A</Text>}
        </View>
        <View style={styles.statusRight}>
          <Text style={styles.statusBadge}>{mode}</Text>
          <Text style={styles.statusBadge}>{angleMode}</Text>
          <Text style={styles.statusBadge}>NORM1</Text>
          <Text style={styles.statusBadge}>d/c</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Expression */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.exprContainer}
        style={styles.exprScroll}
      >
        <Text style={styles.expressionText} numberOfLines={2}>
          {expression || ' '}
        </Text>
      </ScrollView>

      {/* Result */}
      <View style={styles.resultRow}>
        <Text style={styles.resultText} adjustsFontSizeToFit numberOfLines={1}>
          {result}
        </Text>
      </View>

      {/* History hint */}
      <View style={styles.hintRow}>
        <Text style={styles.hintText}>
          {result !== '0' ? `= ${result}` : ''}
        </Text>
        <Text style={styles.hintText}>History »</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: DISPLAY_BG,
    borderRadius:4,
    borderWidth:2,
    borderColor: DISPLAY_BORDER,
    padding:8,
    minHeight:100,
    marginBottom:6,
  },
  statusRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    minHeight:14,
  },
  statusLeft:  { flexDirection:'row', gap:4 },
  statusRight: { flexDirection:'row', gap:4 },
  statusChip: {
    fontSize:8,
    color:'#7a3a00',
    fontWeight:'800',
    backgroundColor:'rgba(200,100,0,0.18)',
    paddingHorizontal:4,
    paddingVertical:1,
    borderRadius:2,
  },
  statusBadge: {
    fontSize:8,
    color: DISPLAY_TEXT,
    fontWeight:'700',
    opacity:0.75,
  },
  divider: {
    height:1,
    backgroundColor: DISPLAY_BORDER,
    marginVertical:4,
    opacity:0.3,
  },
  exprScroll:     { maxHeight:40 },
  exprContainer:  { alignItems:'flex-end', flexGrow:1, paddingRight:2 },
  expressionText: {
    fontSize:15,
    color: DISPLAY_TEXT,
    fontFamily:'monospace',
    textAlign:'right',
  },
  resultRow: { alignItems:'flex-end', marginTop:2, paddingRight:2 },
  resultText: {
    fontSize:26,
    fontWeight:'700',
    color: DISPLAY_TEXT,
    fontFamily:'monospace',
    minHeight:30,
  },
  hintRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:4,
  },
  hintText: {
    fontSize:8,
    color: DISPLAY_TEXT,
    opacity:0.5,
    fontFamily:'monospace',
  },
});

export default Display;