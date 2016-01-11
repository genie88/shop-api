define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload',  'app/base', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var userId = window.location.pathname.split('/')[2];
    api = new API('http://localhost:3000/api', {});

    roleMap = ['','管理员', '普通用户', '供应商'];

    //初始化模块控制器
    var UserController = function(){

    }

    var _p = UserController.prototype = new BaseController();

    _p.initDetail = function(){
        var self = this;
        api.users.get(userId, {'inline-relation-depth': 1}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.user = json.data;
                self.$scope.user.roleName = roleMap[self.$scope.user.role];
                //console.log(self.$scope.user);
                self.apply();
            }
        })
    }

    _p.initEdit = function(){
        var self = this;
        userId && api.users.get(userId, {'inline-relation-depth': 0}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.user = json.data;
                self.$scope.user.roleName = roleMap[self.$scope.user.role];
                self.$scope.user.avatar = 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=avatar';
                //console.log(self.$scope.user);
                self.apply();
            }
        })


    }

    _p.updateUser = function(e){
        var self = this;
        console.log(self.$scope.user);

        if(userId) {
            //编辑已有用户信息
            var data = $.extend({}, self.$scope.user);
            api.users.update(userId, {user: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('更新成功');
                } else {
                    console.log(json.msg);
                }
            });
        } else {
            //新增用户信息

        }
        e.preventDefault();
    }

    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        
        self.getUsers({}, {page: 1, page_size: 2});

        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getUsers({'inline-relation-depth': 1}, {page: page, page_size: 2});
        })
    }

    _p.getUsers = function(query, filter){
        var self = this;
        api.users.list({queries: query, filters: filter}, function(json){
            //console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                self.$scope.users = json.data.data;
                self.page = json.data.currentPage;
                self.total = json.data.pages.length;
                //self.$scope.pages = json.data.pages;
                self.apply();
                self.pager.render(self.page , self.total);
            }
        })
    }

    return (new UserController());

})