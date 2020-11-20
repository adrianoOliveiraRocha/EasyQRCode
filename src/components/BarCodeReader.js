import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalComponent from './ModalComponent';
import * as Linking from 'expo-linking';

export default function BarCodeReader({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ type, data }) {

    setScanned(true);

    if(data.startsWith("https://")) {
      isURLAlert("URL segura: ", data);
      // setButonAccess(true);
    } else if (data.startsWith("http://")){
      isURLAlert("URL não segura: " + data);
    } else {
      isNotURLAlert(data);
    }

  };

  function isURLAlert(title, data) {
    Alert.alert(
      title,
      data,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Acessar", onPress: access }
      ],
      { cancelable: false }
    );

    function access() {
      Linking.openURL(data);
    }
  }

  function isNotURLAlert(data) {
    alert('Não é uma URL: ' + data);
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
