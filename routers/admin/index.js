const Router=require('koa-router');
const fs=require('await-fs')
const path=require('path')
let router = new Router();
router.get('/login',async ctx=>{
    await ctx.render('admin/login',{})
})
router.post('/login',async ctx=>{
    let {uname,upassword}=ctx.request.fields;
    let admins=JSON.parse((await fs.readFile(
        path.resolve(__dirname,'../../admin.json')
    )).toString());
    console.log(admins)
    ctx.body=admins;
})
module.exports=router.routes();