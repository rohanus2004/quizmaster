
'use client';

import { useState, useEffect, use } from 'react';
import { Quiz, Question } from '@/components/quiz';
import { QuizSummary } from '@/components/quiz-summary';
import { Skeleton } from '@/components/ui/skeleton';
import {
  generateQuizQuestions,
  QuizQuestionsOutput,
} from '@/ai/flows/generate-quiz-questions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type QuizPageState = 'loading' | 'playing' | 'summary';

export default function QuizPage({ params }: { params: { topic: string } }) {
  const resolvedParams = use(params);
  const [pageState, setPageState] = useState<QuizPageState>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const topic = resolvedParams.topic || 'computer-science';

  const loadQuestions = async (forceRefresh = false) => {
    setPageState('loading');
    setError(null);
    try {
      const result: QuizQuestionsOutput = await generateQuizQuestions({ topic: topic.replace(/-/g, ' '), count: 10 });
      if (result.questions && result.questions.length > 0) {
        // The generated questions already have the correct shape
        setQuestions(result.questions as Question[]);
        setPageState('playing');
      } else {
        setError('Failed to generate new questions. The generated content was empty.');
        setPageState('loading');
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while fetching new questions.');
      setPageState('loading');
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [topic]);

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setPageState('summary');
  };

  const handleRestart = () => {
    setFinalScore(0);
    setQuestions([]);
    loadQuestions(true); // Force a refresh of questions
  };
  
  const renderContent = () => {
    switch (pageState) {
      case 'loading':
        return (
          <div className="w-full max-w-2xl">
            {error ? (
              <div className="text-center text-red-500">
                <p>{error}</p>

                <Button onClick={() => loadQuestions(true)} className="mt-4">Try Again</Button>
              </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-8 w-1/6" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full mt-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            )}
          </div>
        );
      case 'playing':
        return <Quiz questions={questions} topic={topic} onQuizComplete={handleQuizComplete} />;
      case 'summary':
        return <QuizSummary score={finalScore} totalQuestions={questions.length} topic={topic} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl relative">
            <div className="absolute top-0 left-0 -mt-2">
                <Button asChild variant="ghost">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Topics
                    </Link>
                </Button>
            </div>
            <div className="pt-12">
                {renderContent()}
            </div>
        </div>
    </main>
  );
}
