import type { Modify } from '~/repository/types'

export type Poll = {
  options: PollOption[]
  description: string
  anonymous: boolean
  multiple: boolean
  startDate: string
  createdAt: string
  endDate: string
  voted: boolean
  title: string
  id: number
}

export type CreatePollRequest = Modify<
  Omit<Poll, id>,
  {
    options: { label: string }[]
    startDate?: string
    endDate?: string
  }
>

export type VoteRequest = {
  optionsIds: number[]
  pollId: number
}

export type PollOption = {
  label: string
  votes: number
  id: number
}
