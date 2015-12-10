
var Good = require('../models/good.js');
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

        if (filter.good_id) {
            filter.id  = filter.good_id;
            delete filter.good_id;
        }
        Good.forge(filter)
            .fetch()
            .then(function (goods) {
                if (!goods) {
                    util.res(null, res, [])
                }
                else {
                    util.res(null, res, goods)
                }
            })
            .catch(function (err) {
                var error = { code: 500, msg: err.message};
                util.res(error, res);
            });
    },

    /**
     * 查询参数
     * GET /goods/:good_id
     * GET /suppliers/:supplier_id/goods/:good_id
     * inlne-relation-depth:1 
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
