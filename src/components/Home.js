import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Linking from 'expo-linking';
import { PublisherBanner} from 'expo-ads-admob';

// test id ca-app-pub-3940256099942544/6300978111
// real id pub-7854818002814670
export default function Home({ navigation }) {

  function openPrivacyPolicy() {
    Linking.openURL("https://sites.google.com/view/easy-qrcode/home");
  }

  function bannerError() {
    console.error('ErrorBanner');
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo} source={require('./../../assets/icon.png')} />

      </View>

      <View style={styles.bodyContainer}>
        <Button
          title="Open Reader"
          color="#4b85c5"
          onPress={() => navigation.navigate("Read Code")}
        />
        <Button
          title="Privacy Policy"
          color="#4b85c5"
          onPress={openPrivacyPolicy}
        />
      </View>
      <View style={styles.bannerContainer}>
        <PublisherBanner
          bannerSize="fullBanner"
          adUnitID="pub-7854818002814670"
          onDidFailToReceiveAdWithError={bannerError}
        />
      </View>
      <StatusBar style="auto" />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.4,
    backgroundColor: '#e3eaa7',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyContainer: {
    flex: 0.5,
    backgroundColor: '#4b85c5',
    alignItems: 'center',
    justifyContent: 'space-around',
    // padding: 15
  },
  bannerContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#4b85c5'
  },
  tinyLogo: {
    width: 200,
    height: 200
  },
  subTitle: {
    color: 'black',
    fontSize: 20,
  }
});
