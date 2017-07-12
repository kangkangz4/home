'use strict'

import { isBearerAuthenticated } from '../../auth';
import { JsonError } from '../../error';

export default (router) => {
	router.get('/demo', isBearerAuthenticated(), async (ctx, next) => {
		ctx.body = {
			success: true,
			account: ctx.state.user
		}
	})
}