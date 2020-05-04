// eslint-disable-next-line import/prefer-default-export
export function generateUID() {
  const first = (Math.random() * 46656).toString(36).slice(-3)
  const second = Date.now().toString(36)

  return `${first}-${second}`
}
