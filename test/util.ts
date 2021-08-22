export const callCounter = () => {
  const count = {}
  const track = (id, fn) => {
    count[id] = 0

    return (...args) => {
      count[id] += 1
      return fn(...args)
    }
  }

  return [count, track]
}
