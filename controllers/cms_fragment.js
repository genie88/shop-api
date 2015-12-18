
var models = require('../models');
var CmsFragment = models.CmsFragment;


var util = require('../util/util.js');

module.exports = {
    /**
     * 查询Category参数
     * GET /fragments
     * page=1
     * limit=30,
     * sort= update,create
     * inline-relation-depeth=1 
     * q=user_id:8805,is_default:true
     *
     */
    queryAll: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['module']
        }

        if (filter.fragment_id) {
            filter.id  = filter.fragment_id;
            delete filter.fragment_id;
        }
        CmsFragment.forge(filter)
            .fetchAll({withRelated: relations})
            //.fetchAll()
            .then(function (fragments) {
                if (!fragments) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, fragments)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询某个具体的 fragment 信息
     * GET /fragments/:fagment_id
     * inline-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['module']
        }

        if (filter.fragment_id) {
            filter.id  = filter.fragment_id;
            delete filter.fragment_id;
        }
        CmsFragment.forge(filter)
            .fetch({withRelated: relations})
            .then(function (fragment) {
                if (!fragment) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, fragment)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新fragments数据
     * PUT /fragments/:fragment_id {title: '', subtitle: '', ext1: ''}
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var fragment = req.body.fragment
        CmsFragment.where({id: req.params.fragment_id})
            .save(fragment, {patch: true})
            .then(function (fragment) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增cat数据
     * POST /fragments/ {title: '', subtitle: '', ext1: ''}
     */
    add: function(req, res, next){
        //参数过滤
        var fragment = req.body.fragment
        delete fragment.id
        CmsFragment.forge(fragment)
            .save()
            .then(function (fragment) {
                util.res(null, res, {id: fragment.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除fragments数据 ［DANGER］
     * DELETE /fragments/:id
     */
    del: function(req, res, next){
        CmsFragment.forge({id: req.params.fragment_id})
            .fetch({require: true})
            .then(function (fragment) {
                //鉴权
                fragment.destroy()
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
