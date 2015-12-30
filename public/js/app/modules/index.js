define(['jquery','ckeditor','api/index'], function ($, CKEDITOR, API) {
    //var $ = require('jquery');
    var jQuery = $;
    //var CKEDITOR = require('ckeditor');
    //var api = new require('api/index')();
    console.log(CKEDITOR)

    var moduleId = window.location.pathname.split('/')[2];
    window.api = new API('http://localhost:3000/api');

    //console.debug(api, )
    api.modules.get(1, {}, function(json){
        console.log(json)
    })

})