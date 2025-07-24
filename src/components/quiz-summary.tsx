
'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award, Repeat, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { LeaderboardEntry } from '@/app/leaderboard/page';
import Link from 'next/link';

type QuizSummaryProps = {
  score: number;
  totalQuestions: number;
  topic: string;
  onRestart: () => void;
};

export function QuizSummary({ score, totalQuestions, topic, onRestart }: QuizSummaryProps) {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('quiz-whiz-leaderboard', []);
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  const personalBest = leaderboard
    .filter(entry => entry.userName === user?.displayName && entry.topic === topic)
    .reduce((max, entry) => (entry.score > max ? entry.score : max), score);

  useEffect(() => {
    if (user?.displayName) {
      const newEntry: LeaderboardEntry = {
        score,
        topic,
        userName: user.displayName,
        date: new Date().toISOString(),
      };

      const userExistingScoreIndex = leaderboard.findIndex(
        (entry) => entry.userName === user.displayName && entry.topic === topic
      );

      let updatedLeaderboard = [...leaderboard];

      if (userExistingScoreIndex !== -1) {
        // User has an existing score for this topic
        if (score > updatedLeaderboard[userExistingScoreIndex].score) {
          // New score is higher, so we update it
          updatedLeaderboard[userExistingScoreIndex] = newEntry;
        }
      } else {
        // No existing score for this user and topic, so add the new entry
        updatedLeaderboard.push(newEntry);
      }
      
      // Sort and slice to maintain top 10
      updatedLeaderboard = updatedLeaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      
      setLeaderboard(updatedLeaderboard);
    }
  }, [score, topic, user]);

  return (
    <Card className="w-full shadow-lg text-center">
      <CardHeader>
        <CardTitle className="font-headline text-4xl">Quiz Complete!</CardTitle>
        <CardDescription>Here's how you did.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div 
          className="relative flex items-center justify-center h-48 w-48 rounded-full bg-primary/20"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-primary/10"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="10"
              strokeDasharray={283}
              strokeDashoffset={283 - (283 * percentage) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{transform: 'rotate(-90deg)', transformOrigin: 'center'}}
            />
          </svg>
          <div className="flex flex-col items-center">
              <span className="text-5xl font-bold font-headline">{percentage}%</span>
              <p className="text-muted-foreground">Score</p>
          </div>
        </div>

        <div className="flex justify-around w-full max-w-sm">
          <div className="text-center">
            <p className="text-2xl font-bold">{score}</p>
            <p className="text-muted-foreground">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{totalQuestions - score}</p>
            <p className="text-muted-foreground">Incorrect</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
                <Award className="h-6 w-6 text-primary" />
                <p className="text-2xl font-bold">{personalBest}</p>
            </div>
            <p className="text-muted-foreground">Personal Best</p>
          </div>
        </div>

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={onRestart} size="lg">
          <Repeat className="mr-2 h-5 w-5" />
          Play Again
        </Button>
        <Button asChild variant="outline" size="lg">
            <Link href="/leaderboard">
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
