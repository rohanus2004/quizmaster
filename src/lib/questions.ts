
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
  {
    question: 'Which data structure uses the LIFO (Last-In, First-Out) principle?',
    options: [
      { text: 'Queue', isCorrect: false },
      { text: 'Stack', isCorrect: true },
      { text: 'Linked List', isCorrect: false },
      { text: 'Tree', isCorrect: false },
    ],
    topic: 'Data Structures',
  },
  {
    question: 'What is the time complexity of a binary search algorithm?',
    options: [
      { text: 'O(n)', isCorrect: false },
      { text: 'O(n^2)', isCorrect: false },
      { text: 'O(log n)', isCorrect: true },
      { text: 'O(1)', isCorrect: false },
    ],
    topic: 'Algorithms',
  },
  {
    question: 'Which protocol is used to send email?',
    options: [
      { text: 'HTTP', isCorrect: false },
      { text: 'FTP', isCorrect: false },
      { text: 'POP3', isCorrect: false },
      { text: 'SMTP', isCorrect: true },
    ],
    topic: 'Networking',
  },
  {
    question: 'In DBMS, what does SQL stand for?',
    options: [
      { text: 'Structured Query Language', isCorrect: true },
      { text: 'Simple Query Language', isCorrect: false },
      { text: 'Standard Query Logic', isCorrect: false },
      { text: 'System Query Language', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'Which of the following is not an operating system?',
    options: [
      { text: 'Windows', isCorrect: false },
      { text: 'Linux', isCorrect: false },
      { text: 'Oracle', isCorrect: true },
      { text: 'macOS', isCorrect: false },
    ],
    topic: 'Operating Systems',
  },
  {
    question: 'What does "CPU" stand for?',
    options: [
      { text: 'Central Processing Unit', isCorrect: true },
      { text: 'Computer Personal Unit', isCorrect: false },
      { text: 'Central Process Unit', isCorrect: false },
      { text: 'Central Processor Unit', isCorrect: false },
    ],
    topic: 'Computer Architecture',
  },
  {
    question: 'Which data structure is ideal for implementing a priority queue?',
    options: [
        { text: 'Stack', isCorrect: false },
        { text: 'Heap', isCorrect: true },
        { text: 'Queue', isCorrect: false },
        { text: 'Linked List', isCorrect: false },
    ],
    topic: 'Data Structures',
  },
  {
    question: 'What is "thrashing" in the context of operating systems?',
    options: [
        { text: 'A security attack', isCorrect: false },
        { text: 'Excessive page swapping', isCorrect: true },
        { text: 'A process entering an infinite loop', isCorrect: false },
        { text: 'A hardware failure', isCorrect: false },
    ],
    topic: 'Operating Systems',
  },
  {
    question: 'What is the purpose of the "finally" block in a try-catch-finally statement?',
    options: [
        { text: 'To execute code only if an exception occurs', isCorrect: false },
        { text: 'To execute code regardless of whether an exception occurs', isCorrect: true },
        { text: 'To catch specific exceptions', isCorrect: false },
        { text: 'To re-throw an exception', isCorrect: false },
    ],
    topic: 'Programming Concepts',
  },
  {
    question: 'In object-oriented programming, what is encapsulation?',
    options: [
        { text: 'The ability of an object to take on many forms', isCorrect: false },
        { text: 'Bundling data and methods that operate on the data into a single unit', isCorrect: true },
        { text: 'The process of creating a new class from an existing class', isCorrect: false },
        { text: 'Hiding the implementation details of an object', isCorrect: false },
    ],
    topic: 'Object-Oriented Programming',
  },
  {
    question: 'Which of the following is a NoSQL database?',
    options: [
        { text: 'MySQL', isCorrect: false },
        { text: 'PostgreSQL', isCorrect: false },
        { text: 'MongoDB', isCorrect: true },
        { text: 'SQL Server', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'What is the function of a router in a network?',
    options: [
        { text: 'To connect devices on the same local network', isCorrect: false },
        { text: 'To forward data packets between different computer networks', isCorrect: true },
        { text: 'To filter network traffic based on security rules', isCorrect: false },
        { text: 'To translate domain names to IP addresses', isCorrect: false },
    ],
    topic: 'Networking',
  },
  {
    question: 'What is the main advantage of a linked list over an array?',
    options: [
        { text: 'Faster access to elements at a specific index', isCorrect: false },
        { text: 'Dynamic size and efficient insertion/deletion', isCorrect: true },
        { text: 'Less memory usage', isCorrect: false },
        { text: 'Elements are stored in contiguous memory locations', isCorrect: false },
    ],
    topic: 'Data Structures',
  },
  {
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: [
        { text: 'Bubble Sort', isCorrect: false },
        { text: 'Insertion Sort', isCorrect: false },
        { text: 'Quick Sort', isCorrect: true },
        { text: 'Selection Sort', isCorrect: false },
    ],
    topic: 'Algorithms',
  },
  {
    question: 'What is an IP address?',
    options: [
      { text: 'A unique address for a website', isCorrect: false },
      { text: 'A numerical label assigned to each device connected to a computer network', isCorrect: true },
      { text: 'A physical address of a network interface card', isCorrect: false },
      { text: 'A secure connection protocol', isCorrect: false },
    ],
    topic: 'Networking',
  },
  {
    question: 'What is the difference between TCP and UDP?',
    options: [
      { text: 'TCP is connectionless, while UDP is connection-oriented', isCorrect: false },
      { text: 'TCP is faster than UDP', isCorrect: false },
      { text: 'TCP guarantees delivery of data, while UDP does not', isCorrect: true },
      { text: 'TCP is used for broadcasting, while UDP is for unicasting', isCorrect: false },
    ],
    topic: 'Networking',
  },
  {
    question: 'What is a "deadlock" in operating systems?',
    options: [
      { text: 'A situation where a process is waiting for an event that will never occur', isCorrect: false },
      { text: 'A situation where two or more processes are blocked forever, waiting for each other', isCorrect: true },
      { text: 'A process that has terminated but still has an entry in the process table', isCorrect: false },
      { text: 'A situation where a process is consuming all CPU resources', isCorrect: false },
    ],
    topic: 'Operating Systems',
  },
  {
    question: 'What is normalization in the context of databases?',
    options: [
      { text: 'The process of securing the database', isCorrect: false },
      { text: 'The process of organizing columns and tables to minimize data redundancy', isCorrect: true },
      { text: 'The process of creating backups of the database', isCorrect: false },
      { text: 'The process of increasing query speed', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'What is the primary key in a database table?',
    options: [
      { text: 'A key that is used to link two tables together', isCorrect: false },
      { text: 'A constraint that uniquely identifies each record in a table', isCorrect: true },
      { text: 'An index that is used to speed up queries', isCorrect: false },
      { text: 'A key that can have null values', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'What is polymorphism in object-oriented programming?',
    options: [
      { text: 'The ability of a variable, function, or object to take on multiple forms', isCorrect: true },
      { text: 'The process of hiding implementation details', isCorrect: false },
      { text: 'The process of creating a new class from an existing class', isCorrect: false },
      { text: 'The process of bundling data and methods together', isCorrect: false },
    ],
    topic: 'Object-Oriented Programming',
  },
  {
    question: 'Which layer of the OSI model is responsible for routing and forwarding?',
    options: [
      { text: 'Data Link Layer', isCorrect: false },
      { text: 'Network Layer', isCorrect: true },
      { text: 'Transport Layer', isCorrect: false },
      { text: 'Session Layer', isCorrect: false },
    ],
    topic: 'Networking',
  },
  {
    question: 'What is the purpose of a firewall?',
    options: [
      { text: 'To prevent DDoS attacks', isCorrect: false },
      { text: 'To monitor and filter network traffic', isCorrect: true },
      { text: 'To encrypt data', isCorrect: false },
      { text: 'To speed up network connections', isCorrect: false },
    ],
    topic: 'Networking',
  },
  {
    question: 'What is "Big O notation" used for?',
    options: [
      { text: 'To measure the exact execution time of an algorithm', isCorrect: false },
      { text: 'To describe the performance or complexity of an algorithm', isCorrect: true },
      { text: 'To define the syntax of a programming language', isCorrect: false },
      { text: 'To calculate the memory usage of a program', isCorrect: false },
    ],
    topic: 'Algorithms',
  },
  {
    question: 'What is the difference between a process and a thread?',
    options: [
      { text: 'Processes are lighter than threads', isCorrect: false },
      { text: 'Threads share memory space, while processes do not', isCorrect: true },
      { text: 'Processes cannot be interrupted, while threads can', isCorrect: false },
      { text: 'There is no difference', isCorrect: false },
    ],
    topic: 'Operating Systems',
  },
  {
    question: 'What are ACID properties in a transaction?',
    options: [
      { text: 'Atomicity, Consistency, Isolation, Durability', isCorrect: true },
      { text: 'Availability, Concurrency, Integrity, Durability', isCorrect: false },
      { text: 'Atomicity, Concurrency, Isolation, Durability', isCorrect: false },
      { text: 'Availability, Consistency, Integrity, Durability', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'What is virtual memory?',
    options: [
      { text: 'A type of RAM', isCorrect: false },
      { text: 'A memory management capability of an OS that uses hardware and software to allow a computer to compensate for physical memory shortages', isCorrect: true },
      { text: 'A part of the hard drive used for caching', isCorrect: false },
      { text: 'A special type of memory used by the GPU', isCorrect: false },
    ],
    topic: 'Operating Systems',
  },
  {
    question: 'In Python, which keyword is used to define a function?',
    options: [
      { text: 'function', isCorrect: false },
      { text: 'def', isCorrect: true },
      { text: 'fun', isCorrect: false },
      { text: 'define', isCorrect: false },
    ],
    topic: 'Programming Concepts',
  },
  {
    question: 'What is the difference between `==` and `is` in Python?',
    options: [
      { text: '`is` compares values, `==` compares identities', isCorrect: false },
      { text: '`is` compares identities, `==` compares values', isCorrect: true },
      { text: 'They are identical', isCorrect: false },
      { text: '`is` is for integers, `==` is for strings', isCorrect: false },
    ],
    topic: 'Programming Concepts',
  },
  {
    question: 'Which of these is a characteristic of a relational database?',
    options: [
      { text: 'Data is stored in a hierarchical structure', isCorrect: false },
      { text: 'Data is stored in tables of columns and rows', isCorrect: true },
      { text: 'It uses a key-value storage model', isCorrect: false },
      { text: 'There are no predefined schemas', isCorrect: false },
    ],
    topic: 'DBMS',
  },
  {
    question: 'What is a foreign key?',
    options: [
      { text: 'A key that uniquely identifies a record in a table', isCorrect: false },
      { text: 'A field in one table that refers to the primary key in another table', isCorrect: true },
      { text: 'A key that is not part of any index', isCorrect: false },
      { text: 'A key that is used for sorting results', isCorrect: false },
    ],
    topic: 'DBMS',
  }
];
