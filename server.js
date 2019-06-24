const Koa = require('koa');
const Router = require('koa-router')
const static = require('./routers/static')
const ejs = require('koa-ejs')
const path = require('path')
const session = require('koa-session')
const fs=require('fs')
const body=require('koa-better-body')
let server = new Koa();
server.listen(8080)
//中间件
server.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}))
server.keys = fs.readFileSync('.keys').toString().split('\n');
server.use(session({
    maxAge:20*60*1000,
    renew:true
},server))
//数据库
server.context.db=require('./libs/database')
//渲染
ejs(server, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})
//路由和static
let router = new Router();
router.use('/admin', require('./routers/admin'))
// router.use('/www',require('./routers/www/index'))
// router.use('/api',require('./routers/api/index'))
static(router)
server.use(router.routes())