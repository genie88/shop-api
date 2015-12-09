
var Good = require('../models/good.js');

module.exports = {
    /**
     * 查询参数
     * GET /goods
     * GET /suppliers/:supplier_id/goods
     * GET /cats/:cat_id/goods
     * GET /specs/:spec_id/goods
     * page=1
     * limit=30,
     * sort=sales,recomended
     * inlne-relation-depeth=1 
     * q=supplier_id:8805,cat_id:758
     *
     */
    queryAll: function(){

    },

    /**
     * 查询参数
     * GET /goods/:id
     * GET /suppliers/:supplier_id/goods/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新商品数据
     * PUT /goods/:id
     * PUT /suppliers/:supplier_id/goods/:id
     * 
     */
    update: function(){

    },

    /**
     * 新增商品数据
     * POST /goods/
     * POST /suppliers/:supplier_id/goods/:id
     */
    add: function(){

    },

    /**
     * 删除商品数据
     * DELETE /goods/:id
     * DELETE /suppliers/:supplier_id/goods/:id
     */
    del: function(){

    }
}
