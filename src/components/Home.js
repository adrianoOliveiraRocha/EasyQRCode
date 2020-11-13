import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import Constants from 'expo-constants';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo} source={require('./../../assets/icon.png')} />
        <Text style={styles.title}>Get Data</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Button
          title="See Data"
          color="#048599"
          onPress={() => navigation.navigate("Contact")}
        />
      </View>

      <StatusBar style="auto" />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    // alignItems: 'baseline',
    // justifyContent: 'center',
    // marginTop: Constants.statusBarHeight
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: '#aabbcc',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyContainer: {
    flex: 0.7,
    backgroundColor: '#ddeeff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 80,
    height: 80
  },
  title: {
    color: 'white',
    fontSize: 30,
  }
});
