var models = require('../models');
var Good = models.Good;
var Paginator = require('./paginator');


var util = require('../util/util.js');

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
     * inlne-relation-depth=1 
     * q=supplier_id:8805,cat_id:758
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat', 'spec', 'supplier', 'tags']
        }

        if (filter.good_id) {
            filter.id  = filter.good_id;
            delete filter.good_id;
        }

        var page, pageSize, skip = null, limit = null, paginator = null;

            page = parseInt(filter.page) || 1;
            pageSize = parseInt(filter.page_size) || 4;

            paginator = new Paginator(page, pageSize);

            limit = paginator.getLimit();
            skip = paginator.getOffset();

        Good.forge(filter)
            .query(function (qb) {
                qb.limit(limit).offset(skip);
            })
            .fetchAll({withRelated: relations})
            .then(function(goods) {
                return Good.forge(filter)
                .query()
                .count()
                .then(function (count) {
                    count = count[0]['count(*)'];
                    return {
                        count: count,
                        data: goods
                    };
                });
            }, function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }).then(function (result) {
                var count = result.count;
                var goods = result.data;

                paginator.setCount(count);
                paginator.setData(goods);

                var ret = paginator.getPaginator();
                //console.log(ret);
                return  util.res(null, res, ret);

                //return res.json();
            });

            // .then(function (goods) {
            //     if (!goods) {
            //         util.res(null, res, [])
            //     }
            //     else {
            //         util.res(null, res, goods)
            //     }
            // })
            // .catch(function (err) {
            //     var error = { code: 500, msg: err.message};
            //     util.res(error, res);
            // });
    },

    /**
     * 查询参数
     * GET /goods/:good_id
     * inlne-relation-depth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);

        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['cat', 'spec', 'supplier', 'tags']
        }

        if (filter.good_id) {
            filter.id  = filter.good_id;
            delete filter.good_id;
        }

        Good.forge(filter)
            .fetch({withRelated: relations})
            .then(function (good) {
                if (!good) {
                    var error = { code: 404, msg: 'not found'};
                    util.res(error, res)
                }
                else {
                    util.res(null, res, good)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新商品数据
     * PUT /goods/:good_id
     * PUT /suppliers/:supplier_id/goods/:good_id
     * 
     */
    update: function(){
        var filter = util.param(req);
        var good = req.body.good;

        //鉴权(管理员才有权限使用该接口)
        if(req.session && req.session.user && req.session.user.role==1){
            //参数过滤
            Coupon.where({id: req.params.good_id})
                .save(good, {patch: true})
                .then(function (good) {
                    util.res(null, res, {});
                })
                .catch(function (err) {
                    var error = { code: 500, msg: err.message};
                    util.res(error, res);
                }); 
        } else {
            var error = { code: 401, msg: 'not authorized'};
            util.res(error, res);
        }
    },

    /**
     * 新增商品数据
     * POST /goods/
     * POST /suppliers/:supplier_id/goods/:id
     */
    add: function(req, res, next){
        //鉴权(供应商或者管理员)
        if(req.session && req.session.user && req.session.user.role==1){

        }

        //参数过滤
        var good = req.body.good

        Good.forge(good)
            .save()
            .then(function (good) {
                util.res(null, res, {id: good.get('id')});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 

    },

    /**
     * 删除商品数据
     * DELETE /goods/:good_id
     * DELETE /suppliers/:supplier_id/goods/:good_id
     */
    del: function(req, res, next){
        Good.forge({id: req.params.good_id})
            .fetch({require: true})
            .then(function (good) {
                //鉴权


                
                good.destroy()
                    .then(function () {
                        util.res(null, res, {});
                    })
                    .catch(function (err) {
                        var error = { code: 500, msg: err.message};
                        util.res(error, res);
                    });
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    }
}
