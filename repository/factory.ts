import type { FetchOptions, FetchContext, $Fetch } from 'ofetch'

import { createFetch } from 'oFetch'

type JsonOptions = FetchOptions<'json'>

class FetchFactory {
  private $fetch: $Fetch

  constructor() {
    const { public: configPublic } = useRuntimeConfig()

    this.$fetch = createFetch({
      defaults: {
        headers: {
          'Content-Type': 'application/json',
        },
        baseURL: configPublic.baseURL,
        onRequest: this.onRequest,
      },
    })
  }

  private onRequest({ options }: FetchContext) {
    const { token } = useUserStore()
    const headers: Headers = new Headers(options.headers)

    if (token.value) {
      headers.set('Authorization', `Bearer ${token.value}`)
    }

    options.headers = headers
  }

  protected patch<T>(url: string, data?: object, fetchOptions?: JsonOptions) {
    return useAsyncData(() =>
      this.$fetch<T>(url, {
        method: 'PATCH',
        body: data,
        ...fetchOptions,
      }),
    )
  }

  protected post<T>(url: string, data?: object, fetchOptions?: JsonOptions) {
    return useAsyncData(() =>
      this.$fetch<T>(url, {
        method: 'POST',
        body: data,
        ...fetchOptions,
      }),
    )
  }

  protected delete<T>(url: string, fetchOptions?: JsonOptions) {
    return useAsyncData(() =>
      this.$fetch<T>(url, { method: 'DELETE', ...fetchOptions }),
    )
  }

  protected get<T>(url: string, fetchOptions?: JsonOptions) {
    return useAsyncData(() =>
      this.$fetch<T>(url, { method: 'GET', ...fetchOptions }),
    )
  }
}

export default FetchFactory
