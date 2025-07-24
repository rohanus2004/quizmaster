'use client';

import Link from 'next/link';
import { BrainCircuit, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="w-full bg-card border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">QuizWhiz</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/leaderboard"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Trophy className="mr-1.5 h-4 w-4" />
                Leaderboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
