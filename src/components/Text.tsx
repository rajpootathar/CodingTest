import {Text as RNText} from 'react-native';
import React, {ReactElement} from 'react';
import {Colors} from '../constants/colors';

export interface Props {
  children: any;
  color?: string;
  fontSize?: number;
  style?: object;
}

export function Text({
  children,
  color = Colors.textColor,
  fontSize = 16,
  style = {},
}: Props): JSX.Element {
  return (
    <RNText
      style={{
        color,
        fontSize,
        ...style,
      }}>
      {children}
    </RNText>
  );
}
