function getRandomInteger(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getDiceRolls(diceCount: number): number[] {
  return Array(diceCount)
    .fill(0)
    .map(_ => getRandomInteger(1, 6))
}
