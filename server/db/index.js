'use strict'

import mongoose from 'mongoose'
import Account from '../model/account'
import { account } from './config'

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

export async function registerAccount() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const _account = await Account.findOne({ mobile: account.mobile });
        if (!_account) {
          await Account.create({
            mobile: account.mobile,
            password: account.password,
            name: account.name,
            avatar: account.avatar
          })
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    })()
  })
}