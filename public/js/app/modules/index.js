define(['jquery', 'swig', 'ckeditor','api/index', ], function ($, swig, CKEDITOR, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var moduleId = window.location.pathname.split('/')[2];
    window.api = new API('http://localhost:3000/api', {});



    //初始化模块控制器
    var ModuleController = function(){

    }

    var _p = ModuleController.prototype;

    //初始化模块详情页
    _p.initDetailPage = function(){
        var self = this;
        var tpl = '{% for item in items %}\
                        <tr>\
                            <td><a href="/modules/{{item.cms_module_id}}/fragments/{{item.id}}">{{item.title}}</a></td>\
                            <td class="hidden-phone">{{item.ext1}}</td>\
                            <td>{{item.created}} </td>\
                            <td><span class="label label-success label-mini">显示</span></td>\
                            <td>\
                                <a href="#"><i class="fa fa-eye"></i></a>\
                                <a href="#"><i class="fa fa-edit"></i></a>\
                                <a href="#"><i class="fa fa-trash-o"></i></a>\
                            </td>\
                        </tr>\
                    {% endfor %}';

        api.modules.get(moduleId, {'inline-relation-depth': 1}, function(json){
            console.log(json.data)
           if(json && json.code == 200 && json.data) {
               var context = { locals: { items: json.data.fragments }}
               var html = swig.render(tpl, context);
               //console.log(html);
               $('[node-type=moduleName]').html(json.data.name);
               $('#fragmentsList tbody').html(html)
           }
        })
        self.bindEvent();

    }



    //初始化模块列表页
    _p.initListPage = function(){
        var self = this;
        var tpl = '{% for item in items %}\
                    <tr data-id="{{item.id}}"><td><a href="/modules/{{item.id}}">{{item.name}}</a></td>\
                        <td class="hidden-phone">{{item.type}}</td>\
                        <td>{{item.sort}} </td>\
                        <td><span class="label label-warning label-mini">{{item.is_show}}</span></td>\
                        <td>\
                            <a href="/modules/{{item.id}}"><i class="fa fa-eye"></i></a>\
                            <a href="/modules/{{item.id}}/edit"><i class="fa fa-edit"></i></a>\
                            <a href="javascript:;" data-act="deleteModule"><i class="fa fa-trash-o"></i></a>\
                        </td>\
                    </tr>\
                {% endfor %}';

        api.modules.list({'inline-relation-depth': 0}, function(json){
            console.log(json.data)
           if(json && json.code == 200 && json.data) {
               var context = { locals: { items: json.data }}
               var html = swig.render(tpl, context);
               //console.log(html);

               $('#modules-list tbody').html(html)
           }
        })
        self.bindEvent();

    }

    //绑定事件
    _p.bindEvent = function(){
        //删除模块
        $(document).on('click', 'a[data-act=deleteModule]', function(){
            alert('确定要删除该模块吗?')
        })
    }

    return new ModuleController();

})