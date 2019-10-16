export function without(array: any[], values: any[]): any[] {
  const copy = [...values]
  return array.reduce((acc, curr) => {
    const indexOfDiceRemoval = copy.findIndex(die => {
      return die === curr
    })
    if (indexOfDiceRemoval > -1) {
      copy.splice(indexOfDiceRemoval, 1)
      return acc
    }
    return [...acc, curr]
  }, [])
}
