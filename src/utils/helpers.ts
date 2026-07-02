// Monotonic counter so IDs generated within the same millisecond can never collide.
let seq = 0

export function generateUID(): string {
  const time = Date.now().toString(36)
  const count = (seq++).toString(36) // strictly increasing, guarantees per-session uniqueness
  const rand = Math.floor(Math.random() * 46656) // 46656 = 36^3
    .toString(36)
    .padStart(3, '0')

  return `${time}-${count}-${rand}`
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
