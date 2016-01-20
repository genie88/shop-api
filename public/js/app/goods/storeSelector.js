define(['jquery', 'swig', 'bootstrap', 'api/index'], 
        function($, swig, bootstrap, API) {

    var tpl = '<div class="modal fade {{klass}}" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                <div class="modal-dialog" style="width: 900px;">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal-title">选择供应商</h4>\
                        </div>\
                        <div class="modal-body"></div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-info">保存</button>\
                            <button type="button" class="btn btn-default">取消</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';

    var StoreSelector = function(opt){
        var self = this;
        this.opt = opt || {};
        this.wrap = opt.wrap;
        this.data = opt.data;
        this.api = window.api || new API('http://localhost:3000/api', {});
        this.id = 'dialog-' + Math.ceil(Math.random()*100000);
        self.render();

        self.wrap.on('click', function(){
            self.show();
        });
        
    }

    StoreSelector.prototype = {
        render: function(){
            var self = this;
            self.wrap.find('input').val(self.data.name );
        },

        //渲染
        show: function(){
            var self = this;
            if( $('#'+ self.id).length > 0){
                $('#'+ self.id).modal('show');
            } else {
                var data = {
                    id: self.id,
                    content: ''
                };

                var dialog = swig.render(tpl, {locals: data});
                $('body').append(dialog);
                $('#'+self.id).modal(self.opt);
                self.__bindEvents();
            }
            return self;
        },

        hide: function(){
            $('#'+this.id).modal('hide');
        },

        //绑定事件
        __bindEvents: function(){
            var self = this;
            $('#'+ self.id).on('click', '.modal-footer button', function(e){
                var data = {
                    id: 1,
                    name: '长沙飞鸿商贸有限公司',
                }
                if($(this).index() == 0 ){
                    self.opt.callback && self.opt.callback(data);
                }
                self.hide();
            });
        },

        //销毁
        destory: function(){
            $('#'+this.id).remove();
        }
    }

    return StoreSelector;


})
   