// shuffle the answers array..
export const shuffleArray = (array: any[]) =>
[...array].sort(() => Math.random() - 0.5)

// replace &quot; and &amp; with respective characters
export const format = (string: string) => {
  const formatted = string.replaceAll("&quot;", '"').replaceAll("&#039;", "")
  return formatted
}
