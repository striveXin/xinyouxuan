/**
 * Created by Administrator on 2017/11/3.
 */
//静态资源的对象
const mapping = require('../static');
const validator = require('validator');
const _ = require('lodash');
const User = require('../model/User');
const setting = require('../setting');
const Question = require('../model/Question');
let  page = 0
//发表评论的处理函数
exports.question = (req,res,next)=>{
    Question.getAllQuestion(page,(err,question)=>{
        Question.find({}).count().then((count)=>{
           let count1  =  Math.ceil(count/5)
        res.render('question',{
            title:'发表评论',
            question:question,
            count1:count1,
            resource: mapping.question
        })
    })
    })
}
//分页
exports.question1 =(req,res,next)=>{
    page = (parseInt(req.query.page)-1)*5
    Question.getAllQuestion(page,(err,question)=>{
    Question.find({}).count().then((count)=>{
        let count1 = Math.ceil(count/5)
        res.render('questionContent',{
             question:question,
             count1:count1,
            resource: mapping.questionContent
        })
    })
    })
}
//新建分享的处理函数
exports.create = (req,res,next)=>{
    res.render('create-question',{
        title:'创建分享',
        resource: mapping.create,
        categorys: setting.categorys
    })
}
//新建行为的处理函数
exports.postCreate = (req, res, next) => {
    let title = validator.trim(req.body.title);
    let category = validator.trim(req.body.category);
    let content = validator.trim(req.body.content);
    let error;
    if(!validator.isLength(title, {min: 8, max: 30})) {
        error = '标题长度不合法, 请重新输入';
    }
    if(!validator.isLength(content, {min: 10})) {
        error = '问题长度不合法, 请重新输入';
    }
    if(error) {
        return res.end(error);
    }
    else {
        //验证成功后
        let newQuestion = new Question();
        newQuestion.title = title;
        newQuestion.category = category;
        newQuestion.content = content;
        newQuestion.author = req.session.user
        newQuestion.save().then(question => {
            //发布一篇文章, 积分+5, 发布数量+1
            User.getUserById(req.session.user._id, (err, user) => {
                if(err) {
                    return res.end(err);
                }
                user.score += 5;
                user.article_count += 1;
                user.save();
                // req.session.user = user;
                //返回的是一个添加问题的页面地址
                res.json({url: `/question/${question._id}`})
            })
        }).catch(err => {
            return res.end(err);
        })
    }
}
//分享详情的处理函数
exports.particulars = (req,res,next)=>{
    let question_id = req.params.id;
    Question.getQuestionById(question_id,(err,question)=>{
        res.render('particulars',{
            title:'创建分享',
            question:question,
            resource: mapping.particulars
        })
    })
}