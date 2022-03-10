import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';
export interface Props {
  children: any;
  style?: object;
  backgroundColor?: string;
  onPress?: any;
}

export function Button({
  children,
  style = {},
  onPress = () => {},
  backgroundColor = Colors.white,
}: Props): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, {backgroundColor}, style]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 10,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
  },
});
