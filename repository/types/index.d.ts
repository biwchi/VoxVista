export type Modify<T, R> = Omit<T, keyof R> & R

export type DefaultResponseError =
  | {
      timestamp: number
      message: string
      status: number
      error: string
      path: string
    }
  | {
      message: Record<string, string>
      status: number
    }
