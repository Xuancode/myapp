var express = require('express');
var router = express.Router();




router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
