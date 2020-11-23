import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Linking from 'expo-linking';
import {
  AdMob,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

export default function Home({ navigation }) {

  // React.useEffect(() => {
  //   (async () => {
  //
  //     await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
  //
  //     await AdMobRewarded.requestAdAsync();
  //
  //     await AdMobRewarded.showAdAsync()
  //       .then(result => {
  //         console.log(result);
  //       })
  //       .catch(error => {
  //         console.error("Error: " + error);
  //       })
  //   })();
  //
  // }, []);

  async function showAdd() {
    // pub-7854818002814670
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');

    await AdMobRewarded.requestAdAsync();

    await AdMobRewarded.showAdAsync()
  }

  function openPrivacyPolicy() {
    Linking.openURL("https://sites.google.com/view/easy-qrcode/home");
  }

  function bannerError(error) {
    console.error('Error: ' + error);
    alert(error);
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Image style={styles.tinyLogo} source={require('./../../assets/icon.png')} />
        {/*
        <Text style={styles.subTitle}>Leitor de QRCode</Text>
        */}
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

      <View style={styles.adMobiContainer}>
      <Button title="test" onPress={showAdd}/>

      <PublisherBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        onDidFailToReceiveAdWithError={bannerError}
        onAdMobDispatchAppEvent={showAdd} />

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
    flex: 0.4,
    backgroundColor: '#4b85c5',
    alignItems: 'center',
    justifyContent: 'space-around',
    // padding: 15
  },
  adMobiContainer: {
    flex: 0.2
  },
  bottomBanner: {
    position: 'absolute',
    bottom: 0,
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
