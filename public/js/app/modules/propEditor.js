define(['jquery', 'swig'], function ($, swig) {

    var tpl = '{% for prop in props %}<tr>\
                    <td data-prop="key">{{prop.key}}</td>\
                    <td data-prop="label"><input type="text" class="form-control" placeholder="别名" value="{{prop.label}}"></td>\
                    <td data-prop="type">\
                        <select class="form-control m-bot15">\
                            <option value="text"   {% if prop.type == "text" %}selected {% endif %}>单行文本</option>\
                            <option value="mtext"  {% if prop.type == "mtext" %}selected {% endif %}>多行文本</option>\
                            <option value="link"   {% if prop.type == "link" %}selected {% endif %}>超链接</option>\
                            <option value="image"  {% if prop.type == "image" %}selected {% endif %}>图片</option>\
                            <option value="number" {% if prop.type == "number" %}selected {% endif %}>数字</option>\
                            <option value="date"   {% if prop.type == "date" %}selected {% endif %}>日期</option>\
                            <option value="boolean {% if prop.type == "boolean" %}selected {% endif %}">布尔值</option>\
                        </select>\
                    </td>\
                    <td data-prop="validate"><input type="text" class="form-control" placeholder="校验"å></td>\
                </tr>{% endfor %}';

    //支持的类型包括 date/color/text/mtext/image/number/link/
    var o = [
        {key: 'title', label:'标题', type: 'text', validator: {}},
        {key: 'subtitle', label:'图片', type: 'image', validator: {}},
        {key: 'abstract', label:'简介', type: 'mtext', validator: {}},
        {key: 'content', label:'正文', type: 'mtext', validator: {}},
        {key: 'sort', label:'排序', type: 'number', validator: {}},
        {key: 'is_show', label:'显示/隐藏', type: 'checkbox', validator: {}},
        {key: 'ext1', label:'跳转链接', type: 'alink', validator: {}},
        {key: 'ext2', label:'浏览次数', type: 'number', validator: {}}
    ];

    var Editor = function(props, opt){
        this.props = props || o;
        this.opt = opt || {};
        this.wrap = this.opt.wrap;
        this.render();
        this.bindEvent();
    };

    Editor.prototype = {
        render: function(){
            var html = swig.render(tpl, { locals: {props: this.props}});
            this.wrap.html(html);
            var trs = this.wrap.find('tr');
        },

        getProps: function(){
            var props = [];
            var trs = this.wrap.find('tr');
            $.each(trs, function(index, item){
                var prop = {
                    key: $(item).find('td[data-prop=key]').text(),
                    label: $(item).find('td[data-prop=label]').find('input').val(),
                    type: $(item).find('td[data-prop=type]').find('select').val(),
                    validate: {},
                }
                props.push(prop);
            })

            return JSON.stringify(props);
        },

        bindEvent: function(){
            
        }
    }

    return Editor;
})