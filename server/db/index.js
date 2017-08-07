'use strict'

import mongoose from 'mongoose'
import Account from '../model/account'
import Menu from '../model/menu'
import { account, menus } from './config'

export function connectDB(uri){
	return new Promise((resolve, reject) => {
		mongoose.Promise = require('bluebird');
		mongoose.connection
			.on('error', error => reject(error))
			.on('disconnected', () => console.log('Mongoose connection disconnected'))
			.on('connected', () => {
				console.log('Mongoose connection open to ' + uri);
				resolve();
			});
		mongoose.connect(uri, {useMongoClient:true});
	})
}

/**
 * 初始化数据库
 * @return {[type]} [description]
 */
export async function initDB(){
  return new Promise((resolve, reject) => {
    (async () => {
      try{
        await registerAccount();
        await registerMenu();
        resolve();
      }catch(error){
        reject(error);
      }
    })()
  })
}

/**
 * 注册管理员
 * @return {[type]} [description]
 */
async function registerAccount() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const _account = await Account.findOne({ mobile: account.mobile });
        if (!_account) {
          const {mobile, password, name, avatar, email, addr, age, sex, birth} = account;
          await Account.create({
            mobile, password, name, avatar, email, addr, age, sex, birth
          })
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    })()
  })
}

/**
 * 注册菜单
 * @return {[type]} [description]
 */
async function registerMenu(){
  return new Promise((resolve, reject) => {
    (async ()=> {
      try{
        const _menu = await Menu.findOne({ name: menus[0].name });
        if(!_menu){
          menus.forEach(async function(menu, index) {
            const menu_ = new Menu({
              path: menu.path,
              name: menu.name,
              icon: menu.icon,
              componentUrl: menu.componentUrl,
              order: menu.order,
              parent: ''
            })
            const n = await menu_.save();
            menu.children.forEach(async function(childMenu, index) {
              // console.log(childMenu);
              const childMenu_ = new Menu({
                path: childMenu.path,
                name: childMenu.name,
                componentUrl: childMenu.componentUrl,
                order: childMenu.order
              })
              childMenu_.parent = n._id;
              await childMenu_.save();
            });
          });
        }
      }catch(error){
        reject(error);
      }
    })()
  })
}