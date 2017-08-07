'use strict'

import Role from '../../model/role'
import { JsonError } from '../../error'

export default (router =>{
	router
		.post('/role/list', async (ctx)=>{
			try{
				const { name } = ctx.request.body;
				let query = {};
				//判断是否有姓名,如果有就是从查询过来
				if(name){
					query = {
						name: {$regex: name, $options:'i'}
					}
				}
				const roles = await Role.find(query).sort('order').exec();
				ctx.body = {
					code: 10000,
					result: roles
				}
			}catch(error){
				console.log(error);
				throw new JsonError(40001, '角色获取失败');
			}
		})
		.put('/role/add', async (ctx)=>{
			try{
				const { name, order, accounts} = ctx.request.body;
				await Role.create({
					name, order, accounts
				})
				ctx.body = {
					code: 10000,
					message: '角色创建成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(40002, '角色创建失败');
			}
		})
		.post('/role/edit', async (ctx)=>{
			try{
				const {_id, name, order, accounts} = ctx.request.body;
				await Role.findByIdAndUpdate(_id, {
					name, order, accounts
				})
				ctx.body = {
					code: 10000,
					message: '角色更新成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(40003, '角色更新失败');
			}
		})
		.delete('/role/remove/:id', async (ctx)=>{
			try{
				const _id = ctx.params.id;
				await Role.findByIdAndRemove(_id);
				ctx.body = {
					code: 10000,
					message: '角色删除成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(40004, '角色删除失败');
			}
		})
})