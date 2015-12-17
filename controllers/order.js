
var models = require('../models');
var Order = models.Order;
var OrderDetail = models.OrderDetail;

var util = require('../util/util.js');

module.exports = {
    /**
     * 查询参数
     * GET /orders
     * GET /users/:user_id/orders
     * page=1
     * limit=30,
     * sort= update,create
     * inlne-relation-depeth=1 
     * q=owner:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inlne-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation == 1){
            relations = ['details.good']
        }
        if(!isNaN(inline_relation) && inline_relation == 2){
            relations = ['details.good.supplier']
        }

        Order.where(filter)
            .fetchAll({withRelated: relations})
            //.fetchAll()
            .then(function (orders) {
                if (!orders) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, orders)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询参数
     * GET /orders/:id
     * GET /users/:user_id/orders/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inlne-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['users', 'details.goods']
        }

        Order.where(filter)
            .fetch({withRelated: relations})
            //.fetchAll()
            .then(function (order) {
                if (!order) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, order)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
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
     * POST /users/:user_id/orders/ {order_detail: [{good_id:10085, amount:2}], status: 0}
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
