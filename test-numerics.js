const assert = require('assert')
const path = require('path')

function testNumerics (getDistance) {
  const origin = { x: 0, y: 0 }
  const distance = (x, y) => getDistance({ x, y }, origin)
  const close = (actual, expected) => {
    assert.ok(actual > 0 && actual < Infinity, `Expected a positive finite distance, got ${actual}`)
    assert.ok(Math.abs(actual / expected - 1) <= 4e-16, `${actual} does not match ${expected}`)
  }

  // Scaled 3-4-5 triangles have independently known distances.
  for (const scale of [1e200, 1e-200, 1e307]) {
    close(distance(3 * scale, 4 * scale), 5 * scale)
    close(distance(-3 * scale, 4 * scale), 5 * scale)
    close(distance(4 * scale, 3 * scale), 5 * scale)
    close(getDistance(origin, { x: 3 * scale, y: 4 * scale }), 5 * scale)
  }
  for (const delta of [1e200, 1e-200, 1e308, Number.MIN_VALUE, Number.MAX_VALUE]) {
    assert.strictEqual(distance(delta, 0), delta)
    assert.strictEqual(distance(0, -delta), delta)
  }
  close(distance(1e308, 1e308), 1.4142135623730951e308)
  assert.strictEqual(distance(Number.MIN_VALUE, Number.MIN_VALUE), Number.MIN_VALUE)
  assert.strictEqual(distance(2 * Number.MIN_VALUE, 2 * Number.MIN_VALUE), 3 * Number.MIN_VALUE)
  assert.strictEqual(distance(Number.MAX_VALUE, Number.MAX_VALUE), Infinity)
  // Decimal high-precision references straddle the binary64 overflow boundary.
  assert.strictEqual(distance(2.961994715038057e307, 1.7731233685821092e308), Number.MAX_VALUE)
  assert.strictEqual(distance(2.651671072563751e307, 1.7780289683692971e308), Infinity)
  assert.strictEqual(distance(1.4488752006186736e308, 1.0641716309709155e308), Number.MAX_VALUE)
  // These exact norms are MAX_VALUE + 0.7753 ulp and + 0.4321 ulp.
  // Correct rounding would give Infinity and MAX_VALUE respectively, but this
  // calculation can double-round across that boundary. Only its two adjacent
  // output classes are promised here, not exact overflow classification.
  for (const [x, y] of [
    [8.609879762847474e307, 1.5781002223636482e308],
    [1.4234173329472606e308, 1.0979907574275878e308]
  ]) {
    const actual = distance(x, y)
    assert.ok(actual === Number.MAX_VALUE || actual === Infinity)
  }
  assert.strictEqual(getDistance({ x: Number.MAX_VALUE, y: 0 }, { x: -Number.MAX_VALUE, y: 0 }), Infinity)

  // Preserve the old formula exactly whenever it yields a finite, nonzero result.
  for (const x of [-100, -3, -0, 0.1, 1, 2, 100]) {
    for (const y of [-100, -4, 0, 0.2, 1, 2, 100]) {
      assert.strictEqual(distance(x, y), Math.abs(Math.sqrt(y * y + x * x)))
    }
  }
  assert.strictEqual(distance(100, 1), 100.00499987500625)
  assert.strictEqual(distance(2, 2), 2.8284271247461903)
  assert.strictEqual(distance(-0, 0), 0)
  assert.strictEqual(1 / distance(-0, 0), Infinity)
  assert.strictEqual(getDistance({ x: 1e200, y: 1e200 }, { x: 1e200, y: 1e200 }), 0)
  close(getDistance({ lat: 3e200, lng: 4e200 }, { lat: 0, lng: 0 }, { xName: 'lat', yName: 'lng' }), 5e200)
  assert.strictEqual(getDistance({ lat: 11, lng: 12 }, { lat: 13, lng: 14 }, { xName: 'lat', yName: 'lng' }), 2.8284271247461903)

  for (const x of [NaN, Infinity, -Infinity, 0, 1]) {
    for (const y of [NaN, Infinity, -Infinity, 0, 1]) {
      const expected = Math.abs(Math.sqrt(y * y + x * x))
      const actual = distance(x, y)
      assert.ok(actual === expected || (Number.isNaN(actual) && Number.isNaN(expected)))
    }
  }
  const infinityDifference = getDistance({ x: Infinity, y: 1 }, { x: Infinity, y: 0 })
  assert.ok(Number.isNaN(infinityDifference))
  for (const value of ['1', null, undefined, true, {}, Object(1)]) {
    assert.throws(() => distance(value, 1), /Valid numbers not provided for points/)
  }
  assert.throws(() => getDistance({}, origin), /Valid numbers not provided for points/)
}

module.exports = testNumerics

if (require.main === module) {
  const target = process.argv[2] ? path.resolve(process.argv[2]) : './'
  testNumerics(require(target))
  console.log('Numerical regression assertions passed')
}
