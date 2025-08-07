'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizComponentProps {
  onHide?: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "",
    options: ["阶梯", "独角仙", "天堂"],
    correctAnswer: 1
  },
  {
    question: "",
    options: ["纸兔子", "月亮", "鸭嘴兽"],
    correctAnswer: 2
  },
  {
    question: "	走路的冰箱/跳舞的青蛙/会飞的玩偶",
    options: ["Neuromancer", "Lain", "Paprika"],
    correctAnswer: 2
  }
];

const QuizComponent: React.FC<QuizComponentProps> = ({ onHide }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswerClick = (selectedAnswerIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedAnswerIndex === currentQuestion.correctAnswer) {
      if (currentQuestionIndex === questions.length - 1) {
        setShowSuccess(true);
        
        setTimeout(() => {
          window.location.href = 'https://stats.yanfd.tech/hughes';
        }, 1000);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      if (onHide) {
        onHide();
      }
    }
  };

  if (showSuccess) {
    return (
      <Card className="mt-4 animate-in slide-in-from-top-5 duration-300">
        <CardContent className="p-6 text-center">
          <p className="text-green-500 font-semibold text-lg">
            here we go again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="mt-4 animate-in slide-in-from-top-5 duration-300 bg-gradient-to-b from-black-800 via-white/[50%] to-black-800/[30%]">
      <CardHeader>
        <CardTitle className="text-center">
           {currentQuestionIndex + 1} / {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center font-medium">{currentQuestion.question}</p>
        <div className="flex flex-col space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleAnswerClick(index)}
              className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {option}
            </Button>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground">
          now we talkin.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;