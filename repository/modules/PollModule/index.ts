import FetchFactory from '~/repository/factory'

import type { CreatePollRequest, VoteRequest, Poll } from './types'

class PollModule extends FetchFactory {
  public voteForOption(data: VoteRequest) {
    return useAsyncData('vote-for-option', () => this.post('/poll/option', data))
  }

  public createPoll(data: CreatePollRequest) {
    return useAsyncData('create-poll', () => this.post('/poll', data))
  }

  public getPoll(id: string) {
    return useAsyncData('get-poll', () => this.get<Poll>(`/poll/${id}`))
  }

  public getPolls() {
    return useAsyncData('get-polls', () => this.get<Poll[]>('/poll'))
  }
}

export default PollModule