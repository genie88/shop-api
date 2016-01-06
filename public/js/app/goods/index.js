define(['jquery', 'swig', 'ckeditor', 'app/pager', 'app/base', 'api/index'], function ($, swig, CKEDITOR, Pager, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var goodId = window.location.pathname.split('/')[2];
    api = new API('http://localhost:3000/api', {});

    //初始化模块控制器
    var GoodController = function(){

    }
    var _p = GoodController.prototype = new BaseController();



    _p.testClick = function(e){
        console.log('share clicked')
    }


    //初始化商品详情信息
    _p.initDetail = function(){
        var self = this;

        api.goods.get(goodId, {'inline-relation-depth': 1}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.good = json.data;
                self.apply();
                //var context = { locals: { items: json.data.data }}
                //var html = swig.render(tpl, context);
                //console.log(html);

                //$('#userList tbody').html(html)
            }
        })

    }



    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        api.goods.list({'inline-relation-depth': 1}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                self.$scope.goods = json.data.data;
                self.$scope.pages = json.data.pages;
                self.apply();
                self.pager.render(6 , 10);
            }
        })
        //self.bindEvent();

    }

    return (new GoodController());

})