/**
 * Created by Administrator on 2017/11/4.
 */
/**
 * Created by su on 2017/9/18.
 */
//用户的配置参数放到这个对象上, 暴露出来
module.exports = {
    //数据库连接的地址
    host: 'localhost',
    //数据库连接的端口号
    port: 27017,
    //数据库的名字
    db: 'xinyouxuan',
    //加密的密码
    psd: 'askSystem',
    mail_opts:{
        //邮箱的服务器地址
        host:'smtp.163.com',
        //权限授权码
        auth:{
            user:'ZX1053753539@163.com',
            pass:'ZX1053753539'
        }
    },
    //cookie的名字
    auth_name: 'ask_system',
    //cookie的加密key值
    cookie_secret: 'zhangxin',
    categorys: [
        ['dessert', '简单甜点'],
        ['life', '生活小技巧'],
        ['book', '图书推荐'],
        ['boutique', '精品小商品'],
        ['gift', '节日礼物'],
        ['cate', '健康美食']
    ]
}