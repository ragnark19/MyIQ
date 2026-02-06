import { QuestionCategory } from '@/types'

interface SeedQuestion {
  category: QuestionCategory
  difficulty: number
  question_data: any
  correct_answer: string
  points: number
}

export const patternQuestions: SeedQuestion[] = [
  {
    category: 'pattern',
    difficulty: 1,
    question_data: {
      type: 'matrix',
      prompt: 'Find the pattern and select the missing element.',
      matrix: [['●', '●', '○'], ['●', '○', '○'], ['○', '○', '?']],
      options: [
        { id: 'a', value: '●' },
        { id: 'b', value: '○' },
        { id: 'c', value: '◐' },
        { id: 'd', value: '◑' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 1,
    question_data: {
      type: 'matrix',
      prompt: 'Which shape completes the pattern?',
      matrix: [['▲', '■', '●'], ['■', '●', '▲'], ['●', '▲', '?']],
      options: [
        { id: 'a', value: '●' },
        { id: 'b', value: '▲' },
        { id: 'c', value: '■' },
        { id: 'd', value: '◆' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 2,
    question_data: {
      type: 'matrix',
      prompt: 'Identify the pattern and find the missing shape.',
      matrix: [['◆', '◇', '◆'], ['◇', '◆', '◇'], ['◆', '◇', '?']],
      options: [
        { id: 'a', value: '◇' },
        { id: 'b', value: '◆' },
        { id: 'c', value: '○' },
        { id: 'd', value: '□' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 2,
    question_data: {
      type: 'matrix',
      prompt: 'Complete the sequence.',
      matrix: [['↑', '→', '↓'], ['←', '↑', '→'], ['↓', '←', '?']],
      options: [
        { id: 'a', value: '↑' },
        { id: 'b', value: '↓' },
        { id: 'c', value: '←' },
        { id: 'd', value: '→' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 3,
    question_data: {
      type: 'matrix',
      prompt: 'What comes next in this pattern?',
      matrix: [['★', '☆', '★'], ['☆', '★', '★'], ['★', '★', '?']],
      options: [
        { id: 'a', value: '★' },
        { id: 'b', value: '☆' },
        { id: 'c', value: '✦' },
        { id: 'd', value: '✧' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 3,
    question_data: {
      type: 'matrix',
      prompt: 'Find the pattern rule and complete the matrix.',
      matrix: [['1', '2', '3'], ['2', '4', '6'], ['3', '6', '?']],
      options: [
        { id: 'a', value: '8' },
        { id: 'b', value: '9' },
        { id: 'c', value: '10' },
        { id: 'd', value: '12' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 4,
    question_data: {
      type: 'matrix',
      prompt: 'Which element logically completes the pattern?',
      matrix: [['A', 'C', 'E'], ['B', 'D', 'F'], ['C', 'E', '?']],
      options: [
        { id: 'a', value: 'F' },
        { id: 'b', value: 'G' },
        { id: 'c', value: 'H' },
        { id: 'd', value: 'I' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 4,
    question_data: {
      type: 'matrix',
      prompt: 'Analyze the rows and columns to find the missing element.',
      matrix: [['2', '4', '8'], ['3', '9', '27'], ['4', '16', '?']],
      options: [
        { id: 'a', value: '32' },
        { id: 'b', value: '48' },
        { id: 'c', value: '64' },
        { id: 'd', value: '256' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 5,
    question_data: {
      type: 'matrix',
      prompt: 'Complete this complex pattern matrix.',
      matrix: [['◐', '◑', '●'], ['◑', '●', '◐'], ['●', '◐', '?']],
      options: [
        { id: 'a', value: '◐' },
        { id: 'b', value: '◑' },
        { id: 'c', value: '●' },
        { id: 'd', value: '○' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 5,
    question_data: {
      type: 'matrix',
      prompt: 'Each row and column follows a pattern. Find the missing value.',
      matrix: [['1', '1', '2'], ['3', '5', '8'], ['13', '21', '?']],
      options: [
        { id: 'a', value: '29' },
        { id: 'b', value: '34' },
        { id: 'c', value: '42' },
        { id: 'd', value: '55' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 3,
    question_data: {
      type: 'matrix',
      prompt: 'What should replace the question mark?',
      matrix: [['♠', '♥', '♦'], ['♥', '♦', '♣'], ['♦', '♣', '?']],
      options: [
        { id: 'a', value: '♠' },
        { id: 'b', value: '♥' },
        { id: 'c', value: '♦' },
        { id: 'd', value: '♣' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'pattern',
    difficulty: 2,
    question_data: {
      type: 'matrix',
      prompt: 'Find the missing element in this sequence.',
      matrix: [['□', '□', '■'], ['□', '■', '■'], ['■', '■', '?']],
      options: [
        { id: 'a', value: '□' },
        { id: 'b', value: '■' },
        { id: 'c', value: '▣' },
        { id: 'd', value: '▢' }
      ]
    },
    correct_answer: 'b',
    points: 1
  }
]

export const numericalQuestions: SeedQuestion[] = [
  {
    category: 'numerical',
    difficulty: 1,
    question_data: {
      type: 'sequence',
      prompt: 'What number comes next in this sequence?',
      sequence: [2, 4, 6, 8, '?'],
      options: [
        { id: 'a', value: '9' },
        { id: 'b', value: '10' },
        { id: 'c', value: '11' },
        { id: 'd', value: '12' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 1,
    question_data: {
      type: 'sequence',
      prompt: 'Complete the sequence.',
      sequence: [5, 10, 15, 20, '?'],
      options: [
        { id: 'a', value: '22' },
        { id: 'b', value: '24' },
        { id: 'c', value: '25' },
        { id: 'd', value: '30' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 2,
    question_data: {
      type: 'sequence',
      prompt: 'Find the next number.',
      sequence: [1, 4, 9, 16, '?'],
      options: [
        { id: 'a', value: '20' },
        { id: 'b', value: '23' },
        { id: 'c', value: '25' },
        { id: 'd', value: '36' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 2,
    question_data: {
      type: 'sequence',
      prompt: 'What is the next number in the sequence?',
      sequence: [3, 6, 12, 24, '?'],
      options: [
        { id: 'a', value: '30' },
        { id: 'b', value: '36' },
        { id: 'c', value: '48' },
        { id: 'd', value: '72' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 3,
    question_data: {
      type: 'sequence',
      prompt: 'Identify the pattern and find the missing number.',
      sequence: [1, 1, 2, 3, 5, 8, '?'],
      options: [
        { id: 'a', value: '11' },
        { id: 'b', value: '12' },
        { id: 'c', value: '13' },
        { id: 'd', value: '15' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 3,
    question_data: {
      type: 'sequence',
      prompt: 'What comes next?',
      sequence: [2, 6, 12, 20, 30, '?'],
      options: [
        { id: 'a', value: '40' },
        { id: 'b', value: '42' },
        { id: 'c', value: '44' },
        { id: 'd', value: '48' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 4,
    question_data: {
      type: 'sequence',
      prompt: 'Find the next number in this complex sequence.',
      sequence: [1, 3, 7, 15, 31, '?'],
      options: [
        { id: 'a', value: '47' },
        { id: 'b', value: '55' },
        { id: 'c', value: '63' },
        { id: 'd', value: '127' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 4,
    question_data: {
      type: 'sequence',
      prompt: 'Complete this number pattern.',
      sequence: [0, 1, 8, 27, 64, '?'],
      options: [
        { id: 'a', value: '100' },
        { id: 'b', value: '125' },
        { id: 'c', value: '216' },
        { id: 'd', value: '256' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 5,
    question_data: {
      type: 'sequence',
      prompt: 'What is the missing number?',
      sequence: [2, 3, 5, 7, 11, 13, '?'],
      options: [
        { id: 'a', value: '15' },
        { id: 'b', value: '17' },
        { id: 'c', value: '19' },
        { id: 'd', value: '21' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'numerical',
    difficulty: 5,
    question_data: {
      type: 'sequence',
      prompt: 'Determine the next term.',
      sequence: [1, 4, 27, 256, '?'],
      options: [
        { id: 'a', value: '625' },
        { id: 'b', value: '1024' },
        { id: 'c', value: '3125' },
        { id: 'd', value: '15625' }
      ]
    },
    correct_answer: 'c',
    points: 1
  }
]

export const verbalQuestions: SeedQuestion[] = [
  {
    category: 'verbal',
    difficulty: 1,
    question_data: {
      type: 'analogy',
      prompt: 'Complete the analogy.',
      sequence: ['Hot', 'Cold', 'Fast'],
      options: [
        { id: 'a', value: 'Quick' },
        { id: 'b', value: 'Slow' },
        { id: 'c', value: 'Speed' },
        { id: 'd', value: 'Run' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 1,
    question_data: {
      type: 'analogy',
      prompt: 'Find the relationship.',
      sequence: ['Cat', 'Kitten', 'Dog'],
      options: [
        { id: 'a', value: 'Canine' },
        { id: 'b', value: 'Bark' },
        { id: 'c', value: 'Puppy' },
        { id: 'd', value: 'Pet' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 2,
    question_data: {
      type: 'analogy',
      prompt: 'Complete the analogy.',
      sequence: ['Author', 'Book', 'Chef'],
      options: [
        { id: 'a', value: 'Kitchen' },
        { id: 'b', value: 'Restaurant' },
        { id: 'c', value: 'Meal' },
        { id: 'd', value: 'Cook' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 2,
    question_data: {
      type: 'analogy',
      prompt: 'Find the matching relationship.',
      sequence: ['Bird', 'Nest', 'Bee'],
      options: [
        { id: 'a', value: 'Honey' },
        { id: 'b', value: 'Hive' },
        { id: 'c', value: 'Flower' },
        { id: 'd', value: 'Sting' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 3,
    question_data: {
      type: 'analogy',
      prompt: 'What word completes this analogy?',
      sequence: ['Canvas', 'Painter', 'Stage'],
      options: [
        { id: 'a', value: 'Curtain' },
        { id: 'b', value: 'Actor' },
        { id: 'c', value: 'Theater' },
        { id: 'd', value: 'Audience' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 3,
    question_data: {
      type: 'analogy',
      prompt: 'Complete the relationship.',
      sequence: ['Seed', 'Tree', 'Egg'],
      options: [
        { id: 'a', value: 'Chicken' },
        { id: 'b', value: 'Shell' },
        { id: 'c', value: 'Nest' },
        { id: 'd', value: 'Yolk' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 4,
    question_data: {
      type: 'analogy',
      prompt: 'Find the analogous term.',
      sequence: ['Elated', 'Happy', 'Furious'],
      options: [
        { id: 'a', value: 'Sad' },
        { id: 'b', value: 'Angry' },
        { id: 'c', value: 'Calm' },
        { id: 'd', value: 'Upset' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 4,
    question_data: {
      type: 'analogy',
      prompt: 'What completes this analogy?',
      sequence: ['Hypothesis', 'Theory', 'Seed'],
      options: [
        { id: 'a', value: 'Plant' },
        { id: 'b', value: 'Fruit' },
        { id: 'c', value: 'Flower' },
        { id: 'd', value: 'Root' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 5,
    question_data: {
      type: 'analogy',
      prompt: 'Complete this complex analogy.',
      sequence: ['Obfuscate', 'Clarify', 'Exacerbate'],
      options: [
        { id: 'a', value: 'Worsen' },
        { id: 'b', value: 'Ameliorate' },
        { id: 'c', value: 'Maintain' },
        { id: 'd', value: 'Intensify' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'verbal',
    difficulty: 5,
    question_data: {
      type: 'analogy',
      prompt: 'Find the analogous relationship.',
      sequence: ['Taciturn', 'Speech', 'Somnolent'],
      options: [
        { id: 'a', value: 'Sleep' },
        { id: 'b', value: 'Energy' },
        { id: 'c', value: 'Dream' },
        { id: 'd', value: 'Rest' }
      ]
    },
    correct_answer: 'b',
    points: 1
  }
]

export const spatialQuestions: SeedQuestion[] = [
  {
    category: 'spatial',
    difficulty: 1,
    question_data: {
      type: 'rotation',
      prompt: 'If this shape is rotated 90° clockwise, which option shows the result?',
      images: ['▲'],
      options: [
        { id: 'a', value: '◀' },
        { id: 'b', value: '▶' },
        { id: 'c', value: '▼' },
        { id: 'd', value: '▲' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 1,
    question_data: {
      type: 'rotation',
      prompt: 'Which shows this shape rotated 180°?',
      images: ['◢'],
      options: [
        { id: 'a', value: '◣' },
        { id: 'b', value: '◤' },
        { id: 'c', value: '◥' },
        { id: 'd', value: '◢' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 2,
    question_data: {
      type: 'rotation',
      prompt: 'If ⌐ is rotated 90° counterclockwise, what is the result?',
      images: ['⌐'],
      options: [
        { id: 'a', value: '⌐' },
        { id: 'b', value: '¬' },
        { id: 'c', value: '⌙' },
        { id: 'd', value: '⌝' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 2,
    question_data: {
      type: 'rotation',
      prompt: 'Which option shows the mirror image of this shape?',
      images: ['◣'],
      options: [
        { id: 'a', value: '◢' },
        { id: 'b', value: '◤' },
        { id: 'c', value: '◥' },
        { id: 'd', value: '◣' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 3,
    question_data: {
      type: 'rotation',
      prompt: 'If you fold a paper and punch a hole, where will the holes appear when unfolded?',
      images: ['📄'],
      options: [
        { id: 'a', value: '● ●' },
        { id: 'b', value: '●●●●' },
        { id: 'c', value: '● ● ● ●' },
        { id: 'd', value: '●' }
      ]
    },
    correct_answer: 'b',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 3,
    question_data: {
      type: 'rotation',
      prompt: 'Which 3D shape can be formed from this flat pattern?',
      images: ['⬡'],
      options: [
        { id: 'a', value: 'cube' },
        { id: 'b', value: 'pyramid' },
        { id: 'c', value: 'cylinder' },
        { id: 'd', value: 'cone' }
      ]
    },
    correct_answer: 'a',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 4,
    question_data: {
      type: 'rotation',
      prompt: 'How many cubes are in this 3D structure?',
      images: ['🧊'],
      options: [
        { id: 'a', value: '6' },
        { id: 'b', value: '7' },
        { id: 'c', value: '8' },
        { id: 'd', value: '9' }
      ]
    },
    correct_answer: 'c',
    points: 1
  },
  {
    category: 'spatial',
    difficulty: 5,
    question_data: {
      type: 'rotation',
      prompt: 'If you view this shape from above, which option shows the correct view?',
      images: ['pyramid'],
      options: [
        { id: 'a', value: '□' },
        { id: 'b', value: '△' },
        { id: 'c', value: '○' },
        { id: 'd', value: '◇' }
      ]
    },
    correct_answer: 'a',
    points: 1
  }
]

export const allQuestions: SeedQuestion[] = [
  ...patternQuestions,
  ...numericalQuestions,
  ...verbalQuestions,
  ...spatialQuestions
]
