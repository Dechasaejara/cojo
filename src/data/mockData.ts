import { Module, Badge, Lesson, Quiz } from '@/types';

// Mock Badges
export const badges: Badge[] = [
  {
    id: '1',
    name: 'First Code',
    description: 'Completed your first coding quiz',
    imageUrl: '/badges/first-code.svg',
    criteria: 'Complete 1 quiz',
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Maintained a 7-day streak',
    imageUrl: '/badges/streak-master.svg',
    criteria: 'Maintain a 7-day streak',
  },
  {
    id: '3',
    name: 'Bug Hunter',
    description: 'Fixed 10 bugs in the bug-fixing challenges',
    imageUrl: '/badges/bug-hunter.svg',
    criteria: 'Fix 10 bugs',
  },
  {
    id: '4',
    name: 'Syntax Pro',
    description: 'Scored 100% in 5 syntax quizzes',
    imageUrl: '/badges/syntax-pro.svg',
    criteria: 'Score 100% in 5 syntax quizzes',
  },
  {
    id: '5',
    name: 'Algorithm Ace',
    description: 'Completed all algorithm challenges',
    imageUrl: '/badges/algorithm-ace.svg',
    criteria: 'Complete all algorithm challenges',
  },
];

// Mock Quizzes
const jsBasicsQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    lessonId: 'lesson-1',
    type: 'multiple-choice',
    question: 'Which of the following is used to declare a variable in JavaScript?',
    options: ['var', 'let', 'const', 'All of the above'],
    correctAnswer: 'All of the above',
    explanation: 'In JavaScript, you can declare variables using var, let, or const keywords.',
    points: 10,
    timeLimit: 30,
  },
  {
    id: 'quiz-2',
    lessonId: 'lesson-1',
    type: 'fill-in-the-blank',
    question: 'To output a message to the console, you use console.___();',
    correctAnswer: 'log',
    explanation: 'console.log() is used to output messages to the console, which is helpful for debugging.',
    points: 10,
    timeLimit: 20,
  },
  {
    id: 'quiz-3',
    lessonId: 'lesson-1',
    type: 'code-completion',
    question: 'Complete the function to return the sum of two numbers:',
    codeSnippet: `function addNumbers(a, b) {\n  // Your code here\n}`,
    correctAnswer: `function addNumbers(a, b) {\n  return a + b;\n}`,
    explanation: 'The function needs to return the sum of parameters a and b.',
    language: 'javascript',
    points: 20,
    timeLimit: 60,
  },
  {
    id: 'quiz-4',
    lessonId: 'lesson-1',
    type: 'bug-fixing',
    question: 'Fix the bug in the following code:',
    codeSnippet: `function multiplyNumbers(a, b) {\n  return a - b;\n}`,
    correctAnswer: `function multiplyNumbers(a, b) {\n  return a * b;\n}`,
    explanation: 'The function should multiply numbers, not subtract them.',
    language: 'javascript',
    points: 15,
    timeLimit: 45,
  },
  {
    id: 'quiz-5',
    lessonId: 'lesson-1',
    type: 'true-false',
    question: 'JavaScript is a statically typed language.',
    correctAnswer: 'false',
    explanation: 'JavaScript is a dynamically typed language, which means types are checked during runtime, not compilation.',
    points: 5,
    timeLimit: 15,
  },
];

const jsControlFlowQuizzes: Quiz[] = [
  {
    id: 'quiz-6',
    lessonId: 'lesson-2',
    type: 'multiple-choice',
    question: 'Which statement is used to make decisions in JavaScript?',
    options: ['for', 'while', 'if', 'switch'],
    correctAnswer: 'if',
    explanation: 'The if statement is used to make decisions based on conditions.',
    points: 10,
    timeLimit: 30,
  },
  {
    id: 'quiz-7',
    lessonId: 'lesson-2',
    type: 'code-completion',
    question: 'Complete the for loop to count from 1 to 10:',
    codeSnippet: `for (let i = 1; i <= 10; ) {\n  console.log(i);\n}`,
    correctAnswer: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`,
    explanation: 'The loop needs an increment operation (i++) to advance to the next number.',
    language: 'javascript',
    points: 15,
    timeLimit: 40,
  },
  {
    id: 'quiz-8',
    lessonId: 'lesson-2',
    type: 'bug-fixing',
    question: 'Fix the bug in the following code:',
    codeSnippet: `let count = 0;\nwhile (count < 5) {\n  console.log(count);\n}`,
    correctAnswer: `let count = 0;\nwhile (count < 5) {\n  console.log(count);\n  count++;\n}`,
    explanation: 'The while loop is missing the increment for count, causing an infinite loop.',
    language: 'javascript',
    points: 20,
    timeLimit: 60,
  },
];

// Python basics quizzes
const pythonBasicsQuizzes: Quiz[] = [
  {
    id: 'quiz-9',
    lessonId: 'lesson-3',
    type: 'multiple-choice',
    question: 'What is the correct way to create a variable in Python?',
    options: ['var x = 5', 'let x = 5', 'x = 5', 'int x = 5'],
    correctAnswer: 'x = 5',
    explanation: 'In Python, you create variables by assigning values directly without using keywords.',
    points: 10,
    timeLimit: 30,
  },
  {
    id: 'quiz-10',
    lessonId: 'lesson-3',
    type: 'fill-in-the-blank',
    question: 'To print a message to the console in Python, you use _____()',
    correctAnswer: 'print',
    explanation: 'The print() function is used to output information to the console in Python.',
    points: 10,
    timeLimit: 20,
  },
  {
    id: 'quiz-11',
    lessonId: 'lesson-3',
    type: 'code-completion',
    question: 'Complete the function to return the sum of two numbers:',
    codeSnippet: `def add_numbers(a, b):\n    # Your code here`,
    correctAnswer: `def add_numbers(a, b):\n    return a + b`,
    explanation: 'The function needs to return the sum of parameters a and b.',
    language: 'python',
    points: 20,
    timeLimit: 60,
  },
];

