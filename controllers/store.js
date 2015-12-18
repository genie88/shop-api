
var models = require('../models');
var Store = models.Store;


var util = require('../util/util.js');

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
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            //relations = ['owner']
        }

        if (filter.store_id) {
            filter.id  = filter.store_id;
            delete filter.store_id;
        }
        Store.forge(filter)
            .fetchAll({withRelated: relations})
            .then(function (stores) {
                if (!stores) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, stores)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询商店参数
     * GET /stores/:id
     * GET /users/:user_id/stores/:id
     * inlne-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            //relations = ['owner']
        }

        if (filter.store_id) {
            filter.id  = filter.store_id;
            delete filter.store_id;
        }
        Store.forge(filter)
            .fetch({withRelated: relations})
            .then(function (store) {
                if (!store) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, store)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新商店数据
     * PUT /stores/:id
     * PUT /users/:user_id/stores/:store_id
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var store = req.body.store
        Store.where({id: req.params.store_id})
            .save(store, {patch: true})
            .then(function (store) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增商店数据
     * POST /stores/
     * POST /users/:user_id/stores/
     */
    add: function(req, res, next){
        //参数过滤
        var store = req.body.store
        delete store.id
        Store.forge(store)
            .save()
            .then(function (store) {
                util.res(null, res, {id: store.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除商店数据
     * DELETE /stores/:id
     * DELETE /users/:user_id/stores/:store_id
     */
    del: function(req, res, next){
        Store.forge({id: req.params.store_id})
            .fetch({require: true})
            .then(function (cat) {
                //鉴权
                Store.destroy()
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
