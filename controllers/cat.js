
var Store = require('../models/store.js');

module.exports = {
    /**
     * 查询Category参数
     * GET /cats
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
     * 查询某个具体的Category
     * GET /cats/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新cat数据
     * PUT /cats/:id
     * 
     */
    update: function(){

    },

    /**
     * 新增cat数据
     * POST /cats/
     */
    add: function(){

    },

    /**
     * 删除cat数据 ［DANGER］需要同时删除cat下的spec分类
     * DELETE /cats/:id
     */
    del: function(){

    }
}