// Biology Quizzes
const biologyBasicsQuizzes: Quiz[] = [
  {
    id: 'quiz-12',
    lessonId: 'lesson-4',
    type: 'multiple-choice',
    question: 'What is the basic unit of life?',
    options: ['Atom', 'Cell', 'Tissue', 'Organ'],
    correctAnswer: 'Cell',
    explanation: 'The cell is the basic structural and functional unit of life.',
    points: 10,
    timeLimit: 20,
  },
  {
    id: 'quiz-13',
    lessonId: 'lesson-4',
    type: 'multiple-choice',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria generate energy for the cell.',
    points: 10,
    timeLimit: 20,
  },
];

// Physics Quizzes
const physicsBasicsQuizzes: Quiz[] = [
  {
    id: 'quiz-14',
    lessonId: 'lesson-5',
    type: 'multiple-choice',
    question: 'What is the unit of force?',
    options: ['Newton', 'Joule', 'Watt', 'Pascal'],
    correctAnswer: 'Newton',
    explanation: 'The SI unit of force is the Newton (N).',
    points: 10,
    timeLimit: 20,
  },
  {
    id: 'quiz-15',
    lessonId: 'lesson-5',
    type: 'multiple-choice',
    question: 'What is the speed of light in a vacuum?',
    options: ['3 × 10^8 m/s', '3 × 10^6 m/s', '3 × 10^4 m/s', '3 × 10^2 m/s'],
    correctAnswer: '3 × 10^8 m/s',
    explanation: 'The speed of light in a vacuum is approximately 3 × 10^8 meters per second.',
    points: 10,
    timeLimit: 20,
  },
];

// Chemistry Quizzes
const chemistryBasicsQuizzes: Quiz[] = [
  {
    id: 'quiz-16',
    lessonId: 'lesson-6',
    type: 'multiple-choice',
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'O2', 'CO2', 'NaCl'],
    correctAnswer: 'H2O',
    explanation: 'The chemical formula for water is H2O.',
    points: 10,
    timeLimit: 20,
  },
  {
    id: 'quiz-17',
    lessonId: 'lesson-6',
    type: 'multiple-choice',
    question: 'What is the pH of a neutral solution?',
    options: ['0', '7', '14', '10'],
    correctAnswer: '7',
    explanation: 'A neutral solution has a pH of 7.',
    points: 10,
    timeLimit: 20,
  },
];

// Mock Lessons
const javascriptLessons: Lesson[] = [
  {
    id: 'lesson-1',
    moduleId: 'module-1',
    title: 'JavaScript Basics',
    description: 'Learn about variables, data types, and basic operations in JavaScript.',
    slug: 'javascript-basics',
    order: 1,
    quizzes: jsBasicsQuizzes,
    points: 50,
    completionTime: 15,
    difficulty: 'beginner',
  },
  {
    id: 'lesson-2',
    moduleId: 'module-1',
    title: 'Control Flow',
    description: 'Learn about conditional statements and loops in JavaScript.',
    slug: 'control-flow',
    order: 2,
    quizzes: jsControlFlowQuizzes,
    points: 75,
    completionTime: 20,
    difficulty: 'beginner',
  },
];

const pythonLessons: Lesson[] = [
  {
    id: 'lesson-3',
    moduleId: 'module-2',
    title: 'Python Basics',
    description: 'Learn about variables, data types, and basic operations in Python.',
    slug: 'python-basics',
    order: 1,
    quizzes: pythonBasicsQuizzes,
    points: 50,
    completionTime: 15,
    difficulty: 'beginner',
  },
];

