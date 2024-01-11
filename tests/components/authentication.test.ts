import { renderSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/vue'

import authenticationVue from '~/components/base/authentication.vue'

describe('authentication', async () => {
  it('login mounts', async () => {
    const authentication = await renderSuspended(authenticationVue, {
      props: {
        modelValue: true,
        method: 'login',
      },
    })

    expect(authentication.baseElement).toBeDefined()
    expect(screen.getByRole('heading').innerHTML).toContain('Login')
  })

  it('register mounts', async () => {
    const authentication = await renderSuspended(authenticationVue, {
      props: {
        method: 'register',
        modelValue: true,
      },
    })

    expect(authentication.baseElement).toBeDefined()
    expect(screen.getByRole('heading').innerHTML).toContain('Register')
  })
})
