
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, BrainCircuit, Binary, Cpu, Database } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { questions } from '@/lib/questions';
import type { Question } from '@/lib/questions';

type Topic = {
  name: string;
  description: string;
  path: string;
  icon: React.ElementType;
};

const topics: Topic[] = [
  {
    name: 'Data Structures',
    description: 'Test your knowledge on stacks, queues, trees, and more.',
    path: 'data-structures',
    icon: Database,
  },
  {
    name: 'Algorithms',
    description: 'Challenge yourself with questions on sorting, searching, and complexity.',
    path: 'algorithms',
    icon: BrainCircuit,
  },
  {
    name: 'Operating Systems',
    description: 'Dive into concepts like memory management and process scheduling.',
    path: 'operating-systems',
    icon: Cpu,
  },
  {
    name: 'DBMS',
    description: 'Explore questions on databases, SQL, and data modeling.',
    path: 'dbms',
    icon: Binary,
  },
];

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  if (!user) {
    return null; 
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl relative">
        <div className="absolute top-0 right-0 flex items-center gap-2 -mt-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Welcome, <span className="font-bold">{user.displayName || user.email}</span>
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="text-center pt-12 pb-8">
          <h1 className="font-headline text-5xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/60">Choose Your Challenge</h1>
          <p className="text-lg text-muted-foreground mt-4">Select a topic below to start the quiz.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => {
            const topicQuestions = questions.filter(q => q.topic === topic.path);
            
            return (
              <Card key={topic.path} className="shadow-lg border-0 bg-card h-full flex flex-col group hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <topic.icon className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">{topic.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{topic.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={{ pathname: `/quiz/${topic.path}`, query: { questions: JSON.stringify(topicQuestions) } }}>
                      Start Quiz
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
