const func = process.argv[2]

if(!func) throw new Error('你必须指定函数名称')

const app = require(`../functions/${func}/app`)

app.listen(3000,()=>console.log('> http://localhost:3000'))