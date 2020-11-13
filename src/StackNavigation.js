import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Contact from './components/Contact';

const forFad = ({ current, next }) => {
  const opacity = Animated(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  });

  return {
    leftButtonStyle: { opacity },
    rigthButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity }
  };
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "black",
          headerStyle: {backgroundColor: 'white'}
        }}
      />

      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerStyleInterpolator: forFad }}
      />

    </Stack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
