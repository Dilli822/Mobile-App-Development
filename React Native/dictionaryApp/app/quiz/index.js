
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctOption: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctOption: "4",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctOption: "Jupiter",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Jane Austen", "Mark Twain", "William Shakespeare"],
    correctOption: "William Shakespeare",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctOption: "2",
  },
];

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
      ) : (
        <View>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleAnswerButtonClick(option)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default QuizApp;