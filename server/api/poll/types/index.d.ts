export type Poll = {
  options: PollOption[]
  isAnonymous: boolean
  description: string
  isMultiple: boolean
  startDate: string
  createdAt: string
  isVoted: boolean
  endDate: string
  title: string
  id: number
}

export type PollOption = {
  label: string
  votes: number
  id: number
}
