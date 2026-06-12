import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../theme/colors';
import { calculate } from '../utils/mathEngine';
import Display from '../components/Display';
import { saveHistoryEntry } from '../utils/historyData';

// ── Colour palette for CLASSWIZ skin ──────────────────────────────────────────
const CW = {
  body:          '#1c1c28',
  topBar:        '#e07020',
  display:       '#c8d4a0',
  displayBorder: '#8a9a60',
  keyBg:         '#2a2a3c',
  keyBgLight:    '#3a3a50',
  trigBlue:      '#1a5fb4',
  shiftOrange:   '#e07020',
  alphaRed:      '#c0392b',
  modeBlue:      '#2060a0',
  numKey:        '#3a3a52',
  opBlue:        '#1a5fb4',
  opGreen:       '#27ae60',
  opRed:         '#c0392b',
  equalsOrange:  '#e07020',
  delRed:        '#c0392b',
  acGreen:       '#27ae60',
  histGray:      '#4a4a62',
  bottomBar:     '#161620',
  bottomBtn:     '#2060a0',
  text:          '#ffffff',
  subText:       '#f4a020',
  alphaText:     '#70e070',
  border:        '#404058',
};

export default function CalculatorScreen() {
  const { studentName, rollNumber } = useLocalSearchParams<{ studentName: string; rollNumber: string }>();

  const [expression, setExpression] = useState('');
  const [result, setResult]         = useState('0');
  const [isShift, setIsShift]       = useState(false);
  const [isAlpha, setIsAlpha]       = useState(false);
  const [angleMode, setAngleMode]   = useState<'DEG' | 'RAD' | 'GRAD'>('DEG');

  const press        = (v: string) => setExpression(p => p + v);
  const handleDel    = () => setExpression(p => p.slice(0, -1));
  const handleAC     = () => { setExpression(''); setResult('0'); };
  const toggleAngle  = () => setAngleMode(m => m === 'DEG' ? 'RAD' : m === 'RAD' ? 'GRAD' : 'DEG');

  const handleEquals = () => {
    if (!expression) return;
    const res = calculate(expression, angleMode);
    saveHistoryEntry({ expression, result: res, angleMode });
    setResult(res);
    setExpression('');
    setIsShift(false);
    setIsAlpha(false);
  };

  // ── Generic key renderer ────────────────────────────────────────────────────
  const K = (
    label: string,
    onPress: () => void,
    bg: string,
    opts?: {
      flex?: number;
      textSize?: number;
      shiftLabel?: string;
      alphaLabel?: string;
    }
  ) => {
    const { flex = 1, textSize = 12, shiftLabel, alphaLabel } = opts ?? {};
    return (
      <TouchableOpacity
        key={label}
        style={[styles.key, { backgroundColor: bg, flex }]}
        onPress={onPress}
        activeOpacity={0.65}
      >
        {shiftLabel
          ? <Text style={[styles.microLabel, { color: CW.subText }]}>{shiftLabel}</Text>
          : <Text style={styles.microLabel}>{' '}</Text>}
        <Text style={[styles.keyText, { fontSize: textSize }]}>{label}</Text>
        {alphaLabel
          ? <Text style={[styles.microLabel, { color: CW.alphaText }]}>{alphaLabel}</Text>
          : <Text style={styles.microLabel}>{' '}</Text>}
      </TouchableOpacity>
    );
  };

  // ── D-pad ───────────────────────────────────────────────────────────────────
  const DPad = () => (
    <View style={styles.dpad}>
      <TouchableOpacity style={styles.dpadUp} onPress={() => {}}>
        <Text style={styles.dpadArrow}>▲</Text>
      </TouchableOpacity>
      <View style={styles.dpadMid}>
        <TouchableOpacity style={styles.dpadSide} onPress={() => {}}>
          <Text style={styles.dpadArrow}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dpadCenter} onPress={handleEquals}>
          <Text style={[styles.dpadArrow, { fontSize: 10, color: CW.subText }]}>EXE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dpadSide} onPress={() => {}}>
          <Text style={styles.dpadArrow}>▶</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.dpadDown} onPress={() => {}}>
        <Text style={styles.dpadArrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={CW.body} />

      {/* ── Orange top bar ─────────────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <Text style={styles.topBrand}>CLASSWIZ</Text>
        <Text style={styles.topModel}>fx-991EX</Text>
      </View>

      {/* ── Main body — fills all remaining height ──────────────────────────── */}
      <View style={styles.body}>

        {/* Student info */}
        <Text style={styles.studentInfo}>{studentName}  •  {rollNumber}</Text>

        {/* ── Display ────────────────────────────────────────────────────────── */}
        <Display
          expression={expression}
          result={result}
          mode="MATH"
          angleMode={angleMode}
          isShift={isShift}
          isAlpha={isAlpha}
          history={[]}
        />

        {/* ── Row 1: SHIFT ALPHA MODE MENU UNDO ON/AC ─────────────────────── */}
        <View style={styles.row}>
          {K(isShift ? 'SHIFT▲' : 'SHIFT', () => setIsShift(s => !s), isShift ? CW.shiftOrange : CW.keyBg, { shiftLabel: 'SETUP', alphaLabel: 'QUIT' })}
          {K(isAlpha ? 'ALPHA▲' : 'ALPHA', () => setIsAlpha(a => !a), isAlpha ? CW.alphaRed   : CW.keyBg, { shiftLabel: '', alphaLabel: '' })}
          {K(angleMode, toggleAngle, CW.modeBlue,   { shiftLabel: '', alphaLabel: '' })}
          {K('MENU',   () => {},         CW.keyBgLight, { shiftLabel: '', alphaLabel: '' })}
          {K('UNDO',   () => handleDel(), CW.keyBgLight, { shiftLabel: '', alphaLabel: '' })}
          {K('ON/AC',  () => handleAC(),  CW.keyBgLight, { shiftLabel: '', alphaLabel: '' })}
        </View>

        {/* ── Row 2: TOOLS CALC INTG | D-pad | DEL ───────────────────────── */}
        <View style={[styles.row, { alignItems: 'center' }]}>
          <View style={{ flex: 3, gap: 4, alignSelf: 'stretch', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 3, flex: 1 }}>
              {K('TOOLS', () => router.push('/formula-library'),  CW.keyBg, { shiftLabel: 'FORMULA', alphaLabel: '', textSize: 10 })}
              {K('CALC',  () => {},                               CW.keyBg, { shiftLabel: 'SOLVER',  alphaLabel: '', textSize: 10 })}
              {K('INTG',  () => router.push('/unit-converter'),   CW.keyBg, { shiftLabel: 'CONVERT', alphaLabel: '', textSize: 10 })}
            </View>
          </View>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <DPad />
          </View>
          <View style={{ flex: 2, alignSelf: 'stretch' }}>
            {K('DEL', handleDel, CW.delRed, { textSize: 13 })}
          </View>
        </View>

        {/* ── Row 3: sin cos tan ( ) HIST ─────────────────────────────────── */}
        <View style={styles.row}>
          {K(isShift ? 'sin⁻¹' : 'sin', () => press(isShift ? 'sin⁻¹(' : 'sin('), CW.trigBlue, { shiftLabel: 'sin⁻¹', alphaLabel: '' })}
          {K(isShift ? 'cos⁻¹' : 'cos', () => press(isShift ? 'cos⁻¹(' : 'cos('), CW.trigBlue, { shiftLabel: 'cos⁻¹', alphaLabel: '' })}
          {K(isShift ? 'tan⁻¹' : 'tan', () => press(isShift ? 'tan⁻¹(' : 'tan('), CW.trigBlue, { shiftLabel: 'tan⁻¹', alphaLabel: '' })}
          {K('(',    () => press('('),  CW.keyBg)}
          {K(')',    () => press(')'),  CW.keyBg)}
          {K('HIST', () => router.push('/history' as any), CW.histGray, { textSize: 11 })}
        </View>

        {/* ── Row 4: ln log √ xʸ x⁻¹ πe ─────────────────────────────────── */}
        <View style={styles.row}>
          {K('ln',  () => press('ln('),    CW.keyBg, { shiftLabel: 'eˣ',  alphaLabel: '' })}
          {K('log', () => press('log('),   CW.keyBg, { shiftLabel: '10ˣ', alphaLabel: '' })}
          {K('√',   () => press('√('),     CW.keyBg, { shiftLabel: 'x²',  alphaLabel: '' })}
          {K('xʸ',  () => press('^'),      CW.keyBg, { shiftLabel: 'ˣ√',  alphaLabel: '' })}
          {K('x⁻¹', () => press('^(-1)'), CW.keyBg, { shiftLabel: '',    alphaLabel: '' })}
          {K('π e', () => press(isShift ? 'e' : 'π'), CW.keyBg, { shiftLabel: '', alphaLabel: '' })}
        </View>

        {/* ── Row 5: nCr nPr x! Abs ENG %° ───────────────────────────────── */}
        <View style={styles.row}>
          {K('nCr', () => press('C('),   CW.keyBg,        { textSize: 11 })}
          {K('nPr', () => press('P('),   CW.keyBg,        { textSize: 11 })}
          {K('x!',  () => press('!'),    CW.keyBg)}
          {K('Abs', () => press('abs('), CW.keyBg,        { textSize: 11 })}
          {K('ENG', () => {},            CW.keyBg,        { textSize: 11 })}
          {K('%°',  () => press('%'),    CW.shiftOrange,  { textSize: 11 })}
        </View>

        {/* ── Number pad rows ─────────────────────────────────────────────── */}
        <View style={styles.row}>
          {K('7', () => press('7'), CW.numKey)}
          {K('8', () => press('8'), CW.numKey)}
          {K('9', () => press('9'), CW.numKey)}
          {K('DEL', handleDel, CW.delRed)}
          {K('AC',  handleAC,  CW.acGreen)}
        </View>

        <View style={styles.row}>
          {K('4', () => press('4'), CW.numKey)}
          {K('5', () => press('5'), CW.numKey)}
          {K('6', () => press('6'), CW.numKey)}
          {K('×', () => press('×'), CW.opBlue)}
          {K('÷', () => press('÷'), CW.opBlue)}
        </View>

        <View style={styles.row}>
          {K('1', () => press('1'), CW.numKey)}
          {K('2', () => press('2'), CW.numKey)}
          {K('3', () => press('3'), CW.numKey)}
          {K('+', () => press('+'), CW.opGreen)}
          {K('-', () => press('-'), CW.opRed)}
        </View>

        <View style={styles.row}>
          {K('0',     () => press('0'),                          CW.numKey, { flex: 2 })}
          {K('.',     () => press('.'),                          CW.numKey)}
          {K('×10ˣ', () => press('×10^'),                       CW.keyBg,  { textSize: 10 })}
          {K('ANS',   () => press(result !== '0' ? result : ''), CW.keyBg,  { textSize: 11 })}
          <TouchableOpacity
            style={[styles.key, { backgroundColor: CW.equalsOrange, flex: 1 }]}
            onPress={handleEquals}
            activeOpacity={0.65}
          >
            <Text style={[styles.keyText, { fontSize: 20 }]}>=</Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom bar: FORMULA | CONVERT | EXIT ─────────────────────────── */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => router.push('/formula-library')}>
            <Text style={styles.bottomBtnText}>∑  FORMULA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => router.push('/unit-converter')}>
            <Text style={styles.bottomBtnText}>⇄  CONVERT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBtn, { backgroundColor: '#8a2020' }]}
            onPress={() => router.push({ pathname: '/exit', params: { studentName, rollNumber } })}
          >
            <Text style={styles.bottomBtnText}>EXIT</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CW.body },

  topBar:   { backgroundColor: CW.topBar, paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topBrand: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 6 },
  topModel: { color: 'rgba(255,255,255,0.75)', fontSize: 12, letterSpacing: 2 },

  // Fills ALL space below the top bar
  body: { flex: 1, backgroundColor: CW.body, padding: 8, gap: 3 },

  studentInfo: { color: '#888899', fontSize: 10, textAlign: 'right', marginBottom: 2 },

  // Each row flexes to share remaining height equally
  row: { flex: 1, flexDirection: 'row', gap: 3 },

  key: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',   // height comes from row flex, not paddingVertical
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.45)',
    minWidth: 0,
  },
  keyText:    { color: '#ffffff', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  microLabel: { fontSize: 7, color: 'transparent', fontWeight: '600', lineHeight: 9 },

  // D-pad
  dpad:       { width: 90, height: 90, alignItems: 'center', justifyContent: 'center' },
  dpadUp:     { alignItems: 'center', marginBottom: 2 },
  dpadDown:   { alignItems: 'center', marginTop: 2 },
  dpadMid:    { flexDirection: 'row', alignItems: 'center', gap: 2 },
  dpadSide:   { padding: 6 },
  dpadCenter: { width: 32, height: 32, borderRadius: 16, backgroundColor: CW.modeBlue, alignItems: 'center', justifyContent: 'center' },
  dpadArrow:  { color: '#ffffff', fontSize: 13, fontWeight: '700' },

  // Bottom bar — fixed height, doesn't flex
  bottomBar:     { flexDirection: 'row', gap: 6, flexShrink: 0 },
  bottomBtn:     { flex: 1, backgroundColor: CW.bottomBtn, borderRadius: 6, paddingVertical: 9, alignItems: 'center', justifyContent: 'center' },
  bottomBtnText: { color: '#ffffff', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
});