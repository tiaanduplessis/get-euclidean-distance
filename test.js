const getEuclideanDistance = require('./')

test('should export function', () => {
  expect(getEuclideanDistance).toBeDefined()
  expect(typeof getEuclideanDistance).toBe('function')
})

test('should get distance between points', () => {
  const p1 = {
    lat: 11,
    lng: 12
  }

  const p2 = {
    lat: 13,
    lng: 14
  }

  const p3 = {
    x: 11,
    y: 12
  }

  const p4 = {
    x: 13,
    y: 14
  }

  expect(getEuclideanDistance(p1, p2, { xName: 'lat', yName: 'lng' })).toBe(2.8284271247461903)
  expect(getEuclideanDistance(p1, p2, { xName: 'lat', yName: 'lng' })).toBe(2.8284271247461903)
  expect(getEuclideanDistance(p3, p4)).toBe(2.8284271247461903)
})
