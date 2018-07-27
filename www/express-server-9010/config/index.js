/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 功能描述
 * @param {object} 参数名.
 * @return {text} 返回值.
 */

const logger = require('./logger');
const globalData = require("./global");
const compression = require('compression');
const objectAssign = require('object-assign');

/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 全局配置文件合并到global上随处调用
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
objectAssign(global,globalData);


/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 代码压缩过滤
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // 这里就过滤掉了请求头包含'x-no-compression'
        return false
    }
    return compression.filter(req, res)
}
module.exports = objectAssign(logger,{

    /**
     * @author : by lxs
     * @date : 2018/7/26.
     * @description : 代码压缩
     * @param {object} 参数名.
     * @return {text} 返回值.
     */
    compression:compression({filter: shouldCompress})
})


