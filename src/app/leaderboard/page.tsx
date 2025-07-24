
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
import { Award, User } from 'lucide-react';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [highScore] = useLocalStorage('quiz-whiz-highscore', 0);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="shadow-lg border-2 border-cyan-400/50">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Leaderboard</CardTitle>
          <CardDescription>Your personal best score is shining here!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-cyan-500/10 border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-blue-700">1</span>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">{user.displayName || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-cyan-400" style={{ textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee' }}>
                <Award className="h-6 w-6" />
                <p className="font-bold text-xl">{highScore}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
