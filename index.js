
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
  const distance = Math.abs(Math.sqrt(y * y + x * x))

  // Only rescale when squaring finite deltas overflows or underflows to zero.
  // Keep ordinary rounding and the existing NaN/Infinity behavior unchanged.
  if (distance === 0 || distance === Infinity) {
    const scale = Math.max(Math.abs(x), Math.abs(y))
    if (scale > 0 && scale < Infinity) {
      // Binary scaling avoids division by an inexact magnitude.
      // 2^1022 also lifts the smallest subnormal above the squaring threshold.
      const factor = distance === Infinity ? Math.pow(2, -512) : Math.pow(2, 1022)
      const scaledX = x * factor
      const scaledY = y * factor
      return Math.sqrt(scaledY * scaledY + scaledX * scaledX) / factor
    }
  }

  return distance
}

module.exports = getEuclideanDistance
