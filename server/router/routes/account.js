'use strict'

import Account from '../../model/account';
import { isBearerAuthenticated } from '../../auth';
import { JsonError } from '../../error';

export default (router => {
	router
		.get('/account/list', async (ctx) => {
			try{
				const accounts = await Account.find();
				ctx.body = {
					code: 10000,
					result: accounts
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20006, '全部用户查询失败');
			}
		})
		.post('/account/listpage', async (ctx) => {
			try{
				const {page, pagesize, name} = ctx.request.body;
				const start = (page-1)*pagesize;
				let query = {};
				//判断是否有姓名,如果有就是从查询过来
				if(name){
					query = {
						name: {$regex: name, $options:'i'}
					}
				}
				//取得总条数
				const total = await Account.count(query).exec();
				//获取符合条件数据
				const accounts = await Account.find(query).skip(start).limit(pagesize).exec();
				ctx.body ={
					code: 10000,
					result:{
						page:page,
						total:total,
						page_size:pagesize,
						accounts:accounts
					}
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20001, '用户查询失败');
			}
		})
		.put('/account/add', async (ctx) => {
			try{
				const { mobile, email, name,pinyin, password, age, sex, addr, birth, avatar} = ctx.request.body;
				await Account.create({
					mobile, email, name,pinyin, password, age, sex, addr, birth, avatar
				})
				ctx.body = {
					code: 10000,
					message: '创建成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20002, '用户创建失败');
			}
		})
		.post('/account/edit', async (ctx) =>{
			try{
				const {_id, mobile, name,pinyin, email, age, sex, addr, birth, avatar } = ctx.request.body;
				await Account.findByIdAndUpdate(_id, {mobile, name,pinyin, email, age, sex, addr, birth, avatar });
				ctx.body = {
					code: 10000,
					message: '更新成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20002, '用户更新失败');
			}
		})
		.delete('/account/remove/:id', async (ctx)=>{
			try{
				const _id = ctx.params.id;
				await Account.findByIdAndRemove(_id);
				ctx.body = {
					code: 10000,
					message: '删除成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20003, '用户删除失败');
			}
		})
		//批量删除
		.post('/account/batchremove', async (ctx) =>{
			try{
				let { ids } = ctx.request.body;
				ids = ids.split(',');
				await Account.remove({ _id: { $in: ids } });
				ctx.body = {
					code: 10000,
					message: '批量删除成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20004, '用户批量删除失败');
			}
		})
		//修改密码
		.post('/account/resetpass', async (ctx) => {
			try{
				const { _id, password} = ctx.request.body;
				const account = await Account.findById(_id);
				account.resetpass(password);
				ctx.body = {
					code: 10000,
					message: '密码重置成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(20005, '用户密码修改失败');
			}
		})
})