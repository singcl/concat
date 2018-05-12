const targetDir = './txt';
const dest = './data';

import concat = require('./concat');

concat(targetDir, dest, (err) => {
    if (err) { return console.error('ERROR:', err); }
    console.log('完成');
});
