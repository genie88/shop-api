
var models = require('../models');
var CmsModule = models.CmsModule;


var util = require('../util/util.js');

module.exports = {
    /**
     * 查询 CMS module 数据
     * GET /modules
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
            relations = ['fragments']
        }

        if (filter.module_id) {
            filter.id  = filter.module_id;
            delete filter.module_id;
        }
        CmsModule.forge(filter)
            .fetchAll({withRelated: relations})
            .then(function (modules) {
                if (!modules) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, modules)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询某个具体的 module 信息
     * GET /modules/:module_id
     * inline-relation-depeth:1 
     * 
     */
    findOne: function(req, res, next){
        var filter = util.param(req);
        var relations = [];
        var inline_relation = parseInt(req.param('inline-relation-depth'));
        if(!isNaN(inline_relation) && inline_relation >= 1){
            relations = ['fragments']
        }

        if (filter.module_id) {
            filter.id  = filter.module_id;
            delete filter.module_id;
        }
        CmsModule.forge(filter)
            .fetch({withRelated: relations})
            .then(function (module) {
                if (!module) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, module)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 更新modules数据
     * PUT /modules/:module_id {title: '', subtitle: '', ext1: ''}
     * 
     */
    update: function(req, res, next){
        //参数过滤
        var module = req.body.module
        CmsModule.where({id: req.params.module_id})
            .save(module, {patch: true})
            .then(function (module) {
                util.res(null, res, {});
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            }); 
    },

    /**
     * 新增cat数据
     * POST /modules/ {title: '', subtitle: '', ext1: ''}
     */
    add: function(req, res, next){
        //参数过滤
        var module = req.body.module
        delete module.id
        CmsModule.forge(module)
            .save()
            .then(function (module) {
                util.res(null, res, {id: module.get('id')})
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message}
                util.res(error, res);
            }); 
    },

    /**
     * 删除modules数据 ［DANGER］
     * DELETE /modules/:id
     */
    del: function(req, res, next){
        CmsModule.forge({id: req.params.module_id})
            .fetch({require: true})
            .then(function (module) {
                //鉴权
                module.destroy()
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
