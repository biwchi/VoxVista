import FetchFactory from '~/repository/factory';

import type { CreatePollRequest, VoteRequest, Poll } from './types';

class PollModule extends FetchFactory {
  public voteForOption(data: VoteRequest) {
    return this.post('/poll/option', data) 
  }

  public createPoll(data: CreatePollRequest) {
    return this.post('/poll', data)
  }

  public getPoll(id: string) {
    return this.get<Poll>(`/poll/${id}`)
  }

  public getPolls() {
    return this.get<Poll[]>('/poll')
  }
}

export default PollModule