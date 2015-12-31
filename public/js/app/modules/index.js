define(['jquery','ckeditor','api/index'], function ($, CKEDITOR, API) {
    var jQuery = $;
    //console.log(CKEDITOR)

    var moduleId = window.location.pathname.split('/')[2];
    window.api = new API('http://localhost:3000/api', {});

    //console.debug(api, )
    api.modules.get(moduleId, {}, function(json){
        console.log(json)
    })

    api.goods.list({'inline-relation-depth': 1}, function(json){
        console.log(json)
    })

})