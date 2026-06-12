import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
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

const HOLD_MS = 3500;
const FADE_MS = 500;

export default function SplashScreen() {
  const opacity  = useRef(new Animated.Value(0)).current;
  const scale    = useRef(new Animated.Value(0.94)).current;
  const logoSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,  { toValue:1, duration:450, easing:Easing.out(Easing.ease),      useNativeDriver:true }),
      Animated.timing(scale,    { toValue:1, duration:550, easing:Easing.out(Easing.back(1.3)), useNativeDriver:true }),
      Animated.timing(logoSpin, { toValue:1, duration:650, easing:Easing.out(Easing.ease),      useNativeDriver:true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue:0, duration:FADE_MS, easing:Easing.in(Easing.ease), useNativeDriver:true }),
        Animated.timing(scale,   { toValue:0.97, duration:FADE_MS, easing:Easing.in(Easing.ease), useNativeDriver:true }),
      ]).start(() => router.replace('/calculator' as any));
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  const spin = logoSpin.interpolate({ inputRange:[0,1], outputRange:['-15deg','0deg'] });

  return (
    <Animated.View style={[st.screen, { opacity }]}>
      <SafeAreaView style={st.safe} edges={['top','bottom']}>
        <Animated.View style={[st.card, { transform:[{ scale }] }]}>

          {/* Logo */}
          <Animated.View style={[st.logoRing, { transform:[{ rotate:spin }] }]}>
            <Ionicons name="calculator" size={36} color={Colors.shiftLabel} />
          </Animated.View>
          <Text style={st.appName}>{INFO.appName}</Text>
          <Text style={st.appSub}>{INFO.appSub}</Text>

          <View style={st.divider} />

          {/* Author */}
          <View style={st.authorRow}>
            <View style={st.photoRing}>
              {HAS_PHOTO
                ? <Image source={require('../assets/images/photo.jpg')} style={{ width:74, height:74, borderRadius:37 }} />
                : <View style={st.photoFill}><Ionicons name="person" size={30} color={Colors.shiftLabel} /></View>
              }
            </View>
            <View style={st.authorInfo}>
              <Text style={st.authorName}>{INFO.name}</Text>
              <Text style={st.rollNo}>{INFO.roll}</Text>
              <Text style={st.college}>{INFO.college}</Text>
              <Text style={st.university}>{INFO.university}</Text>
            </View>
          </View>

          <View style={st.divider} />

          <View style={st.metaRow}>
            <Ionicons name="construct-outline" size={12} color={Colors.shiftLabel} />
            <Text style={st.metaText}>{INFO.dept}</Text>
          </View>
          <View style={[st.metaRow, { marginTop:5 }]}>
            <Ionicons name="book-outline" size={12} color={Colors.shiftLabel} />
            <Text style={st.metaText}>{INFO.course}</Text>
          </View>

          <View style={st.divider} />

          <View style={st.declarationBox}>
            <Ionicons name="shield-checkmark-outline" size={15} color={Colors.shiftLabel} style={{ marginBottom:5 }} />
            <Text style={st.declarationText}>
              "I declare that this application is my original{'\n'}and independent work."
            </Text>
          </View>

          <Text style={st.footer}>Mini Project · 2082 B.S.</Text>

        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

const st = StyleSheet.create({
  screen:          { flex:1, backgroundColor:Colors.background, justifyContent:'center' },
  safe:            { flex:1, justifyContent:'center', paddingHorizontal:22 },
  card:            { backgroundColor:Colors.calcBody, borderRadius:16, padding:22, borderWidth:1, borderColor:Colors.border },
  logoRing:        { width:68, height:68, borderRadius:18, backgroundColor:Colors.background, borderWidth:2, borderColor:Colors.shiftLabel, justifyContent:'center', alignItems:'center', alignSelf:'center', marginBottom:10 },
  appName:         { color:Colors.shiftLabel, fontSize:26, fontWeight:'700', letterSpacing:4, textAlign:'center' },
  appSub:          { color:Colors.displaySecondary, fontSize:11, letterSpacing:1, textAlign:'center', marginTop:2 },
  authorRow:       { flexDirection:'row', alignItems:'center', gap:12 },
  photoRing:       { width:80, height:80, borderRadius:40, borderWidth:2, borderColor:Colors.shiftLabel, padding:3, overflow:'hidden' },
  photoFill:       { width:74, height:74, borderRadius:37, backgroundColor:Colors.background, justifyContent:'center', alignItems:'center' },
  authorInfo:      { flex:1 },
  authorName:      { color:Colors.keyDefaultText, fontSize:16, fontWeight:'700' },
  rollNo:          { color:Colors.shiftLabel, fontSize:12, fontWeight:'600', letterSpacing:1, marginTop:2 },
  college:         { color:Colors.border, fontSize:11, marginTop:3 },
  university:      { color:Colors.border, fontSize:10, marginTop:1 },
  metaRow:         { flexDirection:'row', alignItems:'center', gap:6 },
  metaText:        { color:Colors.border, fontSize:11 },
  declarationBox:  { backgroundColor:Colors.background, borderRadius:8, padding:12, alignItems:'center', borderWidth:1, borderColor:Colors.keyMode },
  declarationText: { color:Colors.border, fontSize:12, lineHeight:18, textAlign:'center', fontStyle:'italic' },
  divider:         { height:1, backgroundColor:Colors.border, marginVertical:13 },
  footer:          { color:Colors.screenTop, fontSize:10, textAlign:'center', marginTop:12 },
});