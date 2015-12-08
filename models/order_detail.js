var Bookshelf = require('bookshelf').mysqlAuth;

var OrderDetail = Bookshelf.Model.extend({
    tableName: 'order_details',
    order:  function() {
        return this.belongsTo('Order');
    },
    good: function(){
        return this.hasOne('Good');
    }
});

module.exports = Bookshelf.model('OrderDetail', OrderDetail);
