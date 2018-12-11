import TEMPLATES from './../templates'

function dataTransform (grid, paintNum, radius) {
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
        size: Math.random() * (radius*2 - radius/2) + radius/2
      })
    })
  })

  return selectPaints(paintNum, data, radius)
}

function selectPaints (number, data) {
  number = number <= data['1'].length ? number : length

  for(let p=0; p<number; p++) {
    let index = Math.round(Math.random() * (data['1'].length-1))

    if (!data['3'].includes(index)) {
      data['3'].push(data['1'][index])
      data['1'].splice(index, 1)
    }
  }
  return data
}

function findPairs() {
  
}

export default dataTransform
