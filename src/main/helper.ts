export type Airdrop = {
  projectName: string
  tier: 'S' | 'A' | 'B' | 'C'
  status: 'Upcoming' | 'Ongoing' | 'Claimable' | 'ended'
  listing_date: string
  claimDeadline: string
  reward: string
  task: string
  network: string
  website: string
  is_finish: boolean
}

export function logWithLineNumber(message): void {
  const error = new Error()
  const stackLine = error.stack?.split('\n')[2] // Get the caller line from the stack
  const match = stackLine?.match(/:(\d+):\d+\)?$/) // Extract the line number
  const lineNumber = match ? match[1] : 'unknown'

  console.log(`[Line ${lineNumber}] ${message}`)
}
