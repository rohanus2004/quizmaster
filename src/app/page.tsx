
'use client';

import { useState, useCallback } from 'react';
import { Quiz } from '@/components/quiz';
import { QuizSummary } from '@/components/quiz-summary';
import { questions as allQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, LogOut, Code, Cpu, Database, BrainCircuit } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getUniqueQuestions = (count: number) => {
  return shuffleArray(allQuestions).slice(0, count);
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  const startQuiz = () => {
    setQuestions(getUniqueQuestions(10));
    setQuizStarted(true);
    setQuizFinished(false);
    setFinalScore(0);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizFinished(true);
    setQuizStarted(false); // Reset for the next start
  };

  const handleRestart = () => {
    startQuiz();
  };
  
  const handleStart = () => {
    startQuiz();
  }
  
  if (!user) {
    return null; // Or a loading spinner, since the AuthProvider will redirect
  }

  const ShiningIcon = ({ icon: Icon, colorClass }: { icon: React.ElementType, colorClass: string }) => (
    <div className="relative group">
      <Icon className={`mr-2 h-5 w-5 ${colorClass}`} />
      <div className={`absolute -inset-1 bg-gradient-to-r ${colorClass} rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
    </div>
  );

  return (
    <main className="container mx-auto flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl relative">
        <div className="absolute top-0 right-0 flex items-center gap-2 -mt-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Welcome, <span className="font-bold">{user.displayName || user.email}</span>
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="pt-12">
            {!quizStarted ? (
            <Card className="shadow-lg border-0 overflow-hidden bg-card">
                <CardHeader className="text-center p-8 bg-primary/5">
                <CardTitle className="font-headline text-5xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/60">Welcome to the Quiz!!</CardTitle>
                <CardDescription className="text-center pt-4 text-lg">
                    Test your Computer Science knowledge with our quick and fun quiz.
                </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6 p-8">
                  <p className="text-center text-muted-foreground max-w-md">
                    Challenge yourself with questions from various Computer Science domains. See if you can beat your high score!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Badge variant="secondary" className="px-4 py-2 text-sm border-transparent bg-primary/10 text-black hover:bg-primary/20">
                      <ShiningIcon icon={Code} colorClass="text-blue-500" />
                      Data Structures
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm border-transparent bg-primary/10 text-black hover:bg-primary/20">
                      <ShiningIcon icon={BrainCircuit} colorClass="text-blue-500" />
                      Algorithms
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm border-transparent bg-primary/10 text-black hover:bg-primary/20">
                       <ShiningIcon icon={Database} colorClass="text-blue-500" />
                       DBMS
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2 text-sm border-transparent bg-primary/10 text-black hover:bg-primary/20">
                       <ShiningIcon icon={Cpu} colorClass="text-blue-500" />
                       Operating Systems
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-8 bg-primary/5">
                <Button onClick={handleStart} size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Quiz
                </Button>
                </CardFooter>
            </Card>
            ) : !quizFinished ? (
            <Quiz questions={questions} onQuizComplete={handleQuizComplete} />
            ) : (
            <QuizSummary score={finalScore} totalQuestions={questions.length} onRestart={handleRestart} />
            )}
        </div>
      </div>
    </main>
  );
}
