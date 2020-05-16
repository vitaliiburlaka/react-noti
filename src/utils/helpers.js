export function generateUID() {
  const first = (Math.random() * 46656).toString(36).slice(-3)
  const second = Date.now().toString(36)

  return `${first}-${second}`
}

export function Timer(callback, delay) {
  let timerId
  let startTime = delay
  let remainingTime = delay

  this.clear = () => {
    clearTimeout(timerId)
  }

  this.pause = () => {
    clearTimeout(timerId)
    remainingTime -= Date.now() - startTime
  }

  this.resume = () => {
    startTime = Date.now()
    clearTimeout(timerId)
    timerId = setTimeout(callback, remainingTime)
  }

  this.resume()
}
