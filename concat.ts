import fs = require('fs');
import path = require('path');
/* tslint:disable: callable-types only-arrow-functions */

function concat(targetDir: string, destination: string, callback: (err: any) => void): void {
    fs.readdir(targetDir, function(err, files) {
        if (err) {
            typeof callback === 'function' ? callback(err) : console.error(err);
            return;
        }

        let fileReadStream: fs.ReadStream;
        const fileWriteStream: fs.WriteStream = fs.createWriteStream(destination);

        fileWriteStream.on('close', function() {
            if (typeof callback === 'function') { callback(null); }
        });

        fileWriteStream.on('error', function(err1) {
            typeof callback === 'function' ? callback(err1) : console.error(err1);
        });

        fileWriteStream.on('finish', function() {
            console.log('All writes are now complete.');
        });

        // Invoke createSteamFile
        createSteamFile(files);

        // 递归 从每个文件创建readStream pipe 到同一个 writeStream
        function createSteamFile(files1: string[]) {
            if (files1.length === 0) {
                fileWriteStream.end();
                return;
            }

            const currentFile = path.join(targetDir, files1.shift() || '');
            fileReadStream = fs.createReadStream(currentFile);
            fileReadStream.pipe(fileWriteStream, { end: false });

            fileReadStream.on('data', function(chunk) {
                // console.log('Received ' + chunk.length + ' bytes of ' + currentFile);
            });

            fileReadStream.on('end', function() {
                console.log(currentFile + ' has appended to writeStream.');
                createSteamFile(files1);
            });

            fileReadStream.on('error', function(err2) {
                typeof callback === 'function'
                    ? callback(err2)
                    : console.error(err2);
            });
        }
    });
}

export = concat;
