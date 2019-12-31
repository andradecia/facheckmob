import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/Login';
import HomeScreen from './src/Home';
import CameraScreen from './src/screens/Camera';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  },
  Camera: {
    screen: CameraScreen
  }
});

export default createAppContainer(AppNavigator);