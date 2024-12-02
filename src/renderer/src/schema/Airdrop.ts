import { z } from 'zod'

export const airdropSchema = z.object({
  projectName: z.string().min(1, 'Project name cannot be empty'),
  tier: z.enum(['S', 'A', 'B', 'C']),
  id: z.string().optional(),
  listing_date: z.string().optional(),
  reward: z.string().min(1, 'Reward cannot be empty').optional(),
  task: z.string().min(1, 'task for the airdrop').optional(),
  status: z.enum(['Upcoming', 'Ongoing', 'Claimable', 'ended']),
  website: z.string().url('Invalid website URL'),
  completed_at: z.string().nullable().default(null).optional()
})
export type Airdrop = z.infer<typeof airdropSchema>
