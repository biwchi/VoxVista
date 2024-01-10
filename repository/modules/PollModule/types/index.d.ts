import type { Modify } from '~/repository/types'

import type { User } from '../../AuthModule/types'

export type Poll = {
  startDate: string | null
  endDate: string | null
  options: PollOption[]
  description: string
  anonymous: boolean
  multiple: boolean
  createdAt: string
  started: boolean
  voted: boolean
  ended: boolean
  title: string
  id: number
}

export type PollComment = {
  createdAt: string
  content: string
  createdBy: User
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

export type CreateCommentRequest = {
  content: string
  pollId: number
}

export type VoteRequest = {
  optionsIds: number[]
  pollId: number
}

export type PollOption = {
  label: string
  votes: number
  id: number
}
