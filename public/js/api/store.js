define(['api/collection'], function(Collection){
    //var Collection = require('api/collection');

    var Stores = function(api) {
        this.api = api;
        this.collection = 'stores';
    };

    Stores.prototype = new Collection();

    return Stores;
})