var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');
var archiver = require('archiver');//解压压缩模块
//解压部分
var unzip = require("unzip");




var multer  = require('multer');		//上传模块
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};
var uploadFolder = './upload/';
createFolder(uploadFolder);

var storage = multer.diskStorage({		//上传文件配置
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);  
    }
});

var upload = multer({ storage: storage })
//上传文件路径
router.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log()
    if(file.originalname.indexOf('.zip') != -1){
    	var saveUrl = 'upload/'+ file.originalname
    	saveUrl  = saveUrl.substring(0, saveUrl.length-4);
	  	fs.createReadStream('upload/archive.zip').pipe(unzip.Extract({ path: saveUrl}));
    }
    res.send('上传成功');
});













/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', fileUrl: '/fileList/archive.zip'});
  // res.send('hello world');
});


router.get('/hello', function(req, res, next) {
  
  // res.download('/Venice.png', 'Venice.png');
  res.send('44');
  // console.log("第一次")s
  // next();
}, function(req, res, next){
	console.log("第二次")
	next();
});






// router.use('/user/:id', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });


router.get('/random.text', function (req, res) {
  // res.redirect('/hello');
});
router.post('/pos', function (req, res) {	
  res.send('POST request to the homepage');
});
router.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  // .post(function(req, res) {
  //   res.send('Add a book');
  // })
  // .put(function(req, res) {
  //   res.send('Update the book');
  // });

router.post('/urlencoded', function (req, res) {
  console.log(req.body);
  res.send(req.body);

});

router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.send('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  res.render('special');
});


module.exports = router;
