import { HttpResponse, http } from 'msw'

import type { Poll } from '~/repository/modules/PollModule/types'

const baseURL = process.env.NUXT_PUBLIC_BASE_URL

const polls: Poll[] = [
  {
    options: [
      {
        label: 'Test Poll 1 Option 1',
        votes: 0,
        id: 1,
      },
      {
        label: 'Test Poll 2 Option 2',
        votes: 0,
        id: 2,
      },
    ],
    description: 'Test Poll 1 Description',
    createdAt: '2022-01-02T00:00:00.000Z',
    startDate: '2022-02-04T00:00:00.000Z',
    endDate: '2022-02-01T00:00:00.000Z',
    title: 'Test Poll 1',
    anonymous: false,
    multiple: false,
    started: false,
    voted: false,
    ended: false,
    id: 1,
  },
  {
    options: [
      {
        label: 'Test Poll 1 Option 1',
        votes: 0,
        id: 1,
      },
      {
        label: 'Test Poll 2 Option 2',
        votes: 0,
        id: 2,
      },
    ],
    description: 'Test Poll 1 Description',
    createdAt: '2022-01-02T00:00:00.000Z',
    startDate: '2022-01-03T00:00:00.000Z',
    endDate: '2022-01-01T00:00:00.000Z',
    title: 'Test Poll 2',
    anonymous: false,
    multiple: false,
    started: false,
    voted: false,
    ended: false,
    id: 2,
  },
]

export const pollsHanlder = [
  http.get(`${baseURL}/poll`, () => {
    return HttpResponse.json(polls, {status: 200})
  })
]
