var Bookshelf = require('bookshelf').mysqlAuth;

var Good = Bookshelf.Model.extend({
    tableName: 'goods',
    cat:  function() {
        return this.belongsTo('Cat');
    },
    spec: function(){
        return this.belongsTo('Spec');
    },
    supplier: function(){
        return this.belongsTo('User');
    },
    tags: function(){
        return this.hasMany('Tag');
    }
});

module.exports = Bookshelf.model('Good', Good);
