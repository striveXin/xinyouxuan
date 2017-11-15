/**
 * Created by hama on 2017/9/18.
 */
//路由文件
const express = require('express');
const router = express.Router();
//引入首页的处理函数
const home = require('./routes/home');
//引入问题的处理函数
const question = require('./routes/question');
//引入用户的处理函数
const user = require('./routes/user');
//引入权限文件
const auth = require('./common/auth');
//************************************首页***************************************
//首页的路由
router.get('/',home.index);
//登录页面的路由
router.get('/login',auth.userNotRequired,home.login);
// //登录页面的路由
router.post('/login',auth.userNotRequired,home.postLogin);
//注册页面的路由
router.get('/register',auth.userNotRequired,home.register);
//注册页面的路由
router.post('/register',auth.userNotRequired,home.postRegister);
//美食总汇路由
router.get('/cate',home.cate);
//生活分享路由
router.get('/life',home.life)
//精品选区
router.get('/good',home.good);
//退出
router.get('/logout',home.logout)
//联系我们
router.get('/contact',home.contact);
//************************************问题***************************************
//创建分享
router.get('/create-question',auth.userRequired,question.create)
router.post('/question/create-question',auth.userRequired,question.postCreate)
//发表分享
router.get('/question',question.question);
//分页
router.get('/question1',question.question1)
//分享详情
router.get('/question/:id',question.particulars)
//编辑问题的页面
router.get('/question/:id/edit', auth.userRequired, question.edit);
//编辑问题的行为
router.post('/question/:id/edit', auth.userRequired, question.postEdit);
//删除问题的行为
router.get('/question/delete/:id', auth.userRequired, question.delete);
//************************************用户***************************************
//个人设置
router.get('/setting',auth.userRequired,user.setting)
//更新头像
router.post('/updateImage', auth.userRequired, user.updateImage);
//更新个人资料
router.post('/updateUser/:id', auth.userRequired, user.updateUser);
module.exports = router;

