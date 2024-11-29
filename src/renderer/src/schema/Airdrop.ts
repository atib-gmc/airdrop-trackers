import { z } from 'zod'

export const airdropSchema = z.object({
  projectName: z.string().min(1, 'Project name cannot be empty'),
  tier: z.enum(['S', 'A', 'B', 'C']),
  id: z.string().optional(),
  listing_date: z.string(),
  claimDeadline: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid claim deadline format'), // Use z.date() for stricter Date handling
  reward: z.string().min(1, 'Reward cannot be empty'),
  task: z.string().min(1, 'task for the airdrop'),
  status: z.enum(['Upcoming', 'Ongoing', 'Claimable', 'ended']),
  network: z.string().min(1, 'Network cannot be empty'),
  website: z.string().url('Invalid website URL'),
  is_finish: z.boolean().default(false)
})
export type Airdrop = z.infer<typeof airdropSchema>
