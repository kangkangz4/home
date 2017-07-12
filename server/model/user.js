'use strict'

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {
		type:String,
		required: true
	},
	age: Number,
	addr: String,
	birth: String,
	sex: Number
},{
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.created_at;
      delete ret.updated_at;
    }
  }
})

export default mongoose.model('User', userSchema);