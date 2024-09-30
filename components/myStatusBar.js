import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Colors} from '../constants/styles';

const MyStatusBar = ({color}) => {
  return (
    <SafeAreaView style={{backgroundColor: color?color:Colors.primaryColor}}>
      <StatusBar
        translucent={false}
        backgroundColor={color?color:Colors.primaryColor}
        barStyle={'light-content'}
      />
    </SafeAreaView>
  );
};

export default MyStatusBar;