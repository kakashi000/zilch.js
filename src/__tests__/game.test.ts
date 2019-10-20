import { Game } from "../classes/game"
import { Player } from "../classes/player"
import { DiceResults } from "../enums/dice_results"
import { IDiceResult } from "../interfaces/dice_result";
test("plays a game from start to finish", () => {
  const game = new Game(2, 3000)

  expect(game.playerCount).toBe(2)
  expect(game.players).toStrictEqual([
    new Player("Player 1"),
    new Player("Player 2")
  ])
  expect(game.winningScore).toBe(3000)

  let dice: number[]

  dice = game.nextTurn()
  expect(dice.length).toBe(6)
  expect(dice.every(num => typeof num === "number" && num >= 1 && num <= 6))

  let result: IDiceResult
  let player: Player

  game.currentTurn.dice = [1, 1, 1, 2, 3, 5]
  result = game.playDice([1, 1, 1], true, true)
  player = result.player
  expect(game.currentTurn.dice).toStrictEqual([2, 3, 5])
  expect(result.type).toBe(DiceResults.Pass)
  expect(result.score).toBe(1000)
  expect(result.dice).toStrictEqual([2, 3, 5])
  expect(player.score).toBe(1000)
  expect(player).toBe(game.currentTurn.player)

  dice = game.nextTurn()
  game.currentTurn.dice = [1, 2, 3, 4, 5, 6]
  result = game.playDice([1, 2, 3, 4, 5, 6])
  player = result.player
  expect(result.type).toBe(DiceResults.Finish)
  expect(result.score).toBe(1500)
  expect(result.dice).toStrictEqual([])
  expect(player.score).toBe(1500)

  dice = game.nextTurn()
  game.currentTurn.dice = [2, 2, 3, 4, 6, 4]
  result = game.playDice()
  player = result.player
  expect(result.type).toBe(DiceResults.Zilch)
  expect(result.score).toBe(0)
  expect(result.dice).toStrictEqual([])
  expect(player.score).toBe(1000)

  dice = game.nextTurn()
  game.currentTurn.dice = [3, 3, 3, 3, 1, 2]
  result = game.playDice([1], false, true)
  player = result.player
  expect(result.type).toBe(DiceResults.Continue)
  expect(result.score).toBe(100)
  expect(result.dice).toStrictEqual([2, 3, 3, 3, 3])
  expect(player.score).toBe(1600)

  dice = result.dice
  result = game.playDice([3, 3, 3, 3], true, true)
  player = result.player
  expect(result.type).toBe(DiceResults.Win)
  expect(result.score).toBe(4000)
  expect(result.dice).toStrictEqual([2])
  expect(player.score).toBe(5600)

  expect(player).toBe(game.currentTurn.player)
  expect(player.score >= game.winningScore)
})
