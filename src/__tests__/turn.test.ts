import { Turn, Status } from "../classes/turn"

test("zilches turn", () => {
  const turn = new Turn([3, 3, 3, 1, 2, 3])
  turn.playDice([3, 3, 3])

  expect(turn.dice).toStrictEqual([1, 2, 3])
  expect(turn.score).toBe(300)
  expect(turn.status).toBe(Status.Continue)

  turn.playDice()

  expect(turn.dice).toStrictEqual([])
  expect(turn.score).toBe(0)
  expect(turn.status).toBe(Status.Zilch)
})

test("finishes turn", () => {
  const turn = new Turn([3, 3, 1, 1, 3, 3])
  turn.playDice([1])

  expect(turn.dice).toStrictEqual([1, 3, 3, 3, 3])
  expect(turn.score).toBe(100)
  expect(turn.status).toBe(Status.Continue)

  turn.playDice([3, 3, 3, 3])

  expect(turn.dice).toStrictEqual([1])
  expect(turn.score).toBe(4100)
  expect(turn.status).toBe(Status.Continue)

  turn.playDice([1])

  expect(turn.dice).toStrictEqual([])
  expect(turn.score).toBe(4200)
  expect(turn.status).toBe(Status.Finish)
})

test("throws errors", () => {
  const turn = new Turn([1, 2, 3, 4, 5, 6])

  expect(() => turn.playDice([1, 2, 3])).toThrow("no score")
  expect(() => turn.playDice([1, 1, 1])).toThrow("subset")
})
