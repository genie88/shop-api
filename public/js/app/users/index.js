define(['jquery', 'swig', 'ckeditor', 'app/pager', 'app/base', 'api/index'], function ($, swig, CKEDITOR,Pager, BaseController, API) {
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

    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        
        self.getUsers({}, {page: 1, page_size: 2});

        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getUsers({}, {page: page, page_size: 2});
        })
    }

    _p.getUsers = function(query, filter){
        var self = this;
        api.users.list({'inline-relation-depth': 1, queries: query, filters: filter}, function(json){
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