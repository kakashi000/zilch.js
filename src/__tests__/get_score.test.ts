import { getScore } from "../functions/get_score"

test("scoring", () => {
  expect(getScore([1, 2, 2, 2, 3, 4], [2, 2, 2])).toStrictEqual([
    [1, 3, 4],
    200
  ])

  expect(getScore([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])).toStrictEqual([
    [],
    1500
  ])

  expect(getScore([1, 1, 1, 4, 5, 6], [1])).toStrictEqual([
    [1, 1, 4, 5, 6],
    100
  ])

  expect(getScore([2, 4, 3, 2, 3, 2], [2, 2, 2])).toStrictEqual([
    [3, 3, 4],
    200
  ])

  expect(getScore([1, 1, 1], [1])).toStrictEqual([[1, 1], 100])

  expect(getScore([2, 2, 2, 2, 2], [2, 2, 2, 2])).toStrictEqual([[2], 4000])

  expect(() => getScore([1, 2, 3, 4, 5, 6], [1, 1, 1])).toThrow(
    "must be a subset"
  )

  expect(() => getScore([1, 2, 3, 4, 5, 6], [1, 2, 3])).toThrow(
    "no score found"
  )
})
