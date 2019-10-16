import { scoreMap } from "./../structures/score_map"
import { without } from "../utility/without"

export function getScore(
  dice: number[],
  diceToRemove: number[]
): [number[], number] {
  const regex = RegExp(diceToRemove.join(","))
  if (!regex.test(dice.join(","))) {
    throw new Error("diceToRemove must be a subset of dice.")
  }

  const diceString = [...diceToRemove].sort((a, b) => a - b).join(",")
  const score = scoreMap[diceString]
  if (typeof score !== "number") {
    throw new Error(`no score found for dice [${diceString}].`)
  }

  return [without(dice, diceToRemove), score]
}
