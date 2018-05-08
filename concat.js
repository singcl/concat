var fs = require('fs')
var path = require('path')

function concat(targetDir, destination, callback) {
    fs.readdir(targetDir, function(err, files) {
        if (err) {
            (typeof callback === 'function') ? callback(err) : console.error(err)
            return
        }
    
        var fileReadStream
        var fileWriteStream = fs.createWriteStream(destination)
    
        fileWriteStream.on('close', function() {
            (typeof callback === 'function') && callback(null)
        })
    
        fileWriteStream.on('error', function(err) {
            (typeof callback === 'function') ? callback(err) : console.error(err)
        })
    
        fileWriteStream.on('finish', function() {
            console.log('All writes are now complete.')
        })
        
        // Invoke createSteamFile
        createSteamFile()
        
        // 递归 从每个文件创建readStream pipe 到同一个 writeStream
        function createSteamFile() {
            if (files.length === 0) {
                fileWriteStream.end()
                return
            }
    
            var currentFile = path.join(targetDir, files.shift())
            fileReadStream = fs.createReadStream(currentFile)
            fileReadStream.pipe(fileWriteStream, { end: false })
    
            fileReadStream.on('data', function(chunk) {
                // console.log('Received ' + chunk.length + ' bytes of ' + currentFile);
            })
    
            fileReadStream.on('end', function() {
                console.log(currentFile + ' has appended to writeStream.')
                createSteamFile()
            })
    
            fileReadStream.on('error', function(err) {
                (typeof callback === 'function') ? callback(err) : console.error(err)
            })
        }
    })
}

module.exports = concat
