
'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award, User, BookOpen } from 'lucide-react';
import { BackButton } from '@/components/back-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type LeaderboardEntry = {
  score: number;
  topic: string;
  userName: string;
  date: string;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard = []] = useLocalStorage<LeaderboardEntry[]>('quiz-whiz-leaderboard', []);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <Card className="shadow-lg border-2 border-primary/50 mt-12">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Leaderboard</CardTitle>
          <CardDescription>See how you stack up against the best!</CardDescription>
        </CardHeader>
        <CardContent>
          {leaderboard.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={index} className={entry.userName === user.displayName ? 'bg-primary/10' : ''}>
                    <TableCell className="font-bold text-lg text-primary">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">{entry.userName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <p className="capitalize">{entry.topic.replace(/-/g, ' ')}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex items-center justify-end gap-2 text-primary">
                        <Award className="h-6 w-6" />
                        <p className="font-bold text-xl">{entry.score}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No scores recorded yet. Be the first to set a high score!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
