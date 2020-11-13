import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Constants from 'expo-constants';
import StackNavigation from './src/StackNavigation';

export default function App() {

  return (
    <StackNavigation />
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    // marginTop: Constants.statusBarHeight
  }
});
