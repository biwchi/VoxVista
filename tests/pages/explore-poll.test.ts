import { renderSuspended, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/vue'

import explorePollsVue from '~/pages/explore-polls.vue'

const getPolls = vi.fn(() => {
  {
    return {
      data: [
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
          startDate: '2022-01-04T00:00:00.000Z',
          endDate: '2022-01-01T00:00:00.000Z',
          title: 'Test Poll 1',
          anonymous: false,
          multiple: false,
          started: false,
          voted: false,
          ended: false,
          id: 1,
        },
      ],
    }
  }
})

describe('explore-poll', async () => {
  it('explore-poll mounts', async () => {
    const explorePoll = await renderSuspended(explorePollsVue)

    expect(explorePoll.baseElement).toBeDefined()
    expect(explorePoll.findByText('No polls found =(')).toBeTruthy()
  })

  it('explore-poll render polls data', async () => {
    vi.sp
    vi.stubGlobal('useNuxtApp', () => {
      return {
        $api: {
          poll: {
            getPolls,
          },
        },
      }
    })

    const explorePoll = await mountSuspended(explorePollsVue)

    expect(explorePoll.element).toBeDefined()
    expect(getPolls).toHaveBeenCalledTimes(1)

    screen.debug()
  })
})
