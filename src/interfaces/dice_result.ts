import { Player } from './../classes/player'
import { DiceResults } from './../enums/dice_results'

export interface IDiceResult {
  type: DiceResults
  dice?: number[]
  player?: Player
  score?: number
}
