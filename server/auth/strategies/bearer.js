'use strict'

import { Strategy as BearerStrategy } from 'passport-http-bearer';
import AccessToken from '../../model/access-token';

export default new BearerStrategy(async(token, done) => {
	(async() => {
		try{
			const accessToken = await AccessToken.findOne({token})
											.populate('account')
											.exec();
			if(!accessToken) return done(null, false, {type: 'error', message:'授权失败！'});
			return done(null, accessToken.account, {scope: '*'});
		}catch(error){
			done(error);
		}
	})();
})