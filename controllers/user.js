
var User = require('../models/user.js');

module.exports = {
    /**
     * 查询用户信息
     * GET /users
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,cat_id:758
     *
     */
    queryAll: function(){

    },

    /**
     * 查询用户信息
     * GET /users/:id
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
     * DELETE /users/:id
     */
    del: function(){

    }
}
