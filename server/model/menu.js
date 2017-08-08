'use strict'

import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId;

const menuSchema = mongoose.Schema({
	path: {
		type: String,
		default: '/'
	},
	componentUrl:String, //组件地址
	name: String,  //目录名称
	shortname:String, //简称，权限用
	icon: {
		type: String,
		default: ''
	}, //图标
	isHidden: {
		type: Boolean,
		default: false
	},
	parent:String,
	order:Number //排序
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

export default mongoose.model('Menu', menuSchema);