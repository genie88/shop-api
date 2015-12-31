define(['api/collection'], function(Collection){
    //var Collection = require('api/collection');

    var Users = function(api) {
        this.api = api;
        this.collection = 'users';
    };

    Users.prototype = new Collection();

    return Users;
})