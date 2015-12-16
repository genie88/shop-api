
var models = require('../models');
var User = models.User;


var util = require('../util/util.js');

module.exports = {
    /**
     * 查询用户信息
     * GET /users
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,role:3
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var columns = ['username', 'nickname', 'email', 'phone', 'avatar', 'role', 'last_login_time', 'id'];
        var inline_relation = parseInt(req.param('inlne-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cart', 'coupons', 'orders', 'stores']
        }

        if (filter.user_id) {
            filter.id  = filter.user_id;
            delete filter.user_id;
        }
        User.forge(filter)
            .fetchAll({withRelated: relations, columns: columns})
            //.fetchAll()
            .then(function (users) {
                if (!users) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, users)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询用户信息
     * GET /users/:user_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新用户信息
     * PUT /users/:user_id
     * 
     */
    update: function(){

    },

    /**
     * 新增用户信息
     * POST /users/
     */
    add: function(){

    },

    /**
     * 删除用户信息
     * DELETE /users/:user_id
     */
    del: function(){

    }
}
