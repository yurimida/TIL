var textLib = require('textLib')
var http = require('http')
var console = require('console')
var config = require('config')
var fail = require('fail')

exports.findItem = findItem
exports.findItemIndex = findItemIndex
exports.findShirtsWithSize = findShirtsWithSize
exports.findShirts = findShirts
exports.findItems = findItems

function findItem(order, item) {
   return null
}

function findItemIndex(order, item) {
   return -1
}

function findItems(items, searchTerm) {
   return matches
}


function findShirtsWithSize(order, shirt, size) {
   return -1
}

function findShirts(shirts, searchTerm) {
   return matches
}