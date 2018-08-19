
# @tiaanduplessis/get-euclidean-distance
[![package version](https://img.shields.io/npm/v/@tiaanduplessis/get-euclidean-distance.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/get-euclidean-distance)
[![package downloads](https://img.shields.io/npm/dm/@tiaanduplessis/get-euclidean-distance.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/get-euclidean-distance)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/@tiaanduplessis/get-euclidean-distance.svg?style=flat-square)](https://npmjs.org/package/@tiaanduplessis/get-euclidean-distance)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Get distance between two coordinates using euclidean distance formula

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install @tiaanduplessis/get-euclidean-distance
$ # OR
$ yarn add @tiaanduplessis/get-euclidean-distance
```

## Usage

```js
const getEuclideanDistance = require('@tiaanduplessis/get-euclidean-distance')

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

```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature 
4. Submit a pull request

## License

MIT
    