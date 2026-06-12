import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, TextInput, ScrollView,
  StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../theme/colors';
import * as math from 'mathjs';

type SolverType = 'Linear' | 'Quadratic' | 'Cubic' | 'System2' | 'Custom';

const SolverScreen = () => {
  const [solverType, setSolverType] = useState<SolverType>('Quadratic');
  const [qa, setQa] = useState(''); const [qb, setQb] = useState(''); const [qc, setQc] = useState('');
  const [ca, setCa] = useState(''); const [cb, setCb] = useState(''); const [cc, setCc] = useState(''); const [cd, setCd] = useState('');
  const [la, setLa] = useState(''); const [lb, setLb] = useState('');
  const [s1a, setS1a] = useState(''); const [s1b, setS1b] = useState(''); const [s1c, setS1c] = useState('');
  const [s2a, setS2a] = useState(''); const [s2b, setS2b] = useState(''); const [s2c, setS2c] = useState('');
  const [customExpr, setCustomExpr] = useState('');
  const [customVar, setCustomVar] = useState('x');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  const p = (s: string) => parseFloat(s) || 0;

  const solveLinear = () => {
    const a = p(la), b = p(lb);
    setSteps([`Equation: ${a}x + ${b} = 0`, `${a}x = ${-b}`, `x = ${-b} / ${a}`]);
    if (a === 0) { setError(b === 0 ? 'Infinite solutions' : 'No solution'); setResults([]); return; }
    setError(''); setResults([`x = ${-b / a}`]);
  };

  const solveQuadratic = () => {
    const a = p(qa), b = p(qb), c = p(qc);
    if (a === 0) { setError('a ≠ 0 for quadratic'); return; }
    const disc = b * b - 4 * a * c;
    const stepList = [`Equation: ${a}x² + ${b}x + ${c} = 0`, `Δ = b²-4ac = ${disc}`];
    setError('');
    if (disc > 0) {
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      setSteps([...stepList, 'Δ > 0 → Two real roots']);
      setResults([`x₁ = ${x1.toPrecision(8)}`, `x₂ = ${x2.toPrecision(8)}`]);
    } else if (disc === 0) {
      setSteps([...stepList, 'Δ = 0 → One repeated root']);
      setResults([`x = ${(-b / (2 * a)).toPrecision(8)}`]);
    } else {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-disc) / (2 * a);
      setSteps([...stepList, 'Δ < 0 → Complex roots']);
      setResults([`x₁ = ${real.toPrecision(6)} + ${imag.toPrecision(6)}i`, `x₂ = ${real.toPrecision(6)} - ${imag.toPrecision(6)}i`]);
    }
  };

  const solveCubic = () => {
    const a = p(ca), b = p(cb), c = p(cc), d = p(cd);
    if (a === 0) { setError('a ≠ 0 for cubic'); return; }
    setError('');
    try {
      const A = b / a, B = c / a, C = d / a;
      const p2 = B - A * A / 3;
      const q2 = C - A * B / 3 + 2 * A * A * A / 27;
      const disc = q2 * q2 / 4 + p2 * p2 * p2 / 27;
      const roots: string[] = [];
      if (disc > 0) {
        const u = Math.cbrt(-q2 / 2 + Math.sqrt(disc));
        const v = Math.cbrt(-q2 / 2 - Math.sqrt(disc));
        roots.push(`x₁ = ${(u + v - A / 3).toPrecision(8)}`);
        roots.push(`x₂ = ${(-(u + v) / 2 - A / 3).toPrecision(6)} + ${(Math.abs((u - v) * Math.sqrt(3) / 2)).toPrecision(6)}i`);
        roots.push(`x₃ = ${(-(u + v) / 2 - A / 3).toPrecision(6)} - ${(Math.abs((u - v) * Math.sqrt(3) / 2)).toPrecision(6)}i`);
      } else {
        const r = Math.sqrt(-p2 * p2 * p2 / 27);
        const theta = Math.acos(-q2 / (2 * r));
        const m = 2 * Math.cbrt(r);
        for (let k = 0; k < 3; k++) roots.push(`x${k + 1} = ${(m * Math.cos((theta + 2 * Math.PI * k) / 3) - A / 3).toPrecision(8)}`);
      }
      setSteps([`Equation: ${a}x³ + ${b}x² + ${c}x + ${d} = 0`]);
      setResults(roots);
    } catch { setError('Calculation error'); }
  };

  const solveSystem2 = () => {
    const a1 = p(s1a), b1 = p(s1b), c1 = p(s1c);
    const a2 = p(s2a), b2 = p(s2b), c2 = p(s2c);
    const det = a1 * b2 - a2 * b1;
    setSteps([`${a1}x + ${b1}y = ${c1}`, `${a2}x + ${b2}y = ${c2}`, `D = ${det}`]);
    if (det === 0) { setError('No unique solution (D = 0)'); setResults([]); return; }
    setError('');
    setResults([`x = ${((c1 * b2 - c2 * b1) / det).toPrecision(8)}`, `y = ${((a1 * c2 - a2 * c1) / det).toPrecision(8)}`]);
  };

  const solveCustom = () => {
    try {
      const fn = (x: number) => {
        const expr = customExpr.replace(/\^/g, '**').replace(new RegExp(customVar, 'g'), `(${x})`);
        return math.evaluate(expr) as number;
      };
      let x = 1;
      for (let i = 0; i < 100; i++) {
        const fx = fn(x); const dfx = (fn(x + 1e-7) - fx) / 1e-7;
        if (Math.abs(dfx) < 1e-14) break;
        x = x - fx / dfx;
        if (Math.abs(fn(x)) < 1e-10) break;
      }
      setError(''); setSteps([`f(${customVar}) = ${customExpr}`, 'Newton-Raphson iteration...']);
      setResults([`${customVar} ≈ ${x.toPrecision(8)}`]);
    } catch { setError('Invalid expression.'); setResults([]); }
  };

  const handleSolve = () => {
    setResults([]); setError(''); setSteps([]);
    switch (solverType) {
      case 'Linear': solveLinear(); break;
      case 'Quadratic': solveQuadratic(); break;
      case 'Cubic': solveCubic(); break;
      case 'System2': solveSystem2(); break;
      case 'Custom': solveCustom(); break;
    }
  };

  const renderInputs = () => {
    switch (solverType) {
      case 'Linear': return (
        <View>
          <Text style={styles.equationPreview}>ax + b = 0</Text>
          <View style={styles.inputRow}>
            {([['a', la, setLa], ['b', lb, setLb]] as const).map(([lbl, val, setter]) => (
              <View key={String(lbl)} style={styles.inputGroup}>
                <Text style={styles.coefLabel}>{lbl}</Text>
                <TextInput style={styles.coefInput} value={String(val)} onChangeText={setter as any} keyboardType="numeric" placeholder="0" placeholderTextColor="#555" />
              </View>
            ))}
          </View>
        </View>
      );
      case 'Quadratic': return (
        <View>
          <Text style={styles.equationPreview}>ax² + bx + c = 0</Text>
          <View style={styles.inputRow}>
            {([['a', qa, setQa], ['b', qb, setQb], ['c', qc, setQc]] as const).map(([lbl, val, setter]) => (
              <View key={String(lbl)} style={styles.inputGroup}>
                <Text style={styles.coefLabel}>{lbl}</Text>
                <TextInput style={styles.coefInput} value={String(val)} onChangeText={setter as any} keyboardType="numeric" placeholder="0" placeholderTextColor="#555" />
              </View>
            ))}
          </View>
        </View>
      );
      case 'Cubic': return (
        <View>
          <Text style={styles.equationPreview}>ax³ + bx² + cx + d = 0</Text>
          <View style={styles.inputRow}>
            {([['a', ca, setCa], ['b', cb, setCb], ['c', cc, setCc], ['d', cd, setCd]] as const).map(([lbl, val, setter]) => (
              <View key={String(lbl)} style={styles.inputGroup}>
                <Text style={styles.coefLabel}>{lbl}</Text>
                <TextInput style={styles.coefInput} value={String(val)} onChangeText={setter as any} keyboardType="numeric" placeholder="0" placeholderTextColor="#555" />
              </View>
            ))}
          </View>
        </View>
      );
      case 'System2': return (
        <View>
          <Text style={styles.equationPreview}>a₁x + b₁y = c₁{'\n'}a₂x + b₂y = c₂</Text>
          {([['Eq 1:', [['a₁', s1a, setS1a], ['b₁', s1b, setS1b], ['c₁', s1c, setS1c]]], ['Eq 2:', [['a₂', s2a, setS2a], ['b₂', s2b, setS2b], ['c₂', s2c, setS2c]]]] as any[]).map(([label, fields]: any) => (
            <View key={label} style={styles.systemRow}>
              <Text style={styles.eqNum}>{label}</Text>
              {fields.map(([lbl, val, setter]: any) => (
                <View key={lbl} style={styles.inputGroupSm}>
                  <Text style={styles.coefLabel}>{lbl}</Text>
                  <TextInput style={styles.coefInputSm} value={String(val)} onChangeText={setter} keyboardType="numeric" placeholder="0" placeholderTextColor="#555" />
                </View>
              ))}
            </View>
          ))}
        </View>
      );
      case 'Custom': return (
        <View>
          <Text style={styles.equationPreview}>f(x) = 0</Text>
          <TextInput style={styles.customInput} value={customExpr} onChangeText={setCustomExpr} placeholder="e.g. x^3 - 2*x - 5" placeholderTextColor="#555" autoCapitalize="none" />
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.coefLabel}>Variable</Text>
              <TextInput style={styles.coefInput} value={customVar} onChangeText={setCustomVar} placeholder="x" placeholderTextColor="#555" autoCapitalize="none" />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equation Solver</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="always">
          <View style={styles.tabRow}>
            {(['Linear', 'Quadratic', 'Cubic', 'System2', 'Custom'] as SolverType[]).map(t => (
              <TouchableOpacity key={t} style={[styles.tab, solverType === t && styles.tabActive]}
                onPress={() => { setSolverType(t); setResults([]); setError(''); setSteps([]); }}>
                <Text style={[styles.tabText, solverType === t && styles.tabTextActive]}>{t === 'System2' ? '2×2' : t}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.card}>
            {renderInputs()}
            <TouchableOpacity style={styles.solveBtn} onPress={handleSolve}>
              <Text style={styles.solveBtnText}>SOLVE</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {steps.length > 0 && (
            <View style={styles.stepsCard}>
              <Text style={styles.stepsTitle}>Solution Steps</Text>
              {steps.map((s, i) => <Text key={i} style={styles.stepText}>{s}</Text>)}
            </View>
          )}
          {results.length > 0 && (
            <View style={styles.resultsCard}>
              <Text style={styles.resultsTitle}>Roots / Solutions</Text>
              {results.map((r, i) => <View key={i} style={styles.resultItem}><Text style={styles.resultText}>{r}</Text></View>)}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: Colors.calcBody, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { marginRight: 10 },
  backText: { color: Colors.brandBlue, fontSize: 14, fontWeight: '600' },
  headerTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  body: { padding: 12, paddingBottom: 40 },
  tabRow: { flexDirection: 'row', gap: 4, marginBottom: 12, flexWrap: 'wrap' },
  tab: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, backgroundColor: Colors.calcBody, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.brandBlue, borderColor: Colors.brandBlue },
  tabText: { color: '#aaaaaa', fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#ffffff' },
  card: { backgroundColor: Colors.calcBody, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 12 },
  equationPreview: { color: Colors.shiftLabel, fontSize: 15, fontFamily: 'monospace', marginBottom: 12, textAlign: 'center' },
  inputRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  inputGroup: { flex: 1, minWidth: 60 },
  coefLabel: { color: '#aaaaaa', fontSize: 11, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  coefInput: { backgroundColor: Colors.background, borderRadius: 6, borderWidth: 1, borderColor: Colors.border, color: '#ffffff', fontSize: 15, paddingVertical: 8, paddingHorizontal: 8, textAlign: 'center' },
  systemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  eqNum: { color: '#aaaaaa', fontSize: 11, width: 28 },
  inputGroupSm: { flex: 1 },
  coefInputSm: { backgroundColor: Colors.background, borderRadius: 6, borderWidth: 1, borderColor: Colors.border, color: '#ffffff', fontSize: 13, paddingVertical: 6, paddingHorizontal: 6, textAlign: 'center' },
  customInput: { backgroundColor: Colors.background, borderRadius: 8, borderWidth: 1, borderColor: Colors.shiftLabel, color: '#ffffff', fontSize: 15, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8, fontFamily: 'monospace' },
  solveBtn: { backgroundColor: Colors.keyEquals, borderRadius: 8, paddingVertical: 13, alignItems: 'center', marginTop: 14 },
  solveBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  errorText: { color: '#ff6666', fontSize: 13, textAlign: 'center', marginBottom: 10 },
  stepsCard: { backgroundColor: Colors.calcBody, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 12 },
  stepsTitle: { color: '#aaaaaa', fontSize: 12, fontWeight: '700', marginBottom: 8 },
  stepText: { color: '#cccccc', fontSize: 12, fontFamily: 'monospace', marginBottom: 3 },
  resultsCard: { backgroundColor: Colors.calcBody, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.displayBorder },
  resultsTitle: { color: Colors.shiftLabel, fontSize: 13, fontWeight: '700', marginBottom: 10 },
  resultItem: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, marginBottom: 6 },
  resultText: { color: Colors.displayBg, fontSize: 18, fontWeight: '700', fontFamily: 'monospace' },
});

export default SolverScreen;