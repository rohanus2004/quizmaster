
export type Option = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  options: Option[];
  topic: string;
};
