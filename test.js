var targetDir = './txt'
var dest = './data'

var concat = require('./concat')

concat(targetDir, dest, function(err) {
    if (err) return console.error('ERROR:', err)
    console.log('完成')
})