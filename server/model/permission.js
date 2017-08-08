'use strict'

import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const permissionSchema = mongoose.Schema({
	name: String,
	order: Number,
	role:{
		type:ObjectId,
		ref: 'role'
	},
	permissions:[]
},{
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

export default mongoose.model('Permission', permissionSchema)