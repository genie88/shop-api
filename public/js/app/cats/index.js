define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var catId = parseInt(window.location.pathname.split('/')[2]);
    api = new API('http://localhost:3000/api', {});

    var tobeDeleteCatId = '';

    //初始化模块控制器
    var CatController = function(){

    }

    var _p = CatController.prototype = new BaseController();

    _p.initDetail = function(){
        var self = this;
        $(document).trigger('nav.change', 'order.list')
        api.cats.get(catId, {queries: {'inline-relation-depth': 1}}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.cat = json.data;
                self.apply();
            }
        })
    }

    _p.initEdit = function(){
        var self = this;
        $(document).trigger('nav.change', 'order.new')
        catId && api.cats.get(catId, {'inline-relation-depth': 0}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.order = json.data;
                self.apply();
            }
        })


    }

    _p.updateOrder= function(e){
        var self = this;
        console.log(self.$scope.order);

        if(orderId) {
            //编辑已有订单信息
            var data = $.extend({}, self.$scope.order);

            api.orders.update(orderId, {store: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('更新成功');
                } else {
                    console.log(json.msg);
                }
            });
        } else {
            //新增订单信息
            var data = $.extend({}, self.$scope.order);
            api.orders.create({order: data}, function(json){
                console.log(json);
                if(json && json.code == 200){
                    alert('添加订单成功');
                } else {
                    console.log(json.msg);
                }
            });

        }
        e.preventDefault();
    }

    //初始化订单列表页
    _p.initList = function(){
        var self = this;

        self.getCats({}, {page: 1, page_size: 100});
        $(document).trigger('nav.change', 'good.cat')
        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getOrders({'inline-relation-depth': 1}, {page: page, page_size: 2});
        })
    }

    //删除订单
    _p.deleteOrderDialog = function(e){
        var self = this;
        tobeDeleteUserId = $(this).parents('tr').data('id');

        var dialog = new Dialog({
            title: '删除用户',
            content:  '确定要删除该订单吗? 删除后将无法恢复.',
            btns: [
                {klass: 'btn-danger', text: '确定', callback: function(){
                    this.hide();
                    _p.deleteOrder();
                }},
                {klass: 'btn-default',text: '取消', callback: null, dismiss: true}
            ]
        });
        dialog.show();
    }

    _p.deleteOrder = function(){
        tobeDeleteOrderId && api.orders.del(tobeDeleteOrderId, function(json){
            console.log(json);
            if(json && json.code == 200){
                alert('删除Order成功');
            } else {
                console.log(json.msg);
            }
        });
    }

    //获取用户列表
    _p.getCats = function(query, filter){
        var self = this;
        api.cats.list({queries: query, filters: filter}, function(json){
            //console.log(json.data)
            if(json && json.code == 200 && json.data) {
                self.$scope.cats = json.data;
                self.apply();
            }
        })
    }

    return (new CatController());

})