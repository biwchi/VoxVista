import type { FetchError } from 'ofetch'

export const handleFetchError = (
  error: any,
  callBack: (error: FetchError) => void,
) => {
  const err = error as FetchError
  callBack(err)
}
