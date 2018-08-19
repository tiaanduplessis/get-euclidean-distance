
function isNumbers (...args) {
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'number') {
      return false
    }
  }

  return true
}

function getEuclideanDistance (points1, points2, {xName = 'x', yName = 'y'} = {}) {
  const {[yName]: y1, [xName]: x1} = points1
  const {[yName]: y2, [xName]: x2} = points2

  if (!isNumbers(y1, x1, y2, x2)) {
    throw new Error('Valid numbers not provided for points')
  }

  const y = y1 - y2
  const x = x1 - x2
  return Math.abs(Math.sqrt(y * y + x * x))
}

module.exports = getEuclideanDistance
