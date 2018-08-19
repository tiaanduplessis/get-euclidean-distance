const getEuclideanDistance = require('get-euclidean-distance')

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

console.log(getEuclideanDistance(p1, p2, { xName: 'lat', yName: 'lng' })) // 2.8284271247461903
console.log(getEuclideanDistance(p1, p2, { xName: 'lat', yName: 'lng' })) // 2.8284271247461903
console.log(getEuclideanDistance(p3, p4)) // 2.8284271247461903
