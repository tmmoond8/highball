import React from 'react';
import {Platform, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles';

export default function ScreenLayout({children}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  avoid: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
