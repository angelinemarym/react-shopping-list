import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {Button, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from './RootStackParamList';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  // const navigation = useNavigation();
  // const navigateFavoriteScreen = () => {
  //   navigation.navigate('FavoriteScreen');
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeScreen'}>
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={'DetailScreen'} component={DetailScreen} />
        <Stack.Screen name={'FavoriteScreen'} component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
