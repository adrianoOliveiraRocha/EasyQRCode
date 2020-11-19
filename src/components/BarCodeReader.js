import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import AsyncStorage from '@react-native-community/async-storage';

export default function BarCodeReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [codeType, setCodeType] = useState(null);
  const [codeData, setCodeDate] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // data is the information encoded in barcode. In this case, the bar
    setScanned(true);
    setCodeType(type);
    setCodeDate(data);
    if(type == 256) {
      alert(`URL ${data}`);
    } else {
      alert(`Esse código não é uma URL: ${data}`)
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
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
        {scanned && <Button title={'Lêr Novamente'} onPress={() => setScanned(false)} />}
        {/*{scanned && <Button title="Save" onPress={saveBarcode} />}*/}
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
    flex: 0.8,
  },
  buttonSpace: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
    // width: 200,
  },
  button: {
    width: 200
  }
})
