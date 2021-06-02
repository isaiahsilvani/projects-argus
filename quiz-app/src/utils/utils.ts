// shuffle the answers array..
export const shuffleArray = (array: any[]) =>
[...array].sort(() => Math.random() - 0.5)

// replace &quot; and &amp; with respective characters
export const formatQuestion = (question: string) => {
  const formattedQuestion = question.replaceAll("&quot;", '"')
  return formattedQuestion
}
