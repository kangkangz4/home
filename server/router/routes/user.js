'use strict'

import User from '../../model/user';
import { isBearerAuthenticated } from '../../auth';
import { JsonError } from '../../error';

export default (router => {
	router
		.post('/user/add', isBearerAuthenticated(), async (ctx, next) => {
			try{
				let { name, addr, age, birth, sex } = ctx.request.body
				const user = await User.create({ name, addr, age, birth, sex });
				ctx.body = {
					code: 10000,
					message: '新增成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(10010, '创建失败');
			}
		})
		.post('/user/list', isBearerAuthenticated(), async (ctx, next) => {
			try{
				let {name} = ctx.request.body;
				let users = await User.find();
				ctx.body = {
					users: users
				}
			}catch(error){
				console.log(error);
				throw new JsonError(10014, '查询失败');
			}
		})
		.post('/user/listpage', isBearerAuthenticated(), async (ctx, next) => {
			try{
				let {page, name} = ctx.request.body;
				var users = [];
				if(name.length > 0){
					let regex = {$regex: name, $options:'i'}
					users = await User.find({name:regex})
				}else{
					users = await User.find();
				}
				ctx.body = {
					code: 10000,
					result: {
						total: users.length,
						page: page,
						users: users
					}
				}
			}catch(error){
				console.log(error);
				throw new JsonError(10012, '查询失败');
			}
		})
		.post('/user/edit', isBearerAuthenticated(), async (ctx, next) => {
			try{
				let { _id, name, addr, age, birth, sex } = ctx.request.body;
				await User.findByIdAndUpdate(_id, { name, addr, age, birth, sex })
				ctx.body = {
					code: 10000,
					message: '更新成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(10013, '更新失败');
			}
			
		})
		.post('/user/batchremove',isBearerAuthenticated(), async (ctx, next) => {
			try{
				let { ids } = ctx.request.body;
				ids = ids.split(',');
				await User.remove({ _id: { $in: ids } });
				ctx.body = {
					code: 10000,
					message: '批量删除成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(10015, '批量删除失败');
			}
		})
		.post('/user/remove',isBearerAuthenticated(), async (ctx, next) => {
			try{
				let { id } = ctx.request.body;
				await User.findByIdAndRemove(id);
				ctx.body = {
					code: 10000,
					message: '删除成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(10013, '删除失败');
			}
		})
})