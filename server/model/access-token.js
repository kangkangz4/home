'use strict'

import mongoose from 'mongoose';
import uid from 'uid';
import idValidator from 'mongoose-id-validator';

const duration = 3600;
const ObjectId = mongoose.Schema.Types.ObjectId;

const accessTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		unique: true,
		required: true
	},
	account: {
		type: ObjectId,
		ref: 'Account',
		unique: true,
		required: true
	},
	client: {
		type: ObjectId,
		ref: 'Client'
	},
	create_at: {
		type: Date,
		expires: duration
	}
}, {
	versionKey: false,
	toJSON: {
		virtuals: true,
		transform(doc, ret) {
		  delete ret._id;
		  delete ret.user;
		  delete ret.client;
		  delete ret.id;
		}
	}
});

accessTokenSchema.virtual('expires_in')
  .get(function getExpiresIn() {
    const expirationTime = this.created_at.getTime() + (duration * 1000);
    return parseInt((expirationTime - Date.now()) / 1000, 10);
  });

accessTokenSchema.plugin(idValidator);

accessTokenSchema.pre('validate', function preSave(next) {
  if (this.isNew) {
    this.token = uid(194);
    this.created_at = Date.now();
  }
  next();
});

export default mongoose.model('AccessToken', accessTokenSchema);