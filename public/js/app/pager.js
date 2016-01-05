define(['jquery', 'swig'], function ($, swig) {

    var tpl = ' <li class="prev {% if hasFirst %}disabled{% endif %} data-page="prev"><a href="javascript:;">← 上一页</a></li>\
                {% for page in pages %}\
                <li class=" {% if page.current %}active {% if endif %}" data-page="{{page}}"><a href="javascript:;">{{page.num}}</a></li>\
                {% endfor %}\
                <li class="next {% if hasLast %}disabled{% endif %}" data-page="next"><a href="javascript:;">下一页 → </a></li>'

    var Page = function(opt){
        var opt = opt || {};
        this.container = opt.wrapper;
        this.page = opt.page || 1;
        this.pages = [];
        this.total = opt.total || 1;
    };

    Page.prototype = {
        generatePages:function(){
            this.pages = [];
            

        },

        render: function(page){
            this.page = page;
            this.generatePages();
            var context = { locals: { 
                pages: this.pages, 
                hasFirst: this.page == 1, 
                hasLast: this.page == this.total
            }}
            var html = swig.render(tpl, context);
            $('#userList tbody').html(html)

        },

        next: function(){
            this.page++;
            this.page = Math.min(this.page , this.total);
            this.render(this.page);
        },

        prev: function(){
            this.page--;
            this.page = Math.Max(this.page , 0);
            this.render(this.page);
        },

        bindEvent: function(){
            var self = this;
            self.container.on('click', 'li', function(e){
                e.preventDefault();
                var page = $(this).data('page') || '1';
                if( !isNaN(parseInt(page))) self.render(parseInt(page));
                else if( page == 'prev') self.prev();
                else if( page == 'next') self.next();
            })
        }
    }

})