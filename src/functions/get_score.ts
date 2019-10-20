import { scoreMap } from "./../structures/score_map"
import { without } from "../utility/without"

export function getScore(
  dice: number[],
  diceToRemove: number[]
): [number[], number] {
  const sortedDice = [...dice].sort((a, b) => a - b)
  const sortedDiceToRemove = [...diceToRemove].sort((a, b) => a - b)

  const scoreKey = sortedDiceToRemove.join(",")
  const score = scoreMap[scoreKey]
  if (typeof score !== "number") {
    throw new Error(`no score found for dice [${scoreKey}].`)
  }

  try {
    return [without(sortedDice, sortedDiceToRemove), score]
  } catch (err) {
    throw new Error("diceToRemove must be a subset of dice.")
  }
}
