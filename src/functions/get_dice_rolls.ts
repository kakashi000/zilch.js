import { getRandomInteger } from "../utility/get_random_integer";

export function getDiceRolls(diceCount: number): number[] {
  return [...Array(diceCount)]
    .map(_ => getRandomInteger(1, 6))
}
