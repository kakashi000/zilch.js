import { IDiceResult } from './../interfaces/dice_result'
import { DiceResults } from "../enums/dice_results"
import { Player } from "./player"
import { Turn } from "./turn"
import { getScore } from "../functions/get_score"
import { getDiceRolls } from "../functions/get_dice_rolls"

export class Game {
  players: Player[]
  nextPlayer: number
  currentTurn: Turn
  winningScore: number

  constructor(playerCount: number, winningScore: number = 15000) {
    this.players = Array(playerCount)
      .fill(0)
      .map((_, i) => new Player(`Player ${i + 1}`))
    this.winningScore = winningScore
    this.nextPlayer = 0
  }

  get playerCount() {
    return this.players.length
  }

  nextTurn(): number[] {
    const turn = new Turn(this.players[this.nextPlayer])
    this.currentTurn = turn
    this.nextPlayer + 1 >= this.players.length ? this.nextPlayer = 0 : this.nextPlayer += 1
    return turn.dice
  }

  playDice(diceToPlay?: number[], passTurn?: boolean, dontRandomizeResult?: boolean): IDiceResult {
    const turn = this.currentTurn

    if (!diceToPlay) {
      turn.dice = []
      turn.score = 0
      return {
        type: DiceResults.Zilch,
        player: turn.player,
        dice: [],
        score: 0
      }
    }

    const [newDice, score] = getScore(turn.dice, diceToPlay)
    turn.score += score
    turn.dice = dontRandomizeResult ? newDice : getDiceRolls(newDice.length)
    turn.player.score += score

    const result: IDiceResult = {
      type: DiceResults.Continue,
      player: turn.player,
      dice: turn.dice,
      score
    }

    if (newDice.length === 0) {
      result.type = DiceResults.Finish
    } else if (turn.player.score >= this.winningScore) {
      result.type = DiceResults.Win
    } else if (passTurn) {
      result.type = DiceResults.Pass
    }

    return result
  }
}
