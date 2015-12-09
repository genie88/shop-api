
var Coupon = require('../models/coupon.js');

module.exports = {
    /**
     * 查询参数
     * GET /coupons
     * GET /users/:user_id/coupons/
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
     * 查询参数
     * GET /coupons/:id
     * GET /users/:user_id/coupons/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新卡券数据
     * PUT /coupons/:id
     * PUT users/:user_id/coupons/:id
     */
    update: function(){

    },

    /**
     * 新增卡券数据
     * POST /coupons/
     * POST /users/:user_id/coupons/   {}
     */
    add: function(){

    },

    /**
     * 删除用户卡券数据 [DANGER]
     * DELETE /coupons/:id
     * DELETE /users/:user_id/coupons/:coupon_id
     * DELETE /users/:user_id/coupons/ [coupon_id为空，清空所有]
     */
    del: function(){

    }
}
