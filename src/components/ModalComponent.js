import React, { useState, useEffect } from 'react';
import {
  Alert, Modal, StyleSheet, Text, TouchableHighlight, View
} from 'react-native';
import Constants from 'expo-constants';

function ModalComponent(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(props.codeType == 256) {
      setMessage("URL: " + props.codeData);
    } else {
      setMessage("Esse cógigo não é uma url: " + props.codeData);
    }
  });

  function readAgain() {
    props.setScanned(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>
            {message}
            </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={readAgain}>
              <Text style={styles.textStyle}>Lêr Outro</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => props.navigation.navigate("Home")} >
              <Text style={styles.textStyle}>Home</Text>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
      
    </View>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Constants.statusBarHeight
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  openButton: {
    backgroundColor: '#f194ff',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 200,
    margin: 3
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default ModalComponent;
