import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../constants/colors';
import {Button} from './Button';
import {Text} from './Text';

export interface IBottomCardProps {
  children?: ReactElement;

  /** The style of the bottom card */
  style?: object;
  type?: any;
  onButtonPress?: Function;
  answer: string;
}

const btnStyle: any = {
  continue: {
    textColor: Colors.white,
    btnColor: Colors.pantone,
    backgroundColor: 'transparent',
    text: 'Continue',
  },
  check: {
    textColor: Colors.white,
    btnColor: Colors.turquoise_blue,
    backgroundColor: 'transparent',
    text: 'Check Answer',
  },
  correct: {
    textColor: Colors.turquoise_blue,
    btnColor: Colors.white,
    backgroundColor: Colors.turquoise_blue,
    text: 'Continue',
  },
  fail: {
    textColor: Colors.danger,
    btnColor: Colors.white,
    backgroundColor: Colors.danger,
    text: 'Continue',
  },
};

const BottomCard = ({
  children,
  style = {},
  type = 'continue',
  onButtonPress = () => {},
  answer,
}: IBottomCardProps) => {
  return (
    <View style={[styles.cardStyle, style]}>
      {children}
      <View
        style={[
          styles.btnWrapper,
          {backgroundColor: btnStyle[type].backgroundColor},
        ]}>
        <Text style={styles.answerStyle}>
          {type === 'correct' && 'Great Job!'}
          {type === 'fail' && `Answer: ${answer}`}
        </Text>

        <Button
          onPress={() => onButtonPress(type)}
          style={styles.btnStyle}
          backgroundColor={btnStyle[type].btnColor}>
          <Text color={btnStyle[type].textColor}>{btnStyle[type].text}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    bottom: 0,
    height: '85%',
    width: '100%',
    backgroundColor: Colors.cardColor,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  btnWrapper: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '30%',
    width: '100%',

    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    width: '80%',
    alignItems: 'center',
  },
  answerStyle: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 20,
  },
});

export default BottomCard;
