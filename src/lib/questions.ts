
export type Option = {
  text: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  options: Option[];
  topic: string;
};

export const questions: Question[] = [
  // Data Structures
  {
    topic: 'data-structures',
    question: 'What is a key benefit of using a Hash Table?',
    options: [
      { text: 'Guaranteed order of elements', isCorrect: false },
      { text: 'Fast average-case lookups', isCorrect: true },
      { text: 'No memory overhead', isCorrect: false },
      { text: 'Efficient for range queries', isCorrect: false },
    ],
  },
  {
    topic: 'data-structures',
    question: 'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
    options: [
      { text: 'Queue', isCorrect: false },
      { text: 'Stack', isCorrect: true },
      { text: 'Tree', isCorrect: false },
      { text: 'Linked List', isCorrect: false },
    ],
  },
  {
    topic: 'data-structures',
    question: 'What is the time complexity of a binary search in a balanced binary search tree?',
    options: [
        { text: 'O(n)', isCorrect: false },
        { text: 'O(log n)', isCorrect: true },
        { text: 'O(1)', isCorrect: false },
        { text: 'O(n^2)', isCorrect: false },
    ],
  },
  {
    topic: 'data-structures',
    question: 'Which of the following is not a linear data structure?',
    options: [
        { text: 'Array', isCorrect: false },
        { text: 'Stack', isCorrect: false },
        { text: 'Queue', isCorrect: false },
        { text: 'Graph', isCorrect: true },
    ],
  },
   {
    topic: 'data-structures',
    question: 'What is the primary purpose of a Queue data structure?',
    options: [
        { text: 'To store data hierarchically', isCorrect: false },
        { text: 'To process items in the order they were added (FIFO)', isCorrect: true },
        { text: 'To access elements by index', isCorrect: false },
        { text: 'To store key-value pairs', isCorrect: false },
    ],
  },
  // Algorithms
  {
    topic: 'algorithms',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: [
      { text: 'Bubble Sort', isCorrect: false },
      { text: 'Insertion Sort', isCorrect: false },
      { text: 'Quick Sort', isCorrect: true },
      { text: 'Selection Sort', isCorrect: false },
    ],
  },
  {
    topic: 'algorithms',
    question: 'Dijkstra\'s algorithm is used to solve which type of problem?',
    options: [
      { text: 'Shortest path in a weighted graph', isCorrect: true },
      { text: 'Maximum flow in a network', isCorrect: false },
      { text: 'String matching', isCorrect: false },
      { text: 'Sorting an array', isCorrect: false },
    ],
  },
   {
    topic: 'algorithms',
    question: 'What is the main characteristic of a "greedy" algorithm?',
    options: [
        { text: 'It explores all possible solutions', isCorrect: false },
        { text: 'It makes the locally optimal choice at each step', isCorrect: true },
        { text: 'It always finds the globally optimal solution', isCorrect: false },
        { text: 'It uses a divide-and-conquer strategy', isCorrect: false },
    ],
  },
  {
    topic: 'algorithms',
    question: 'What does "Big O" notation represent?',
    options: [
        { text: 'The exact number of operations', isCorrect: false },
        { text: 'The best-case performance of an algorithm', isCorrect: false },
        { text: 'The upper bound of an algorithm\'s time complexity', isCorrect: true },
        { text: 'The memory usage of an algorithm', isCorrect: false },
    ],
  },
  {
    topic: 'algorithms',
    question: 'Which algorithm design paradigm is used by Merge Sort?',
    options: [
        { text: 'Greedy', isCorrect: false },
        { text: 'Dynamic Programming', isCorrect: false },
        { text: 'Brute Force', isCorrect: false },
        { text: 'Divide and Conquer', isCorrect: true },
    ],
  },
  // Operating Systems
  {
    topic: 'operating-systems',
    question: 'What is the main purpose of an operating system?',
    options: [
      { text: 'To run applications', isCorrect: false },
      { text: 'To manage hardware and software resources', isCorrect: true },
      { text: 'To provide a user interface', isCorrect: false },
      { text: 'To connect to the internet', isCorrect: false },
    ],
  },
  {
    topic: 'operating-systems',
    question: 'What is a "process" in the context of operating systems?',
    options: [
      { text: 'A program file on disk', isCorrect: false },
      { text: 'A program in execution', isCorrect: true },
      { text: 'A set of instructions', isCorrect: false },
      { text: 'A hardware component', isCorrect: false },
    ],
  },
  {
    topic: 'operating-systems',
    question: 'What is "virtual memory"?',
    options: [
      { text: 'A memory management technique that provides an "idealized" address space', isCorrect: true },
      { text: 'A type of RAM', isCorrect: false },
      { text: 'A file stored on the hard drive', isCorrect: false },
      { text: 'Cache memory for the CPU', isCorrect: false },
    ],
  },
  {
    topic: 'operating-systems',
    question: 'What is a deadlock?',
    options: [
        { text: 'A process that has finished executing', isCorrect: false },
        { text: 'A situation where two or more processes are blocked forever, waiting for each other', isCorrect: true },
        { text: 'An error in the operating system kernel', isCorrect: false },
        { text: 'A security vulnerability', isCorrect: false },
    ],
  },
  {
    topic: 'operating-systems',
    question: 'What is the function of a scheduler?',
    options: [
        { text: 'To allocate memory to processes', isCorrect: false },
        { text: 'To decide which process runs next', isCorrect: true },
        { text: 'To manage file permissions', isCorrect: false },
        { text: 'To handle network connections', isCorrect: false },
    ],
  },
  // DBMS
  {
    topic: 'dbms',
    question: 'What does SQL stand for?',
    options: [
      { text: 'Structured Query Language', isCorrect: true },
      { text: 'Simple Query Language', isCorrect: false },
      { text: 'Standard Query Language', isCorrect: false },
      { text: 'System Query Language', isCorrect: false },
    ],
  },
  {
    topic: 'dbms',
    question: 'Which SQL keyword is used to retrieve data from a database?',
    options: [
      { text: 'GET', isCorrect: false },
      { text: 'SELECT', isCorrect: true },
      { text: 'FETCH', isCorrect: false },
      { text: 'RETRIEVE', isCorrect: false },
    ],
  },
  {
    topic: 'dbms',
    question: 'What is a primary key?',
    options: [
      { text: 'Any column in a table', isCorrect: false },
      { text: 'A unique identifier for a record in a table', isCorrect: true },
      { text: 'A key used for indexing', isCorrect: false },
      { text: 'A foreign key from another table', isCorrect: false },
    ],
  },
  {
    topic: 'dbms',
    question: 'What is normalization in the context of databases?',
    options: [
        { text: 'The process of organizing columns and tables to minimize data redundancy', isCorrect: true },
        { text: 'The process of creating backups', isCorrect: false },
        { text: 'The process of indexing tables for faster queries', isCorrect: false },
        { text: 'The process of encrypting data', isCorrect: false },
    ],
  },
  {
    topic: 'dbms',
    question: 'Which type of JOIN returns all records from the left table, and the matched records from the right table?',
    options: [
        { text: 'INNER JOIN', isCorrect: false },
        { text: 'FULL OUTER JOIN', isCorrect: false },
        { text: 'RIGHT JOIN', isCorrect: false },
        { text: 'LEFT JOIN', isCorrect: true },
    ],
  },
];
