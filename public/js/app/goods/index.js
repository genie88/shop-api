define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index'], 
        function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var goodId = parseInt(window.location.pathname.split('/')[2]);
    api = new API('http://localhost:3000/api', {});

    //初始化模块控制器
    var GoodController = function(){

    }
    var _p = GoodController.prototype = new BaseController();


    /*************************************** 商品新建/编辑**********************************************/
    _p.initEdit = function(){
        var self = this;
        self.uploader = $("#goodImage");
        self.initUploader();
        $(document).trigger('nav.change', 'good.new')
        goodId && api.goods.get(goodId, {queries: {'inline-relation-depth': 1}}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.good = json.data;
                initPortrait(goodId, self.$scope.good.default_image);
                self.apply();
            }
        })
    }

    //初始化商品图片信息
    function initPortrait(id, imageurl) {
        //重要，需要更新控件的附加参数内容，以及图片初始化显示
        $("#goodImage").fileinput('refresh', {
            uploadExtraData: { id: id, type: '商品图片'},
            initialPreview: [
                "<img src='" + imageurl + "' class='file-preview-image' alt='商品图片' title='商品图片'>",
            ],
        });
    }

    _p.initUploader = function(){
        var self = this;
        $("#goodImage").fileinput({
            uploadUrl: "/cms/upload?type=good&dir=good",
            overwriteInitial: true,
            maxFileSize: 1500,
            autoReplace: true,
            maxFileCount: 1,
            showClose: false,
            showCaption: false,
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=good" alt="头像" style="width:160px">',
            layoutTemplates: {main2: '{preview} ' + ' {remove} {browse}'},
            allowedFileExtensions: ["jpg", "png", "gif"]
        });
    }

    _p.updateGood = function(e, self){
        $("#goodImage").on("fileuploaded", function(event, data, previewId, index){
            var res = data.response;
            if(res && res.data && res.data.path){
                self.$scope.good.default_image = window.location.origin +  data.response.data.path;
            }
            console.log(self.$scope.good);
            //self.updateGoodInfo();
        })
        //上传商品图片
        $("#goodImage").fileinput('upload');
        e.preventDefault();
    }

    _p.updateGoodInfo = function(){
        var self = this;
        if(goodId) {
            //编辑已有用户信息
            var data = $.extend({}, self.$scope.good);

            api.goods.update(goodId, {good: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('更新成功');
                } else {
                    console.log(json.msg);
                }
            });
        } else {
            //新增用户信息
            var data = $.extend({}, self.$scope.good);
            api.goods.create({good: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('添加商品成功');
                    var uid = json.data.id;
                } else {
                    console.log(json.msg);
                }
            });

        }
    }




    /*************************************** 商品详情页面**********************************************/

    //初始化商品详情信息
    _p.initDetail = function(){
        var self = this;
        $(document).trigger('nav.change', 'good.detail')
        api.goods.get(goodId, {'inline-relation-depth': 1}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.good = json.data;
                self.apply();
            }
        })

    }


    /*************************************** 商品列表页面**********************************************/

    //初始化商品列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        
        self.getGoodList({}, {page: 1, page_size: 2});
        $(document).trigger('nav.change', 'good.list')

        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getGoodList({}, {page: page, page_size: 2});
        })
    }

    _p.getGoodList = function(query, filter){
        var self = this;
        api.goods.list({'inline-relation-depth': 1, queries: query, filters: filter}, function(json){
            //console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                self.$scope.goods = json.data.data;
                self.page = json.data.currentPage;
                self.total = json.data.pages.length;
                //self.$scope.pages = json.data.pages;
                self.apply();
                self.pager.render(self.page , self.total);
            }
        })
    }


    return (new GoodController());

})