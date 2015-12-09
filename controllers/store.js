
var Store = require('../models/store.js');

module.exports = {
    /**
     * 查询商店参数
     * GET /stores
     * GET /users/:user_id/stores
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
     * 查询商店参数
     * GET /stores/:id
     * GET /users/:user_id/stores/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新商店数据
     * PUT /stores/:id
     * PUT /users/:user_id/stores/:id
     * 
     */
    update: function(){

    },

    /**
     * 新增商店数据
     * POST /stores/
     * POST /users/:user_id/stores/
     */
    add: function(){

    },

    /**
     * 删除商店数据
     * DELETE /stores/:id
     * DELETE /users/:user_id/stores/:id
     */
    del: function(){

    }
}
