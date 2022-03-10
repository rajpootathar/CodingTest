import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomCard from '../../components/BottomCard';
import {Text} from '../../components/Text';
import {Colors} from '../../constants/colors';
import {Button} from '../../components/Button';
import firestore from '@react-native-firebase/firestore';

const types = {
  continue: 'continue',
  check: 'check',
  correct: 'correct',
  fail: 'fail',
};
const BLANK = '___________';
const App = () => {
  const [stage, setStage] = useState(types.continue);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedAns, setSelectedAns] = useState('');

  const [currentQuestion, setCurrentQuestion] = useState<any>({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    sentence: '',
    word: '',
  });

  const correctAnswer = currentQuestion[currentQuestion.answer];
  const isSelectedAnswerIsCorrect = correctAnswer === selectedAns;

  useEffect(() => {
    firestore()
      .collection('Quiz')
      .get()
      .then(querySnapshot => {
        let data: any = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data());
        });
        setAllQuestions(data);
        let item = data[Math.floor(Math.random() * data.length)];
        setCurrentQuestion(item);
      });
  }, []);

  const onButtonPress = (type: string) => {
    switch (type) {
      case types.continue:
        setStage(types.check);
        break;

      case types.check:
        if (isSelectedAnswerIsCorrect) {
          setStage(types.correct);
        } else {
          setStage(types.fail);
        }
        break;

      case types.correct:
      case types.fail:
        setSelectedAns('');
        setStage(types.continue);
        let filterResult = allQuestions.filter(
          (quiz: any) => quiz.question !== currentQuestion.question,
        );
        setCurrentQuestion(
          filterResult[Math.floor(Math.random() * filterResult.length)],
        );
        break;
    }
  };

  const onSelectAnswer = (ans: string) => {
    if (stage !== types.continue) return;
    setSelectedAns(ans);
    setStage(types.check);
  };

  let question = currentQuestion.question
    .replace(/{{blank}}/g, BLANK)
    .split(' ')
    .map((word: string, i: number) => {
      if (word === BLANK && !!selectedAns) {
        const check = types.correct === stage || types.fail === stage;
        const color = check
          ? isSelectedAnswerIsCorrect
            ? Colors.turquoise_blue
            : Colors.danger
          : Colors.white;
        return (
          <Text key={i}>
            {`   `}
            <Button backgroundColor={color}>
              <Text color={Colors.black}>{selectedAns}</Text>
            </Button>
            {`   `}
          </Text>
        );
      }
      return <Text key={i}> {word} </Text>;
    });

  let sentence = currentQuestion.sentence
    .split(' ')
    .map((word: string, i: number) => {
      if (word === '{{word}}') {
        return (
          <Text key={i}>
            <Text fontSize={20} style={styles.wordStyle}>
              {currentQuestion.word}
            </Text>{' '}
          </Text>
        );
      }
      return <Text key={i}>{word} </Text>;
    });

  return (
    <BottomCard
      style={styles.bottomCardStyle}
      type={stage}
      onButtonPress={onButtonPress}
      answer={correctAnswer}>
      <View>
        <View style={styles.headingWrapper}>
          <Text fontSize={12} style={styles.heading}>
            Fill in the missing word
          </Text>

          <Text fontSize={16} style={styles.sentenceStyle}>
            {sentence}
          </Text>
          <View style={styles.questionStyle}>{question}</View>
        </View>
        {!!currentQuestion.question && (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsWrapper}>
              <OptionButton
                option={currentQuestion.option1}
                selectedAns={selectedAns}
                setSelectedAns={onSelectAnswer}
              />
              <OptionButton
                option={currentQuestion.option2}
                selectedAns={selectedAns}
                setSelectedAns={onSelectAnswer}
              />
            </View>
            <View style={styles.optionsWrapper}>
              <OptionButton
                option={currentQuestion.option3}
                selectedAns={selectedAns}
                setSelectedAns={onSelectAnswer}
              />
              <OptionButton
                option={currentQuestion.option4}
                selectedAns={selectedAns}
                setSelectedAns={onSelectAnswer}
              />
            </View>
          </View>
        )}
      </View>
    </BottomCard>
  );
};

export interface OptionButtonProps {
  option: string;
  selectedAns: string;
  setSelectedAns?: any;
}

const OptionButton = ({
  option,
  setSelectedAns,
  selectedAns,
}: OptionButtonProps): JSX.Element => {
  return (
    <Button
      backgroundColor={selectedAns === option ? Colors.pantone : Colors.white}
      onPress={() => setSelectedAns(option)}>
      <Text color={selectedAns === option ? Colors.pantone : Colors.black}>
        {option}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  bottomCardStyle: {
    paddingTop: '15%',
  },
  headingWrapper: {
    alignItems: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  dotStyle: {
    borderStyle: 'dotted',
    borderBottomColor: Colors.textColor,
    borderBottomWidth: 1,
  },
  itemStyle: {},
  optionsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    marginTop: '40%',
    left: 0,
    right: 0,
  },
  sentenceStyle: {
    marginBottom: 20,
  },
  wordStyle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  questionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
