import { getScore } from "../functions/get_score"
import { getDiceRolls } from "../functions/get_dice_rolls"

export enum Status {
  Continue = "continue",
  Finish = "finish",
  Zilch = "zilch"
}

export class Turn {
  dice: number[]
  score: number
  status: Status

  constructor(startingDice: number[] = getDiceRolls(6)) {
    this.dice = startingDice
    this.score = 0
  }

  playDice(diceToPlay: number[] = []) {
    if (diceToPlay.length === 0) {
      this.dice = []
      this.score = 0
      this.status = Status.Zilch
      return
    }

    const [newDice, score] = getScore(this.dice, diceToPlay)
    this.score += score
    this.dice = newDice

    if (newDice.length === 0) {
      this.status = Status.Finish
      return
    }

    this.status = Status.Continue
  }
}
