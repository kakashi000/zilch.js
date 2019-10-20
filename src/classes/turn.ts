import { getDiceRolls } from "../functions/get_dice_rolls"
import { Player } from "./player"

export class Turn {
  dice: number[]
  score: number
  player: Player

  constructor(player: Player, startingDice: number[] = getDiceRolls(6)) {
    this.score = 0
    this.player = player
    this.dice = startingDice
  }
}
