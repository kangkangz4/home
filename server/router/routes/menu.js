'use strict'

import Menu from '../../model/menu'
// import _ from 'lodash'
import { JsonError } from '../../error'

export default (router => {
	router
		.get('/menus/list', async (ctx) => {
			try{
				const menus = await Menu.find();
				ctx.body = {
					code: 10000,
					result: menus
				};
			}catch(error){
				console.log(error);
				throw new JsonError(20001, '菜单获取失败');
			}
		})
		.put('/menus/add', async (ctx) => {
			try{
				const {name, shortname, path, componentUrl, icon, order, isHidden, parent} = ctx.request.body;
				await Menu.create({name,shortname, path, componentUrl, icon, order, isHidden, parent});
				ctx.body = {
					code: 10000,
					message: '新增成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(20002, '菜单创建失败');
			}
		})
		.post('/menus/edit', async (ctx) => {
			try{
				const {_id, name,shortname, path, componentUrl, icon, order, isHidden, parent} = ctx.request.body;
				await Menu.findByIdAndUpdate(_id, { name,shortname, path, componentUrl, icon, order, isHidden, parent })
				ctx.body = {
					code: 10000,
					message: '更新成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(20003, '菜单更新失败');
			}
		})
		.delete('/menus/remove/:id', async (ctx) =>{
			try{
				const _id = ctx.params.id;
				await Menu.findByIdAndRemove(_id);
				ctx.body = {
					code: 10000,
					message: '删除成功'
				};
			}catch(error){
				console.log(error);
				throw new JsonError(20004, '菜单删除失败');
			}
			
		})
})