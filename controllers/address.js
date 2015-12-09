
var Store = require('../models/store.js');

module.exports = {
    /**
     * 查询收货地址/发货地址参数
     * GET /addresses
     * GET /users/:user_id/addresses
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=user_id:8805,is_default:true
     *
     */
    queryAll: function(){

    },

    /**
     * 查询收获地址参数
     * GET /addresses/:id
     * GET /users/:user_id/addresses/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新地址数据
     * PUT /addresses/:id
     * PUT /users/:user_id/addresses/:id
     * 
     */
    update: function(){

    },

    /**
     * 新增地址数据
     * POST /addresses/
     * POST /users/:user_id/addresses/
     */
    add: function(){

    },

    /**
     * 删除地址数据
     * DELETE /addresses/:id
     * DELETE /users/:user_id/addresses/:id
     */
    del: function(){

    }
}
