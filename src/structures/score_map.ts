export const scoreMap = {
  "1": 100,
  "5": 50,
  "1,2,3,4,5,6": 1500
}

for (let diceValue = 1; diceValue <= 6; diceValue++) {
  const tripleMultiplier = 100
  const tripleValue = diceValue === 1 ? 1000 : diceValue * tripleMultiplier
  scoreMap[
    Array(3)
      .fill(diceValue)
      .join(",")
  ] = tripleValue

  const nOfAKindMultiplier = 1000
  for (let nOfAKind = 4; nOfAKind <= 6; nOfAKind++) {
    scoreMap[[...Array(nOfAKind).fill(diceValue)].join(",")] =
      nOfAKind * nOfAKindMultiplier
  }
}
