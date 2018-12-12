import TEMPLATES from './../templates'

function dataTransform (grid, paintNum, radius, direction) {
  let data = {
    0: [], // empty
    1: [], // random dot
    2: [], // fix dot
    3: [] // paint
  }

  grid.forEach((line, yi) => {
    line.forEach((item, xi) => {
      data[item].push({
        x: xi,
        y: yi,
        size: (Math.random() * (radius*2 - radius/2)) + radius/2
      })
    })
  })

  return selectPaints(paintNum, data, direction)
}

function selectPaints (number, data, direction) {
  number = number <= data['1'].length ? number : data['1'].length

  let directions = [-1, 1]

  for(let p=0; p<number; p++) {
    let index = Math.round(Math.random() * (data['1'].length-1))

    if (!data['3'].includes(index)) {
      let selected = data['1'][index]
      data['3'].push(selected)
      data['1'].splice(index, 1)

      selected.pair = {}
      let cx = Math.round(Math.random())
      let cy = Math.round(Math.random())

      if(direction === 'diagonal') {
        selected.pair.x = selected.x + directions[cx]
        selected.pair.y = selected.y + directions[cy]
      } else if (direction === 'vertical') {
        selected.pair.x = selected.x
        selected.pair.y = selected.y + directions[cy]
      } else if (direction === 'horizontal') {
        selected.pair.x = selected.x + directions[cx]
        selected.pair.y = selected.y
      }
    }
  }
  return data
}

export default dataTransform
