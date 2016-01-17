define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var userId = parseInt(window.location.pathname.split('/')[2]);
    api = new API('http://localhost:3000/api', {});

    var roleMap = ['','管理员', '普通用户', '供应商'];
    var tobeDeleteUserId = '';

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
        self.initUploader();
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

    _p.initUploader = function(){
        $("#avatar").fileinput({
        initialPreview: [
            '<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/631px-FullMoon2010.jpg" class="file-preview-image" alt="The Moon" title="The Moon">',
            '<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/600px-Earth_Eastern_Hemisphere.jpg" class="file-preview-image" alt="The Earth" title="The Earth">'
        ],
        overwriteInitial: true,
        initialCaption: "The Moon and the Earth"
    });
    }

    _p.updateUser = function(e, self){
        //var self = this;
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
            var data = $.extend({}, self.$scope.user);
            api.users.create({user: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('添加用户成功');
                } else {
                    console.log(json.msg);
                }
            });

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

    //删除用户
    _p.deleteUserDialog = function(e){
        var self = this;
        tobeDeleteUserId = $(this).parents('tr').data('id');

        var dialog = new Dialog({
            title: '删除用户',
            content:  '确定要删除该用户吗? 删除后将无法恢复.',
            btns: [
                {klass: 'btn-danger', text: '确定', callback: function(){
                    this.hide();
                    _p.deleteUser();
                }},
                {klass: 'btn-default',text: '取消', callback: null, dismiss: true}
            ]
        });
        dialog.show();
    }

    _p.deleteUser = function(){
        tobeDeleteUserId && api.users.del(tobeDeleteUserId, function(json){
            console.log(json);
            if(json && json.code == 200){
                alert('删除用户成功');
            } else {
                console.log(json.msg);
            }
        });
    }

    //获取用户列表
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