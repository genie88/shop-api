var Bookshelf = require('bookshelf').mysqlAuth;

var Cart = Bookshelf.Model.extend({
    tableName: 'carts',
    owner: function(){
        return this.belongsTo('User');
    }
});

module.exports = Bookshelf.model('Cart', Cart);
