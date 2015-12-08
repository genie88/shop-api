var Bookshelf = require('bookshelf').mysqlAuth;

module.exports = function() {
    var User = Bookshelf.Model.extend({
        tableName: 'users',
        
    });

    return User;
}
