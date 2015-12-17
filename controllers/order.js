
var models = require('../models');
var Order = models.Order;
var OrderDetail = models.OrderDetail;

var util = require('../util/util.js');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf').mysqlAuth;

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
     * GET /users/:user_id/orders/:order_id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];

        if (filter.order_id) {
            filter.id  = filter.order_id;
            delete filter.order_id;
        }

        var inline_relation = parseInt(req.param('inlne-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation == 1){
            relations = ['details.good']
        }
        if(!isNaN(inline_relation) && inline_relation == 2){
            relations = ['details.good.supplier']
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
     * POST /users/:user_id/orders/ {order_details: [{good_id:10085, amount:2}], status: 0}
     */
    add: function(req, res, next){
        var filter = util.param(req);
        var orderDetails = req.body.order_details;

        Bookshelf.transaction(function(t) {
          return new Order({user_id: filter.user_id})
            .save(null, {transacting: t})
            .tap(function(order) {
                return Promise.map(orderDetails, function(orderDetail) {
                    // Some validation could take place here.
                    return new OrderDetail(orderDetail).save({'order_id': order.id}, {transacting: t});
                });
            });
        }).then(function(order) {
            util.res(null, res, {id: order.get('id')});    
        }).catch(function(err) {
            var error = { code: 500, msg: err.message};
            util.res(error, res);
        });

    },

    /**
     * 删除订单数据
     * DELETE /orders/:order_id
     * DELETE /users/:user_id/orders/:order_id
     */
    del: function(req, res, next){
        var filter = util.param(req);

        Bookshelf.transaction(function (t) {
            Order.forge({id: filter.order_id}).fetch({
                withRelated:['details']
            }).then(function (order) {
                //如果存在　
                if(order){
                    return order.related('details').invokeThen('destroy').then(function () {
                        return order.destroy().then(function () {
                            util.res(null, res, {});
                        });
                    });
                } else {
                    var error = { code: 500, msg: 'not found'};
                    util.res(error, res);
                }
            });
        }).then( function () {
            util.res(null, res, {});
        }).catch( function(err) {
            var error = { code: 500, msg: err.message};
            util.res(error, res);
        })

        //var qb = OrderDetail.query();
        //return qb.where('order_id', filter.order_id).del()
        //    .then(function (numRows) {
        //         return numRows;
        //    })

    }
}
