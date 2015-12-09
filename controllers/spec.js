
var Spec = require('../models/Spec.js');

module.exports = {
    /**
     * 查询Specs
     * GET /specs
     * GET /cats/:cat_id/specs
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
     * 查询某个具体的Spec
     * GET /specs/:spec_id
     * 
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新spec数据
     * PUT /specs/:id
     * 
     */
    update: function(){

    },

    /**
     * 新增spec数据
     * POST /specs/
     * POST /cats/:cat_id/specs/
     */
    add: function(){

    },

    /**
     * 删除spec数据
     * DELETE /specs/:id
     */
    del: function(){

    }
}
