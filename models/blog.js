var db = require('./db')
function BlogSubmit(param){
  this.username = param.username;
  this.text = param.text
}
//读取文本内容（读取所有的），从第count条偏移量开始取9条
BlogSubmit.prototype.getAll = function (count, callback) {
  var self = this;
  db.con(function (connect) {
    //第一次查询数据库还有多少数据
    connect.query("SELECT count(*) FROM text", null, function (err, result) {
      if (err) {
        console.log("SELECT  * FROM text limit :" + count + ", 9 error, the err information is " + err);
        return callback(err);
      }
      //console.log(result[0]['count(*)']);   //这个是查询出来的值
      //只有当请求数据的编号（已经查询到多少个），小于最大数据量的时候，才会从数据库内读取数据
      if (Number(count) < result[0]['count(*)']) {
        connect.query("SELECT * FROM text limit ?,9", [Number(count)], function (err, result) {
          if (err) {
            console.log("SELECT  * FROM blogtext limit :" + count + ", 9 error, the err information is " + err);
            return callback(err);
          }
          result.offset = Number(count) + result.length;
          callback(null, result);
        })
      } else {
        callback(null, null);
      }
    })
  })
}
module.exports = BlogSubmit;