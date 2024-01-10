import FetchFactory from '~/repository/factory'

import type {
  CreateCommentRequest,
  CreatePollRequest,
  VoteRequest,
  PollComment,
  Poll,
} from './types'
import type { User } from '../AuthModule/types'

class PollModule extends FetchFactory {
  public getUsersFromPollOption(pollOptinId: number) {
    return useAsyncData('get-users-from-poll-option', () =>
      this.get<User[]>(`/poll/option/${pollOptinId}/users`),
    )
  }

  public getAllComments(pollId: string) {
    return useAsyncData('get-all-comment', () =>
      this.get<PollComment[]>(`/poll/comment/${pollId}`),
    )
  }

  public createComment(data: CreateCommentRequest) {
    return useAsyncData('create-comment', () =>
      this.post('/poll/comment', data),
    )
  }

  public voteForOption(data: VoteRequest) {
    return useAsyncData('vote-for-option', () =>
      this.post('/poll/option', data),
    )
  }

  public createPoll(data: CreatePollRequest) {
    return useAsyncData('create-poll', () => this.post('/poll', data))
  }

  public getUsersPolls() {
    return useAsyncData('get-users-polls', () => this.get<Poll[]>('/poll/user'))
  }

  public getPoll(id: string) {
    return useAsyncData('get-poll', () => this.get<Poll>(`/poll/${id}`))
  }

  public getPolls() {
    return useAsyncData('get-polls', () => this.get<Poll[]>('/poll'))
  }
}

export default PollModule
