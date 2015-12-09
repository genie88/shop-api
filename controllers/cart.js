
var Cart = require('../models/Cart.js');

module.exports = {
    /**
     * 查询参数
     * GET /carts
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:105
     *
     */
    queryAll: function(){

    },

    /**
     * 查询购物车商品数据
     * GET /users/:user_id/carts
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(){

    },

    /**
     * 更新购物车商品数据
     * PUT /users/:user_id/carts  {good_id: 10058, amount=2}
     * 
     */
    update: function(){

    },

    /**
     * 新增购物车
     * NOT IMPLEMENT YET
     */
    add: function(req, res, next){
        res.jsonp({code: 500, msg:''})
    },

    /**
     * 清空用户购物车数据
     * DELETE /users/:user_id/carts/ {good_id: 10058, amount=2}
     */
    del: function(){

    }
}
