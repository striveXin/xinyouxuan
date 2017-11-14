/**
 * Created by Administrator on 2017/11/11.
 */
//静态资源的对象
const mapping = require('../static');
const formidable = require('formidable');
const moment = require('moment');
const fs = require('fs');
const gm = require('gm');
const _ = require('lodash');
//引入User
const User = require('../model/User');
const Question = require('../model/Question');
const validator = require('validator');
//个人设置的处理函数
exports.setting = (req, res, next) => {
    res.render('setting', {
        title: '用户设置页面',
        layout: 'indexTemplate',
        resource: mapping.setting
    })
}
//更新头像的处理函数
exports.updateImage = (req, res, next) => {
    //初始化
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload/images/';
    let updatePath = 'public/upload/images/';
    let smallImgPath = "public/upload/smallimgs/";
    let files = [];
    let fields = [];
    form.on('field',function(field,value){
        fields.push([field,value]);
    }).on('file',function(field,file){
        files.push([field,file]);
        let type = file.name.split('.')[1];
        let date = new Date();
        let ms = moment(date).format('YYYYMMDDHHmmss').toString();
        let newFileName = 'img' + ms + '.' + type;
        fs.rename(file.path,updatePath + newFileName,function(err){
            var input = updatePath + newFileName;
            var out = smallImgPath + newFileName;
            gm(input).resize(100,100,'!').autoOrient().write(out, function (err) {
                if(err){
                    console.log(err);
                }else{
                    //压缩后再返回，否则的话，压缩会放在后边，导致链接失效
                    return res.json({
                        error:'',
                        initialPreview:['<img src="' + '/upload/smallimgs/' + newFileName + '">'],
                        url:out
                    })
                }
            });
        })
    })
    form.parse(req);
}
//更新个人资料的处理函数
exports.updateUser = (req, res, next) => {
    let id = req.params.id;
    let motto = req.body.motto;
    let avatar = req.body.avatar;
    let error;
    if(!validator.isLength('motto', 0)) {
        error = '个性签名不能为空';
    }
    if(!validator.isLength('avatar', 0)) {
        error = '头像地址不能为空';
    }
    if(error) {
        res.end(error);
    }
    else {
        //查询数据库对应的用户信息
        User.getUserById(id, (err, user) => {
            if(err) {
                return res.end(err);
            }
            if(!user) {
                console.log(user);
                return res.end('用户不存在');
            }
            user.update_time = new Date();
            user.motto = motto;
            user.avatar = avatar;
            user.save().then((user) => {
                req.session.user = user;
                return res.end('success');
            }).catch((err) => {
                return res.end(err);
            })
        })
    }
}

