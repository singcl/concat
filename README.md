# nodejs 基于Stream 的文件合并模块

利用该模块可以很方便的将分片上传的多个chunk合并成一个文件。

[![npm (scoped)](https://img.shields.io/npm/v/@singcl/concat.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/concat)
![David](https://img.shields.io/david/dev/singcl/concat.svg?style=flat-square)
![David](https://img.shields.io/david/singcl/concat.svg?style=flat-square)
![Github file size](https://img.shields.io/github/size/singcl/concat/dist/concat.js.svg?style=flat-square)
![npm](https://img.shields.io/npm/dm/@singcl/concat.svg?style=flat-square)

## Install
```sh
npm i @singcl/concat -S
```
## API
### contact

#### contact(srcDir, destination，callback)
| 参数 | 数据类型 | 参数描述 |
|:-----:|:-------:|:--------|
| srcDir| String |资源目录。需要合并的文件所在的目录路径|
| destination| String |目标文件。最终合并成的文件路径|
| callback| Function |合并成功或者失败的回调函数|

- callback 回调函数
    - err callback的唯一参数，没有错误时候该参数值为null

**Example:**

*The example Dir is like this:*

![example dir](./example.png)
```js
var concat = require('@singcl/concat')

var targetDir = './txt'
var dest = './data'

// 将txt 目录下所有文件合并为一个名为data的无扩展名的文件
concat(targetDir, dest, function(err) {
    if (err) return console.error('ERROR:', err)
    console.log('完成')
})

```