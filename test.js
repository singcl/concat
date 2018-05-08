var targetDir = './txt'
var createJSON = './data'

var concat = require('./concat')

concat(targetDir, createJSON, function(err) {
    if (err) return console.error('ERROR:', err)
    console.log('完成')
})