// Biology Lessons
const biologyLessons: Lesson[] = [
  {
    id: 'lesson-4',
    moduleId: 'module-6',
    title: 'Biology Basics',
    description: 'Learn about the basic units of life and cell structures.',
    slug: 'biology-basics',
    order: 1,
    quizzes: biologyBasicsQuizzes,
    points: 50,
    completionTime: 15,
    difficulty: 'beginner',
  },
];

// Physics Lessons
const physicsLessons: Lesson[] = [
  {
    id: 'lesson-5',
    moduleId: 'module-7',
    title: 'Physics Basics',
    description: 'Understand fundamental concepts like force and speed of light.',
    slug: 'physics-basics',
    order: 1,
    quizzes: physicsBasicsQuizzes,
    points: 50,
    completionTime: 15,
    difficulty: 'beginner',
  },
];

// Chemistry Lessons
const chemistryLessons: Lesson[] = [
  {
    id: 'lesson-6',
    moduleId: 'module-8',
    title: 'Chemistry Basics',
    description: 'Learn about chemical symbols and pH levels.',
    slug: 'chemistry-basics',
    order: 1,
    quizzes: chemistryBasicsQuizzes,
    points: 50,
    completionTime: 15,
    difficulty: 'beginner',
  },
];

// Mock Modules
export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming language.',
    slug: 'javascript-fundamentals',
    level: 1,
    lessons: javascriptLessons,
    requiredPoints: 0,
    imageUrl: '/modules/javascript.svg',
  },
  {
    id: 'module-2',
    title: 'Python Fundamentals',
    description: 'Master the basics of Python programming language.',
    slug: 'python-fundamentals',
    level: 1,
    lessons: pythonLessons,
    requiredPoints: 0,
    imageUrl: '/modules/python.svg',
  },
  {
    id: 'module-3',
    title: 'HTML & CSS Fundamentals',
    description: 'Learn the basics of web development with HTML and CSS.',
    slug: 'html-css-fundamentals',
    level: 1,
    lessons: [],
    requiredPoints: 0,
    imageUrl: '/modules/html-css.svg',
  },
  {
    id: 'module-4',
    title: 'Advanced JavaScript',
    description: 'Dive deeper into JavaScript with advanced concepts and patterns.',
    slug: 'advanced-javascript',
    level: 2,
    lessons: [],
    requiredPoints: 125,
    imageUrl: '/modules/advanced-js.svg',
  },
  {
    id: 'module-5',
    title: 'React Fundamentals',
    description: 'Build interactive UIs with React.',
    slug: 'react-fundamentals',
    level: 2,
    lessons: [],
    requiredPoints: 250,
    imageUrl: '/modules/react.svg',
  },
  {
    id: 'module-6',
    title: 'Biology Fundamentals',
    description: 'Explore the basics of biology, including cells and organelles.',
    slug: 'biology-fundamentals',
    level: 1,
    lessons: biologyLessons,
    requiredPoints: 0,
    imageUrl: '/modules/biology.svg',
  },
  {
    id: 'module-7',
    title: 'Physics Fundamentals',
    description: 'Learn the basics of physics, including force and motion.',
    slug: 'physics-fundamentals',
    level: 1,
    lessons: physicsLessons,
    requiredPoints: 0,
    imageUrl: '/modules/physics.svg',
  },
  {
    id: 'module-8',
    title: 'Chemistry Fundamentals',
    description: 'Understand the basics of chemistry, including chemical formulas and reactions.',
    slug: 'chemistry-fundamentals',
    level: 1,
    lessons: chemistryLessons,
    requiredPoints: 0,
    imageUrl: '/modules/chemistry.svg',
  },
];

// Mock leaderboard data
export const leaderboardData = [
  { userId: '1', username: 'CodeNinja', userImage: '/avatars/user1.png', rank: 1, points: 750 },
  { userId: '2', username: 'DevMaster', userImage: '/avatars/user2.png', rank: 2, points: 680 },
  { userId: '3', username: 'JavaScriptPro', userImage: '/avatars/user3.png', rank: 3, points: 645 },
  { userId: '4', username: 'PythonWhiz', userImage: '/avatars/user4.png', rank: 4, points: 610 },
  { userId: '5', username: 'WebWizard', userImage: '/avatars/user5.png', rank: 5, points: 580 },
  { userId: '6', username: 'AlgorithmAce', userImage: '/avatars/user6.png', rank: 6, points: 530 },
  { userId: '7', username: 'CodeCrafter', userImage: '/avatars/user7.png', rank: 7, points: 490 },
  { userId: '8', username: 'FullStackFanatic', userImage: '/avatars/user8.png', rank: 8, points: 460 },
  { userId: '9', username: 'BugBuster', userImage: '/avatars/user9.png', rank: 9, points: 410 },
  { userId: '10', username: 'TechTalent', userImage: '/avatars/user10.png', rank: 10, points: 385 },
];
