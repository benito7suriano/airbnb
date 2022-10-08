export const isMultiple = (number) => (number === 0 || number > 1 ? 's' : '')

export const clipTitle = (title) => {
  if (title.length > 20) {
    return `${title.substring(0, 20)}...`
  }

  return title
}
