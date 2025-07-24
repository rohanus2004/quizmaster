
'use client';

import { useState } from 'react';
import { generateMotivationalFeedback } from '@/ai/flows/generate-motivational-feedback';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Sparkles, XCircle, CheckCircle } from 'lucide-react';

// This type is now defined in the new AI flow, but we keep a similar shape here for the component props
export type Option = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  options: Option[];
};


type QuizProps = {
  questions: Question[];
  topic: string;
  onQuizComplete: (score: number) => void;
};

export function Quiz({ questions, topic, onQuizComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Option | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [motivationalFeedback, setMotivationalFeedback] = useState<string | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerClick = async (option: Option) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(option);
    const correct = option.isCorrect;

    if (correct) {
      setScore((prev) => prev + 1);
    }
    
    setIsFeedbackLoading(true);
    try {
      const feedbackResult = await generateMotivationalFeedback({
        isCorrect: correct,
        questionTopic: topic,
      });
      setMotivationalFeedback(feedbackResult.feedback);
    } catch (error) {
      console.error('Failed to get motivational feedback', error);
      setMotivationalFeedback("Let's keep going!");
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setMotivationalFeedback(null);
    } else {
      onQuizComplete(score);
    }
  };
  
  if (!currentQuestion) {
    return <div>Error: Question not found.</div>;
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="font-headline text-2xl capitalize">{topic.replace(/-/g, ' ')} Quiz</CardTitle>
          <div className="text-lg font-semibold">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <Progress value={progress} />
        <CardDescription className="pt-6 text-xl text-center text-foreground font-medium">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <Card
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={cn(
              'p-4 flex items-center gap-4 cursor-pointer transition-colors duration-300',
              'hover:bg-accent',
              isAnswered && 'cursor-not-allowed',
              isAnswered && option.isCorrect && 'bg-green-100 border-green-500 text-green-800 hover:bg-green-100',
              isAnswered && selectedAnswer === option && !option.isCorrect && 'bg-red-100 border-red-500 text-red-800 hover:bg-red-100'
            )}
          >
            <div className="flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center font-bold">
              {String.fromCharCode(65 + index)}
            </div>
            <div className="flex-grow text-sm font-medium">{option.text}</div>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        {isAnswered && (
          <Alert variant={selectedAnswer?.isCorrect ? 'default' : 'destructive'} className={cn(selectedAnswer?.isCorrect ? 'border-green-500' : 'border-red-500')}>
            {selectedAnswer?.isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle className="flex items-center gap-2">
              {selectedAnswer?.isCorrect ? 'Correct!' : 'Incorrect!'}
            </AlertTitle>
            <AlertDescription className="flex items-start gap-2">
              {isFeedbackLoading ? (
                 <>
                    <Sparkles className="h-4 w-4 mt-1 animate-pulse" />
                    <span>Getting feedback...</span>
                </>
              ) : (
                <>
                    <Lightbulb className="h-4 w-4 mt-1" />
                    <span>{motivationalFeedback}</span>
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
        {isAnswered && (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
