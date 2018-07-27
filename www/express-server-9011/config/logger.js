/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 日志文件
 * @param {object} 参数名.
 * @return {text} 返回值.
 */

const fs = require('fs');
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');


/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 如果目录不存在创建目录
 * @param {String} logsUrl：当前日志文件目录地址
 */
const logsUrl =path.join( __dirname,'../logs');
fs.existsSync(logsUrl) || fs.mkdirSync(logsUrl);

module.exports = {

    /**
     * @author : by lxs
     * @date : 2018/7/26.
     * @description : 服务器正常的下所有请求及返回的日志
     * @param {object} 参数名.
     * @return {text} 返回值.
     */
    successLogger : expressWinston.logger({
        transports: [
            new winston.transports.File({
                filename: logsUrl+'/access.log',
                timestamp:function() {
                    return (new Date(Date.now())).toLocaleString();
                }
            })
        ],
        ignoreRoute:function (req,res) {
            // 忽略静态文件
            let reg = /(?<=\.)(css|js|png|jpg|jpeg|map|ico)$/ig;
            return reg.test(req.path);
        },
        skip:function (req,res) {
            // 忽略页面
            let reg = /^\s*\<\s*\!DOCTYPE\s+html\s*\>/i;
            return typeof res.body == 'string' ? reg.test(res.body) : false;
        },
        statusLevels:true,
        requestWhitelist:['body'],
        responseWhitelist:['body']
    }),

    /**
     * @author : by lxs
     * @date : 2018/7/26.
     * @description : 服务器异常下所有的日志
     * @param {object} 参数名.
     * @return {text} 返回值.
     */
    errorLogger:expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                filename: logsUrl+'/error.log'
            })
        ]
    })
}






