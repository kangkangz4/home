const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('koa-log4')
const convert = require('koa-convert')
const session = require('koa-generic-session')
const cros = require('koa-cors')
const helmet = require('koa-helmet')
const JsonError = require('./error').JsonError

//----------------------------
require('./log') //引入（运行）日志配置文件， 生产日志目录及相应文件
const logger = log4js.getLogger('app') //将当前文件日志命名为 app
logger.info('--------step into koa---------')
//----------------------------

//连接数据库
import config from './config'
import {connectDB, initDB } from './db'
(async() => {
  try{
    await connectDB(config.mongodb.uri);
    await initDB();
  }catch(error){
    console.log(error);
  }
})();

// error handler
onerror(app)

app.keys = ['secret']
// middlewares
app.use(convert(session()))
app.use(convert(cros()))
app.use(helmet())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/views'))

//------------- 记录所有http请求---------------
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
//-------------------------------------------

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))
const koaNunjucks = require('koa-nunjucks-2')
//template
app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
	try{
		await next()
	}catch(e){
		logger.error(e)
		let code = e.code || 500
		let message = e.message || '服务器错误'
		if(e instanceof JsonError){
			ctx.body = {
				'code': code,
				'message': message
			}
			// if(status == 500){
				//打印错误日志
				// logger.error(e)
			// }
			return
		}
		// this.status = code
		// if(code == 403){
		// 	await ctx.render('403.html', {'err':e})
		// }
		// if(code == 404){
		// 	await ctx.render('404.html', {'err':e})
		// }
		// if(code == 500){
		// 	await ctx.render('500.html', {'err':e})
		// 	//打印错误日志
		// 	logger.error(e)
		// }
	}
})

// routes
import router from './router'
app.use(router())

// 认证
import auth from './auth'
app.use(auth())

const index = require('./routes/index')
// const users = require('./routes/users')
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

module.exports = app