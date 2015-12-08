var Bookshelf = require('bookshelf').mysqlAuth;

var Cat = Bookshelf.Model.extend({
    tableName: 'cats',
    specs: function(){
        return this.hasMany('Spec');
    }
});

module.exports = Bookshelf.model('Cat', Cat);
