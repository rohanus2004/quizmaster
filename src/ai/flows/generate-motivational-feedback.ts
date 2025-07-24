'use server';

/**
 * @fileOverview A motivational feedback AI agent.
 *
 * - generateMotivationalFeedback - A function that generates motivational feedback based on user performance.
 * - MotivationalFeedbackInput - The input type for the generateMotivationalFeedback function.
 * - MotivationalFeedbackOutput - The return type for the generateMotivationalFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalFeedbackInputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the user answered the question correctly.'),
  questionTopic: z.string().describe('The topic of the question answered.'),
});
export type MotivationalFeedbackInput = z.infer<typeof MotivationalFeedbackInputSchema>;

const MotivationalFeedbackOutputSchema = z.object({
  feedback: z.string().describe('A short, motivational message for the user.'),
});
export type MotivationalFeedbackOutput = z.infer<typeof MotivationalFeedbackOutputSchema>;

export async function generateMotivationalFeedback(input: MotivationalFeedbackInput): Promise<MotivationalFeedbackOutput> {
  return generateMotivationalFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalFeedbackPrompt',
  input: {schema: MotivationalFeedbackInputSchema},
  output: {schema: MotivationalFeedbackOutputSchema},
  prompt: `You are a motivational coach providing encouragement to a student learning Computer Science.  

  Based on the student\'s performance, provide a short, one-sentence motivational message. Tailor the message to the specific topic, if known.  

  If the student answered correctly, praise their understanding and encourage them to continue learning.
  If the student answered incorrectly, encourage them to keep trying and emphasize that mistakes are part of learning.

  Correct Answer: {{isCorrect}}
  Question Topic: {{questionTopic}}

  Feedback: `,
});

const generateMotivationalFeedbackFlow = ai.defineFlow(
  {
    name: 'generateMotivationalFeedbackFlow',
    inputSchema: MotivationalFeedbackInputSchema,
    outputSchema: MotivationalFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
