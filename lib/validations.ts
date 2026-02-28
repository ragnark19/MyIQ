import { z } from 'zod'

export const uuidSchema = z.string().uuid()

export const sectionSchema = z.number().int().min(1).max(4)

export const emailSchema = z.string().email().max(254)

export const submitAnswerSchema = z.object({
  sessionId: uuidSchema,
  questionId: uuidSchema,
  answer: z.string().max(500),
  timeSpent: z.number().int().min(0).max(3600),
})

export const updateSessionSectionSchema = z.object({
  sessionId: uuidSchema,
  currentSection: sectionSchema,
})

export const updateSessionEmailSchema = z.object({
  sessionId: uuidSchema,
  email: emailSchema,
})

export const calculateScoreSchema = z.object({
  sessionId: uuidSchema,
})

export const adminLoginSchema = z.object({
  password: z.string().min(1).max(256),
})

export const devBypassSchema = z.object({
  sessionId: uuidSchema,
  email: z.string().email().max(254).optional(),
})
