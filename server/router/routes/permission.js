'use strict'

import Permission from '../../model/permission'
import { JsonError } from '../../error'

export default (router=>{
	router
		.post('/permission/list', async (ctx)=>{
			try{
				const {name} = ctx.request.body;
				let query = {};
				if(name){
					query = {
						name: {$regex: name, $options:'i'}
					}
				}
				const permissions = await Permission.find(query).sort('order').exec();
				ctx.body = {
					code: 10000,
					result: permissions
				}
			}catch(error){
				console.log(error);
				throw new JsonError(50001, '权限获取失败')
			}
		})
		.put('/permission/add', async (ctx)=>{
			try{
				const {name, order, role, permissions} = ctx.request.body;
				await Permission.create({
					name, order, role ,permissions
				})
				ctx.body = {
					code: 10000,
					message: '权限创建成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(50002, '权限创建失败')
			}
		})
		.post('/permission/edit', async (ctx)=>{
			try{
				const {_id, name, order, role, permissions} = ctx.request.body;
				await Permission.findByIdAndUpdate(_id, {
					name, order, role, permissions
				})
				ctx.body = {
					code: 10000,
					message: '权限更新成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(50003, '权限更新失败')
			}
		})
		.delete('/permission/remove/:id', async (ctx)=>{
			try{
				const _id = ctx.params.id;
				await Permission.findByIdAndRemove(_id);
				ctx.body = {
					code: 10000,
					message: '权限删除成功'
				}
			}catch(error){
				console.log(error);
				throw new JsonError(50004, '权限删除失败');
			}
		})
})