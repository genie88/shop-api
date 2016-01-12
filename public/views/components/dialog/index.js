define(['jquery', 'bootstrap'], function($, bootstrap) {
    var tpl = '<div class="modal fade" id="{{dialogID}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal-title">{{title}}</h4>\
                        </div>\
                        <div class="modal-body">{{contentHTML}}</div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-danger">确定</button>\
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';

    var Dialog = function(opt){
        this.opt = opt || {};
        this.init(opt);
        this.__bindEvents();
    }


    Dialog.prototype = {
        //初始化
        init: function(opt){
            return this;
        },

        //渲染
        render: function(scope){

        },

        //展示
        show: function(options){
            //检查是否已经添加到document当中

            //显示
            $('#'+this.modalId).modal(options);
            return this;
        },

        //绑定事件
        __bindEvents: function(){

        },

        //销毁
        destory: function(){

        }
    }




    return Dialog;
})