import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalComponent from './ModalComponent';

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
      alert("URL segura: " + data);
      setCodeType(type);
      setCodeDate(data);
      setButonAccess(true);
    } else if (data.startsWith("http://")){
      alert("URL não segura: " + data);
      setCodeType(type);
      setCodeDate(data);
      setButonAccess(true);
    } else {
      alert("Não é uma URL: " + data);
      setButonAccess(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const flash = () => {
    alert(codeData);
  };

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
        {buttonAccess && <Text style={styles.button} onPress={() => alert('Acessar')}>Acessar</Text>}
        <Text style={styles.button} onPress={flash}>Ligar Flash</Text>
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
    flex: 0.6,
  },
  buttonSpace: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    // backgroundColor: 'blue',
    // width: 200,
  },
  button: {
    width: 200,
    backgroundColor: 'black',
    color: 'white',
    padding: 3,
    margin: 2,
    textAlign: 'center',
    fontSize: 20
  }
})
