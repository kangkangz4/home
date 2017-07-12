'use strict'

import mongoose from 'mongoose';
import uid from 'uid';
import idValidator from 'mongoose-id-validator';

const ObjectId = mongoose.Schema.Types.ObjectId;

const clientSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	id: {
		type: String,
		unique: true,
		required: true
	},
	secret: {
		type: String,
		required: true
	},
	trusted: {
		type: Boolean,
		required: true,
		default: false
	},
	account: {
		type: ObjectId,
		ref: 'Account'
	}
}, {
	versionKey: false,
	timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.hashed_secret;
    }
  }
});

clientSchema.plugin(idValidator);

clientSchema.pre('validate', function preSave(next){
	let that = this;
	if(that.isNew){
		if(!that.id) {
			that.id = uid(16);
			that.secret = uid(32);
		}
	}
	next();
});

export default mongoose.model('Client', clientSchema);