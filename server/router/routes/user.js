'use strict'

import User from '../../model/user';
import { isBearerAuthenticated } from '../../auth';
import { JsonError } from '../../error';

export default (router => {
	router
		.post('/user/add', isBearerAuthenticated(), async (ctx, next) => {
			let { name, addr, age, birth, sex } = ctx.request.body.params;
			try{
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
			let {name} = ctx.request.body.params;
			try{
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
			let {page, name} = ctx.request.body.params;
			try{
				var users = [];
				if(name.length > 0){
					let regex = {$regex: name, $options:'i'}
					users = await User.find({name:regex})
				}else{
					users = await User.find();
				}
				ctx.body = {
					total: users.length,
					users: users
				}
			}catch(error){
				console.log(error);
				throw new JsonError(10012, '查询失败');
			}
		})
		.post('/user/edit', isBearerAuthenticated(), async (ctx, next) => {
			let { _id, name, addr, age, birth, sex } = ctx.request.body.params;
			try{
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
			let { ids } = ctx.request.body.params;
			ids = ids.split(',');
			try{
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
			let { id } = ctx.request.body.params;
			try{
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