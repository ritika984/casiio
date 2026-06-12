import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../theme/colors';

const SplashScreen = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!studentName.trim() || !rollNumber.trim()) {
      setError('Please enter both name and roll number.');
      return;
    }
    setError('');
    router.push({ pathname: '/calculator', params: { studentName: studentName.trim(), rollNumber: rollNumber.trim() } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>

        {/* Brand */}
        <View style={styles.brandArea}>
          <View style={styles.brandBar}>
            <Text style={styles.brandText}>CASIO</Text>
          </View>
          <Text style={styles.modelText}>fx-991ES PLUS</Text>
          <Text style={styles.subtitle}>Scientific Calculator</Text>
        </View>

        {/* Login card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Login</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={studentName}
            onChangeText={setStudentName}
            placeholder="Enter your name"
            placeholderTextColor="#555"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Roll Number</Text>
          <TextInput
            style={styles.input}
            value={rollNumber}
            onChangeText={setRollNumber}
            placeholder="Enter roll number"
            placeholderTextColor="#555"
            autoCapitalize="characters"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.8}>
            <Text style={styles.startBtnText}>START SESSION</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Tribhuvan University • Institute of Engineering</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  brandArea: { alignItems: 'center', marginBottom: 32 },
  brandBar: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 28,
    paddingVertical: 5,
    borderRadius: 2,
    marginBottom: 6,
  },
  brandText: { color: '#ffffff', fontSize: 28, fontWeight: '900', letterSpacing: 8 },
  modelText: { color: '#cccccc', fontSize: 15, fontWeight: '600', letterSpacing: 2 },
  subtitle: { color: '#888888', fontSize: 12, marginTop: 4 },
  card: {
    backgroundColor: Colors.calcBody,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 18, textAlign: 'center' },
  label: { color: '#aaaaaa', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    color: '#ffffff',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  errorText: { color: '#ff6666', fontSize: 12, marginBottom: 10, textAlign: 'center' },
  startBtn: {
    backgroundColor: Colors.brandBlue,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  startBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800', letterSpacing: 2 },
  footer: { color: '#444466', fontSize: 11, marginTop: 28, textAlign: 'center' },
});

export default SplashScreen;