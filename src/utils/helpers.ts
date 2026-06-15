export function generateUID(): string {
  const first = (Math.random() * 46656).toString(36).slice(-3) // 46656 = 36^3
  const second = Date.now().toString(36)

  return `${first}-${second}`
}

type TimerCallback = () => void

export class Timer {
  private timerId: ReturnType<typeof setTimeout> | undefined

  private startTime: number

  private remainingTime: number

  private callback: TimerCallback

  constructor(callback: TimerCallback, delay: number) {
    this.callback = callback
    this.startTime = Date.now()
    this.remainingTime = delay

    this.resume()
  }

  clear = (): void => {
    clearTimeout(this.timerId)
  }

  pause = (): void => {
    clearTimeout(this.timerId)
    this.remainingTime = Math.max(
      0,
      this.remainingTime - (Date.now() - this.startTime)
    )
  }

  resume = (): void => {
    this.startTime = Date.now()
    if (this.timerId) clearTimeout(this.timerId)
    this.timerId = setTimeout(this.callback, this.remainingTime)
  }
}
