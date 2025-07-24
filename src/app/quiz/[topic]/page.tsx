
'use client';

import { useState, useEffect, Suspense, use } from 'react';
import { Quiz } from '@/components/quiz';
import { Question } from '@/lib/questions';
import { QuizSummary } from '@/components/quiz-summary';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type QuizPageState = 'loading' | 'playing' | 'summary';

function QuizComponent({ params }: { params: { topic: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageState, setPageState] = useState<QuizPageState>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);

  const { topic } = params;

  useEffect(() => {
    const loadQuestions = () => {
      setPageState('loading');
      
      const questionsQueryParam = searchParams.get('questions');
      if (questionsQueryParam) {
        try {
          const passedQuestions = JSON.parse(questionsQueryParam);
          if (passedQuestions && passedQuestions.length > 0) {
            setQuestions(passedQuestions);
            setPageState('playing');
            return;
          }
        } catch (e) {
          console.error("Failed to parse questions from query param", e);
        }
      }
      // If we reach here, something went wrong, maybe redirect.
      console.error("No questions found for quiz.");
      router.push('/');
    };

    loadQuestions();
  }, [topic, searchParams, router]);

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setPageState('summary');
  };

  const handleRestart = () => {
    setFinalScore(0);
    setQuestions([]);
    router.push('/');
  };

  const renderContent = () => {
    switch (pageState) {
      case 'loading':
        return (
          <div className="w-full max-w-2xl">
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
  )
}


export default function QuizPage({ params }: { params: { topic: string } }) {
  // Although params is a promise, we are in a Suspense boundary,
  // so we can use it directly in the child component which will suspend.
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading quiz...</div>}>
      <QuizComponent params={params} />
    </Suspense>
  )
}
