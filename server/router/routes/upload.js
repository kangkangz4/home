'use strict'

import multer from 'koa-multer'

//配置  
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, './views/uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var upload = multer({ storage: storage });

export default (router => {
	router.post('/upload', upload.single('file'), async (ctx) =>{
		ctx.body = {
			//返回文件名
			filename: ctx.req.file.filename
		}
	})
})