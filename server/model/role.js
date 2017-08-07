'use strict'

import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const roleSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	order: Number,
	accounts:[{
		type: ObjectId,
		ref: 'Account'
	}]
}, {
		versionKey: false,
		timestamps: {
	    createdAt: 'created_at',
	    updatedAt: 'updated_at',
	  },toJSON: {
	    transform(doc, ret) {
	      delete ret.created_at;
	      delete ret.updated_at;
	    }
  	}
})

export default mongoose.model('Role', roleSchema)