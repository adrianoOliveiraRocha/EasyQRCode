import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Contact({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c203fc'
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#ffffff',
          fontWeight: '800',

        }}
      >Contact is here</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
