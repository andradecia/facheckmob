import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/Login';
import HomeScreen from './src/Home';
import ScanScreen from './src/Camera';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  },
  Camera: {
    screen: ScanScreen
  }
});

export default createAppContainer(AppNavigator);