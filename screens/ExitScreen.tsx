import React from 'react';
import {
  Alert, BackHandler, Image, Pressable,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors'; // adjust path as needed

const INFO = {
  name:        'Ritika Shrestha',
  roll:        'JEC080BCT011',
  college:     'Janakpur Engineering College',
  university:  'Tribhuvan University — IOE',
  dept:        'B.E. Computer Engineering · Year III',
  course:      'Computer Engineering',
  appName:     'CasioCalc',
  declaration: 'I declare that this application is my original and independent work. ',
};

const HAS_PHOTO = false;

const handleExit = () => {
  Alert.alert(
    'Exit FinCalc',
    'Are you sure you want to exit?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: true }
  );
};

function Badge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={s.badgeRow}>
      <Ionicons name={icon as any} size={14} color={Colors.shiftLabel} style={{ marginRight: 10, marginTop: 1 }} />
      <View>
        <Text style={s.badgeLabel}>{label.toUpperCase()}</Text>
        <Text style={s.badgeValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function ExitScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

        {/* App Identity */}
        <View style={s.heroCard}>
          <View style={s.appIconRing}>
            <Ionicons name="calculator" size={36} color={Colors.shiftLabel} />
          </View>
          <Text style={s.appName}>{INFO.appName}</Text>
          <Text style={s.appSub}>fx-991ES PLUS Edition</Text>
          <View style={s.tagRow}>
            {['React Native', 'Expo SDK 53', 'mathjs', 'TypeScript'].map(t => (
              <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
            ))}
          </View>
        </View>

        {/* Author */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>AUTHOR</Text>
          <View style={s.photoRow}>
            <View style={s.photoRing}>
              {HAS_PHOTO
                ? <Image source={require('../assets/images/photo.jpg')} style={{ width: 74, height: 74, borderRadius: 37 }} />
                : <View style={s.photoFill}><Ionicons name="person" size={34} color={Colors.shiftLabel} /></View>
              }
            </View>
            <View style={s.photoInfo}>
              <Text style={s.authorName}>{INFO.name}</Text>
              <Text style={s.authorRoll}>{INFO.roll}</Text>
            </View>
          </View>
          <Badge icon="school-outline"    label="College"    value={INFO.college} />
          <Badge icon="library-outline"   label="University" value={INFO.university} />
          <Badge icon="construct-outline" label="Programme"  value={INFO.dept} />
          <Badge icon="book-outline"      label="Course"     value={INFO.course} />
        </View>

        {/* Tech Stack */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>TECH STACK</Text>
          <View style={s.stackGrid}>
            {[
              { icon: 'logo-react',     label: 'React Native' },
              { icon: 'phone-portrait', label: 'Expo SDK 53'  },
              { icon: 'calculator',     label: 'mathjs'       },
              { icon: 'save',           label: 'AsyncStorage' },
              { icon: 'git-branch',     label: 'TypeScript'   },
              { icon: 'navigate',       label: 'Expo Router'  },
            ].map(item => (
              <View key={item.label} style={s.stackItem}>
                <Ionicons name={item.icon as any} size={18} color={Colors.shiftLabel} />
                <Text style={s.stackLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Declaration */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>DECLARATION OF AUTHORSHIP</Text>
          <View style={s.declarationCard}>
            <Ionicons name="shield-checkmark-outline" size={20} color={Colors.shiftLabel} style={{ marginBottom: 8 }} />
            <Text style={s.declarationText}>"{INFO.declaration}"</Text>
            <View style={s.divider} />
            <Text style={s.signatureName}>{INFO.name}</Text>
            <Text style={s.signatureRoll}>{INFO.roll}</Text>
          </View>
        </View>

        {/* Exit Button */}
        <Pressable style={({ pressed }) => [s.exitBtn, pressed && { opacity: 0.75 }]} onPress={handleExit}>
          <Ionicons name="power" size={20} color={Colors.shiftLabel} style={{ marginRight: 10 }} />
          <Text style={s.exitBtnText}>EXIT FINCALC</Text>
        </Pressable>

        <Text style={s.footer}>CasioCalc · JEC · 2082 B.S.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: Colors.background },
  content:         { padding: 16, paddingBottom: 40 },
  heroCard:        { backgroundColor: Colors.calcBody, borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  appIconRing:     { width: 70, height: 70, borderRadius: 20, backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.shiftLabel, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  appName:         { color: Colors.shiftLabel, fontSize: 24, fontWeight: '700', letterSpacing: 4 },
  appSub:          { color: Colors.border, fontSize: 11, letterSpacing: 1, marginTop: 2 },
  tagRow:          { flexDirection: 'row', gap: 6, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' },
  tag:             { backgroundColor: Colors.background, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  tagText:         { color: Colors.shiftLabel, fontSize: 10, fontWeight: '600' },
  section:         { backgroundColor: Colors.calcBody, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  sectionTitle:    { color: Colors.shiftLabel, fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 12 },
  photoRow:        { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  photoRing:       { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: Colors.shiftLabel, padding: 3, marginRight: 14, overflow: 'hidden' },
  photoFill:       { width: 74, height: 74, borderRadius: 37, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  photoInfo:       { flex: 1 },
  authorName:      { color: Colors.keyDefaultText, fontSize: 17, fontWeight: '700' },
  authorRoll:      { color: Colors.shiftLabel, fontSize: 12, fontWeight: '600', letterSpacing: 1, marginTop: 3 },
  badgeRow:        { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, borderTopWidth: 1, borderTopColor: Colors.screenTop },
  badgeLabel:      { color: Colors.border, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  badgeValue:      { color: Colors.displayBg, fontSize: 12, marginTop: 1 },
  featureCard:     { backgroundColor: Colors.background, borderRadius: 8, padding: 14, borderLeftWidth: 3, borderLeftColor: Colors.shiftLabel },
  featureName:     { color: Colors.shiftLabel, fontSize: 13, fontWeight: '700' },
  featureDesc:     { color: Colors.border, fontSize: 12, lineHeight: 19 },
  bulletText:      { color: Colors.displayBg, fontSize: 12, flex: 1, lineHeight: 18 },
  stackGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stackItem:       { backgroundColor: Colors.background, borderRadius: 8, padding: 12, alignItems: 'center', width: '30%', gap: 5, borderWidth: 1, borderColor: Colors.border },
  stackLabel:      { color: Colors.border, fontSize: 10, textAlign: 'center' },
  declarationCard: { backgroundColor: Colors.background, borderRadius: 8, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.keyMode },
  declarationText: { color: Colors.border, fontSize: 12, lineHeight: 20, textAlign: 'center', fontStyle: 'italic' },
  signatureName:   { color: Colors.keyDefaultText, fontSize: 15, fontWeight: '700', marginTop: 6 },
  signatureRoll:   { color: Colors.shiftLabel, fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  signatureCourse: { color: Colors.border, fontSize: 10, marginTop: 2 },
  exitBtn:         { flexDirection: 'row', backgroundColor: Colors.background, borderRadius: 10, padding: 16, alignItems: 'center', justifyContent: 'center', marginTop: 4, marginBottom: 12, borderWidth: 1.5, borderColor: Colors.shiftLabel },
  exitBtnText:     { color: Colors.shiftLabel, fontSize: 15, fontWeight: '700', letterSpacing: 2 },
  divider:         { width: '100%', height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  footer:          { color: Colors.screenTop, fontSize: 10, textAlign: 'center' },
});