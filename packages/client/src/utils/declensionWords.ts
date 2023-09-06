export const declensionWords = (
  number: number,
  words: [string, string, string]
) => {
  const num = Math.abs(number) % 100
  let word = words[2]

  if (num > 10 && num < 20) {
    word = words[2]
  } else if (num % 10 === 1) {
    word = words[0]
  } else if (num % 10 > 1 && num % 10 < 5) {
    word = words[1]
  }
  return number + ' ' + word
}
