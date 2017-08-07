'use strict'

import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

//部门
const departSchema = mongoose.Schema({
	name:String, //部门名称
	parent:String, //上级
	order:Number, //排序
	accounts:[{
		type: ObjectId,
		ref: 'Account'
	}]
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

export default mongoose.model('Department', departSchema);