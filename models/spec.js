var Bookshelf = require('bookshelf').mysqlAuth;

var Spec = Bookshelf.Model.extend({
    tableName: 'specs',
    specs: function(){
        return this.belongsTo('Cat');
    },
    goods: function(){
        return this.hasMany('Good');
    }
});

module.exports = Bookshelf.model('Spec', Spec);