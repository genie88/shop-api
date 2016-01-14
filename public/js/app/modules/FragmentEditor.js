define(['jquery', 'swig', 'bootstrap', 'ckeditor'], function($, swig, bootstrap, CKEDITOR) {
    var tpl = '<div class="modal fade {{klass}}" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                <div class="modal-dialog" style="width: 900px;">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                            <h4 class="modal-title">{{title}}</h4>\
                        </div>\
                        <div class="modal-body">{{content}}</div>\
                        <div class="modal-footer">\
                            <button data-dismiss="modal" type="button" class="btn btn-info">保存</button>\
                            <button type="button" class="btn btn-default">取消</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';

    var ckeditors = [];

    var Editor = function(propDef, opt){
        this.opt = opt || {};
        this.propDef = propDef || {};
        this.id = 'dialog-' + Math.ceil(Math.random()*100000);
        this.__bindEvents();
    }

    var editor = function(prop, fragment){
        var html = '', val = (fragment) ? fragment[prop.key] : '';
        html = '<div class="form-group">\
                    <label class="col-md-2 col-sm-2 control-label">' + prop.label + '</label>\
                    <div class="col-md-9">\
                        <div class="iconic-input">';
        switch(prop.type) {
            case 'number':
            case 'text': 
                html += '<input type="text" class="form-control" placeholder="' + prop.label +'" value="' + val +'">';
                break;
            case 'mtext': 
                ckeditors.push("ckeditor-" + prop.key);
                html += '<textarea class="form-control ckeditor" name="ckeditor-'+ prop.key + '" rows="3">' + val + '</textarea>';
                break;
            case 'link':
                 html += '<input type="text" class="form-control" placeholder="' + prop.label +'" value="' + val +'">';
                break;
            case 'image':
                 html += '<input type="text" class="form-control" placeholder="' + prop.label +'" value="' + val +'">';
                break;
            case 'boolean':
                html += '<input type="checkbox"' + (val? 'checked': '') +'></input>';
                break;
            case 'date':
                html += '<input size="16" type="text" value="' + val + '" readonly="" class="form_datetime form-control">';
                break;
            default:
                html += '<input type="text" class="form-control" placeholder="' + prop.label +'" value="' + val +'">';
                break;
        }
        html += '</div></div></div>';
        return html;
    };

    var viewer = function(prop, fragment){
        var html = '', val = (fragment) ? fragment[prop.key] : '';
        switch(prop.type) {
            case 'number':
            case 'text': 
                html = val;
                break;
            case 'mtext': 
                html = val;
                break;
            case 'link':
                html = '<a href="' + val + '" target="_blank">' + val +'</a>';
                break;
            case 'image':
                html = '<img src="' + val + '" height="50"></img>';
                break;
            case 'boolean':
                html = '<input type="checkbox"' + (val? 'checked': '') +'disabled ></input>';
                break;
            default:
                html = val;
                break;
        }
        return html;
    };




    Editor.prototype = {
        build: function(fragment, isEdit){
            var html = '', ele = '';
            html = '<form class="form-horizontal" role="form">';
            for(var i=0; i< this.propDef.length; i++){
                ele = !isEdit ? editor(this.propDef[i], fragment) : viewer(this.propDef[i], fragment);
                html += ele
            }
            html += '</form>';
            return html;
        },

        //渲染
        render: function(fragment){
            var data = {
                id: this.id,
                title: fragment ? '编辑项目': '新增项目',
                content: ''
            };
            var dialog = swig.render(tpl, {locals: data});
            if( $('#'+this.id).length == 0){
                $('body').append(dialog);
            } 

            $('#'+this.id).find('.modal-body').html(this.build(fragment));
            //初始化编辑器实例
            for(var i=0; i< ckeditors.length; i++){
                if (CKEDITOR.instances[ckeditors[i]]) {
                    CKEDITOR.instances[ckeditors[i]].destroy();
                }
                CKEDITOR.replace(ckeditors[i]);
            }

            

            
           

            return this;
        },

        //展示
        show: function(fragment, isEdit){
            this.render(fragment, isEdit);
            $('#'+this.id).modal(this.opt);
            return this;
        },

        hide: function(){
            $('#'+this.id).modal('hide');
        },

        //绑定事件
        __bindEvents: function(){
            var self = this;
            $(document).on('click', '#'+self.id +' .modal-footer .btn', function(e){
                var index = $(this).index();
                var editor_data = CKEDITOR.instances[ckeditors[0]].getData();  
                console.log(editor_data)
                
            })
        },

        //销毁
        destory: function(){

        }
    }




    return Editor;
})