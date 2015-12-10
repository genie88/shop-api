module.exports = {
    param: function(req){
        var params={}, queries=[], query;
        var possibles = ["user_id", "supplier_id", "owner_id", "good_id", "cat_id", 
                "spec_id", "tag_id", "order_id", "store_id", "address_id", "coupon_id"];
        for (var key in possibles) {
            req.params[key] && (params[key] = req.params[key]);
        }
        if (req.query && req.query.q) {
            queries = req.query.q.split(',');
            for (var key in queries) {
                query = queries[key].split(':');
                if(query[0] !== '' && query[1] !== ''){
                    params[query[0]] = query[1];
                }
            }
        }
        return params;
    },

    res: function(error, res, data){
        if (error) {
            res.jsonp({
                code: error.code,
                msg: error.msg
            })
        } else {
            res.jsonp({
                code: 200,
                msg: '',
                data: data
            })
        }
    }

}