'use strict'

import passport from 'koa-passport';
import compose from 'koa-compose';
import importDir from 'import-dir';
import Account from '../model/account';

const strategies = importDir('./strategies');

Object.keys(strategies).forEach(name => passport.use(name, strategies[name]));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
	const account = await Account.findById(id);
	done(null, account);
});

export default function auth(){
	return compose([
		passport.initialize(),
    	passport.session()
	])
}

//Bearer认证
export function isBearerAuthenticated() {
  return passport.authenticate('bearer', { session: false });
}