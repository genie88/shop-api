var Bookshelf = require('bookshelf').mysqlAuth;

var Store = Bookshelf.Model.extend({
    tableName: 'stores',
    owner: function(){
        return this.belongsTo('User');
    },
    goods: function(){
        return this.hasMany('Good');
    }
});

module.exports = Bookshelf.model('Store', Store);
