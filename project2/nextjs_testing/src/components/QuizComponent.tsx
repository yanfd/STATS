'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1],
          scale: { type: "spring", stiffness: 300, damping: 25 }
        }}
      >
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <motion.p 
              className="text-green-500 font-semibold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              here we go again.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        height: 0,
        overflow: 'hidden'
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0.0, 0.2, 1]
      }}
      style={{ overflow: 'hidden' }}
    >
      <Card className="bg-gradient-to-b from-black-800 via-white/[50%] to-black-800/[30%]">
        <CardHeader>
          <motion.div
            key={`header-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <CardTitle className="text-center">
               {currentQuestionIndex + 1} / {questions.length}
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <p className="text-center font-medium">{currentQuestion.question}</p>
              <div className="flex flex-col space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={`${currentQuestionIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleAnswerClick(index)}
                      className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <motion.p 
                className="text-xs text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                now we talkin.
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizComponent;