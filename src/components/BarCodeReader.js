import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalComponent from './ModalComponent';
import * as Linking from 'expo-linking';

export default function BarCodeReader({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [codeType, setCodeType] = useState(null);
  const [codeData, setCodeDate] = useState(null);
  const [buttonAccess, setButonAccess] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(data.startsWith("https://")) {
      // alert("URL segura: " + data);
      renderAlert("URL segura: ", data, true)
      setCodeType(type);
      setCodeDate(data);
      setButonAccess(true);
    } else if (data.startsWith("http://")){
      renderAlert("URL não segura: " + data, true);
      setCodeType(type);
      setCodeDate(data);
      setButonAccess(true);
    } else {
      renderAlert("Não é uma URL: " + data, false);
      setButonAccess(false);
    }
  };

  function renderAlert(title, message, isURL) {
    function isAccessible() {
      return isURL
        ? { text: 'Acessar', onPress: access }
        : undefined
    }
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('Test') },
        isAccessible()
      ],
      { cancelable: true }
    );
  }

  function access() {
    Linking.openURL(codeData)
      .then(() =>{
        console.log('success');
      })
      .catch(e => {
        console.error(e);
      })
  }

  if (hasPermission === null) {
    return <Text style={{textAlign: 'center', justifyContent: 'center'}}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      <View style={styles.cameraSpace}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={styles.buttonSpace}>

      <View style={styles.buttonSpace}>
        <Text style={styles.button} onPress={() => setScanned(false)}>Lêr QRCode</Text>
        {/*
        {buttonAccess && <Text style={styles.button} onPress={access}>Acessar</Text>}
        */}
      </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  cameraSpace: {
    flex: 0.9,
  },
  buttonSpace: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    // backgroundColor: 'blue',
    // width: 200,
  },
  button: {
    width: 200,
    backgroundColor: '#048599',
    color: 'white',
    padding: 3,
    margin: 2,
    textAlign: 'center',
    fontSize: 20
  }
})
