define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var supplierId = parseInt(window.location.pathname.split('/')[2]);
    api = new API('http://localhost:3000/api', {});

    var tobeDeleteSupplierId = '';

    //初始化模块控制器
    var SupplierController = function(){

    }

    var _p = SupplierController.prototype = new BaseController();

    _p.initDetail = function(){
        var self = this;
        api.stores.get(userId, {'inline-relation-depth': 1}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.supplier = json.data;
                self.apply();
            }
        })
    }

    _p.initEdit = function(){
        var self = this;
        supplierId && api.stores.get(supplierId, {'inline-relation-depth': 0}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.supplier = json.data;
                self.apply();
            }
        })


    }

    _p.updateSupplier= function(e){
        var self = this;
        console.log(self.$scope.supplier);

        if(supplierId) {
            //编辑已有供应商信息
            var data = $.extend({}, self.$scope.supplier);

            api.stores.update(supplierId, {store: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('更新成功');
                } else {
                    console.log(json.msg);
                }
            });
        } else {
            //新增供应商信息
            var data = $.extend({}, self.$scope.supplier);
            api.stores.create({store: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('添加供应商成功');
                } else {
                    console.log(json.msg);
                }
            });

        }
        e.preventDefault();
    }

    //初始化供应商列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        
        self.getSuppliers({}, {page: 1, page_size: 2});

        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getSuppliers({'inline-relation-depth': 1}, {page: page, page_size: 2});
        })
    }

    //删除Supplier
    _p.deleteSupplierDialog = function(e){
        var self = this;
        tobeDeleteUserId = $(this).parents('tr').data('id');

        var dialog = new Dialog({
            title: '删除用户',
            content:  '确定要删除该供应商吗? 删除后将无法恢复.',
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

    _p.deleteSupplier = function(){
        tobeDeleteSupplierId && api.stores.del(tobeDeleteSupplierId, function(json){
            console.log(json);
            if(json && json.code == 200){
                alert('删除供应商成功');
            } else {
                console.log(json.msg);
            }
        });
    }

    //获取用户列表
    _p.getSuppliers = function(query, filter){
        var self = this;
        api.stores.list({queries: query, filters: filter}, function(json){
            //console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                self.$scope.suppliers = json.data.data;
                self.page = json.data.currentPage;
                self.total = json.data.pages.length;
                //self.$scope.pages = json.data.pages;
                self.apply();
                self.pager.render(self.page , self.total);
            }
        })
    }

    return (new SupplierController());

})