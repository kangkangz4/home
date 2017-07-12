const router = require('koa-router')()
const JsonError = require('../error').JsonError

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/error', async (ctx, next) => {
	// 直接抛出错误，被中间件捕获后当成 500 错误
  // throw new PageError('发生了一个致命错误');
  throw new JsonError('11111','发生了一个致命错误');
  // 带 status 的错误，被中间件捕获后特殊处理
  // this.throw(403, new PageError('没有权限访问'));
  // throw(403, new JsonError('没有权限访问'));
})

module.exports = router
