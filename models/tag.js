var Bookshelf = require('bookshelf').mysqlAuth;

var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    good: function(){
        return this.belongsToMany('Good');
    }
});

module.exports = Bookshelf.model('Tag', Tag);
