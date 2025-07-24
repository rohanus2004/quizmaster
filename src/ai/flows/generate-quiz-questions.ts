
'use server';

/**
 * @fileOverview A quiz question generation AI agent.
 *
 * - generateQuizQuestions: Generates a list of quiz questions for a given topic.
 * - QuizQuestionsInput: The input type for the generateQuizQuestions function.
 * - QuizQuestionsOutput: The return type for the generateQuizQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate quiz questions (e.g., "Data Structures").'),
  count: z.number().int().positive().describe('The number of questions to generate.'),
});
export type QuizQuestionsInput = z.infer<typeof QuizQuestionsInputSchema>;

const OptionSchema = z.object({
    text: z.string().describe('The text of the answer option.'),
    isCorrect: z.boolean().describe('Whether this option is the correct answer.'),
});

const QuestionSchema = z.object({
    question: z.string().describe('The text of the quiz question.'),
    options: z.array(OptionSchema).length(4).describe('A list of exactly 4 answer options.'),
});

const QuizQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('The list of generated quiz questions.'),
});
export type QuizQuestionsOutput = z.infer<typeof QuizQuestionsOutputSchema>;


export async function generateQuizQuestions(input: QuizQuestionsInput): Promise<QuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'quizQuestionsPrompt',
  input: { schema: QuizQuestionsInputSchema },
  output: { schema: QuizQuestionsOutputSchema },
  prompt: `You are an expert in Computer Science education. Generate a list of {{count}} multiple-choice quiz questions on the topic of "{{topic}}".

Each question must have exactly 4 options, and exactly one of those options must be correct.

Ensure the questions are clear, concise, and cover a range of concepts within the given topic. The difficulty should be appropriate for an undergraduate computer science student. Avoid questions that are too trivial or overly obscure.
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: QuizQuestionsInputSchema,
    outputSchema: QuizQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output || !output.questions || output.questions.length === 0) {
      throw new Error('The AI model failed to generate valid quiz questions. Please try again.');
    }
    return output;
  }
);
