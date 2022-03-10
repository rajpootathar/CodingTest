import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TestScreen from './src/screens/TestScreen';
import {Colors} from './src/constants/colors';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TestScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
