/**
 * @author : by lxs
 * @date : 2018/7/26.
 * @description : 功能描述
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
module.exports = function (app) {
    app.get("/",function (req,res) {
        res.render('template',{

        })
    });
    app.post("/getdate",function (req,res) {
        res.json({"name":'lili',"age":21})
    });
}







