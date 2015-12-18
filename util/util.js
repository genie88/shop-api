module.exports = {
    param: function(req){
        var params={}, queries=[], query, key;
        var possibles = ["user_id", "supplier_id", "owner_id", "good_id", "cat_id", 
                "spec_id", "tag_id", "order_id", "store_id", "address_id", "coupon_id", "fragment_id", "module_id"];
        for (var i in possibles) {
            key = possibles[i];
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
    },
    
    camelize: function(attrs) {
      return _.reduce(attrs, function(memo, val, key) {
        memo[_.str.camelize(key)] = val;
        return memo;
      }, {});
    },

    formatTime: function(time, format) {
        var o = {
        "M+" : time.getMonth()+1, //month
        "d+" : time.getDate(), //day
        "h+" : time.getHours(), //hour
        "m+" : time.getMinutes(), //minute
        "s+" : time.getSeconds(), //second
        "q+" : Math.floor((time.getMonth()+3)/3), //quarter
        "S" : time.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (time.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length==1? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }

}