define(['jquery', 'swig'], function($, swig){
    /**
     *
     * 需要处理的指令包括 tt-controller tt-init tt-bind tt-repeat tt-show tt-src
     *
     *
     **/
    var BaseController = function(name) {
        this.__name = name;
        this.$scope = {};
        this.__tplRegistry = [];
        this.__init();
        this.__bindEvent();
    };

    BaseController.prototype = {
        __init: function(){
            //控制器作用范围html容器 tt-controller tt-init
            this.$scopeHtml = $('[tt-controller]');
            this._initFun = this.$scopeHtml.attr('tt-init');
            if(this[this._initFun] && typeof this[this._initFun] == 'function') {
                this[this._initFun]();
            }
        },
        apply: function(){
            var self = this;
            self.__digest();
        },
        __digest: function(){
            var self = this;
            self.$scopeHtml.find("[tt-bind]").each(function(index, item){
                var ele = $(item),
                    val = $.extend({}, self.$scope),
                    attrs = ele.attr('tt-bind').split('.');
                for(var i=0; i<attrs.length; i++){
                    val = val[attrs[i]];
                }
                ele.html(val);
            })

            self.$scopeHtml.find("[tt-src]").each(function(index, item){
                var ele = $(item),
                    val = $.extend({}, self.$scope),
                    attrs = ele.attr('tt-src').split('.');
                for(var i=0; i<attrs.length; i++){
                    val = val[attrs[i]];
                }
                ele.attr('src', val);
            })

            /**
             *  <tbody tt-repeat="good in goods">
             **/
            self.$scopeHtml.find("[tt-repeat]").each(function(index, item){
                var ele = $(item), repeat, tpl, context, html;

                repeatClause = ele.attr('tt-repeat');
                tpl = self.__tplRegistry[index] ? self.__tplRegistry[index]: 
                    '{% for '+ repeatClause + ' %}' + ele.html() + '{% endfor %}';
                context = { locals: self.$scope}
                
                html = swig.render(tpl, context);
                // console.log(tpl, context);
                //添加到模版资源注册表中
                self.__tplRegistry[index] = tpl;
                ele.html(html);
            })

        },
        __bindEvent: function(){
            var self = this;
            self.$scopeHtml.on('click', '[tt-click]', function(e){
                var handler = $(this).attr('tt-click');
                if(self[handler] && typeof self[handler] == 'function') {
                    self[handler](e);
                }
            })
        }
    }

    return BaseController;
})