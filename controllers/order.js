
var Order = require('../models/order.js');
var OrderDetail = require('../models/order_detail.js');

module.exports = {
    /**
     * 查询参数
     * GET /orders
     * GET /users/:user_id/orders/:id
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){

    },

    /**
     * 查询参数
     * GET /orders/:id
     * GET /users/:user_id/orders/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){

    },

    /**
     * 更新订单数据
     * PUT /users/:user_id/orders/:order_id  {order_detail: [{good_id:10085, amount:2}], status: 0}
     * 
     */
    update: function(req, res, next){

    },

    /**
     * 新增订单数据
     * POST /orders/
     * POST /users/:user_id/orders/
     */
    add: function(req, res, next){

    },

    /**
     * 删除订单数据
     * DELETE /orders/:id
     * DELETE /users/:user_id/orders/:order_id
     */
    del: function(req, res, next){

    }
}
