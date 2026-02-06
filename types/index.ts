export type QuestionCategory = 'pattern' | 'verbal' | 'numerical' | 'spatial'

export type SessionStatus = 'in_progress' | 'completed' | 'paid'

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Question {
  id: string
  category: QuestionCategory
  difficulty: number
  question_data: QuestionData
  correct_answer: string
  time_limit_seconds: number | null
  points: number
  explanation: string | null
  created_at: string
}

export interface QuestionData {
  type: 'pattern' | 'sequence' | 'analogy' | 'rotation' | 'matrix'
  prompt: string
  options: QuestionOption[]
  images?: string[]
  matrix?: string[][]
  sequence?: (string | number)[]
}

export interface QuestionOption {
  id: string
  value: string
  image?: string
}

export interface TestSession {
  id: string
  session_token: string
  email: string | null
  started_at: string
  completed_at: string | null
  current_section: number
  status: SessionStatus
  raw_score: number | null
  iq_score: number | null
  percentile: number | null
  created_at: string
}

export interface TestResponse {
  id: string
  session_id: string
  question_id: string
  user_answer: string
  is_correct: boolean
  time_spent_seconds: number
  answered_at: string
}

export interface Payment {
  id: string
  session_id: string
  paddle_transaction_id: string
  amount: number
  currency: string
  status: PaymentStatus
  customer_email: string
  paid_at: string | null
  created_at: string
}

export interface Certificate {
  id: string
  session_id: string
  certificate_number: string
  pdf_url: string | null
  generated_at: string
}

export interface TestSection {
  id: number
  name: string
  category: QuestionCategory
  questionCount: number
  timeLimit: number
  description: string
}

export const TEST_SECTIONS: TestSection[] = [
  {
    id: 1,
    name: 'Pattern Recognition',
    category: 'pattern',
    questionCount: 12,
    timeLimit: 480,
    description: 'Identify patterns and complete sequences in visual matrices'
  },
  {
    id: 2,
    name: 'Numerical Reasoning',
    category: 'numerical',
    questionCount: 10,
    timeLimit: 360,
    description: 'Solve number sequences and mathematical logic problems'
  },
  {
    id: 3,
    name: 'Verbal Reasoning',
    category: 'verbal',
    questionCount: 10,
    timeLimit: 360,
    description: 'Analyze word relationships and analogies'
  },
  {
    id: 4,
    name: 'Spatial Reasoning',
    category: 'spatial',
    questionCount: 8,
    timeLimit: 300,
    description: 'Visualize 3D objects and mental rotations'
  }
]

export interface CategoryScore {
  category: QuestionCategory
  correct: number
  total: number
  percentage: number
}

export interface TestResult {
  iqScore: number
  percentile: number
  rawScore: number
  totalQuestions: number
  categoryScores: CategoryScore[]
  strengths: string[]
  weaknesses: string[]
  timeSpent: number
}

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: Question
        Insert: Partial<Question>
        Update: Partial<Question>
      }
      test_sessions: {
        Row: TestSession
        Insert: Partial<TestSession>
        Update: Partial<TestSession>
      }
      test_responses: {
        Row: TestResponse
        Insert: Partial<TestResponse>
        Update: Partial<TestResponse>
      }
      payments: {
        Row: Payment
        Insert: Partial<Payment>
        Update: Partial<Payment>
      }
      certificates: {
        Row: Certificate
        Insert: Partial<Certificate>
        Update: Partial<Certificate>
      }
    }
  }
}
