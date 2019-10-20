import { Game } from "./../classes/game"
import { Turn } from "../classes/turn"
import { Player } from "../classes/player"

const game = new Game(3)
const testPlayer = new Player("test")

test("zilches turn", () => {
  const turn = new Turn(testPlayer, [3, 3, 3, 1, 2, 3])
  game.currentTurn = turn

  const continueResult = game.playDice([3, 3, 3], false, true)

  expect(continueResult.dice).toStrictEqual([1, 2, 3])
  expect(continueResult.score).toBe(300)
  expect(continueResult.player).toBe(turn.player)

  const zilchResult = game.playDice()

  expect(zilchResult.dice).toStrictEqual([])
  expect(zilchResult.score).toBe(0)
  expect(zilchResult.player).toBe(turn.player)
})

test("finishes turn", () => {
  game.currentTurn = new Turn(testPlayer, [3, 3, 1, 1, 3, 3])

  let currentResult

  currentResult = game.playDice([1], false, true)

  expect(currentResult.dice).toStrictEqual([1, 3, 3, 3, 3])
  expect(currentResult.score).toBe(100)

  currentResult = game.playDice([3, 3, 3, 3], false, true)

  expect(currentResult.dice).toStrictEqual([1])
  expect(currentResult.score).toBe(4000)

  currentResult = game.playDice([1], false, true)

  expect(currentResult.dice).toStrictEqual([])
  expect(currentResult.score).toBe(100)
})

test("throws errors", () => {
  game.currentTurn = new Turn(testPlayer, [1, 2, 3, 4, 5, 6])

  expect(() => game.playDice([1, 2, 3])).toThrow("no score")
  expect(() => game.playDice([1, 1, 1])).toThrow("subset")
})
