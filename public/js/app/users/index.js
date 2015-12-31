define(['jquery', 'swig', 'ckeditor','api/index', ], function ($, swig, CKEDITOR, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var userId = window.location.pathname.split('/')[2];
    api = new API('http://localhost:3000/api', {});

    //初始化模块控制器
    var UserController = function(){

    }

    var _p = UserController.prototype;

    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        var tpl = '{% for item in items %}\
                    <tr data-id="{{item.id}}">\
                        <td><a href="/users/{{item.id}}">{{item.username}}</a></td>\
                        <td class="hidden-phone">{{item.phone}}</td>\
                        <td>{{item.email}} </td>\
                        <td><span class="label label-info label-mini">{% if item.role == 2 %}用户 {% else %} 供应商{% endif %}</span></td>\
                        <td>{{item.last_login_time}} </td>\
                        <td><span class="label label-warning label-mini">{% if item.is_show %}显示 {% else %} 隐藏{% endif %}</span></td>\
                        <td>\
                            <a href="/users/{{item.id}}"><i class="fa fa-eye"></i></a>\
                            <a href="/users/{{item.id}}/edit"><i class="fa fa-edit"></i></a>\
                            <a href="javascript:;" data-act="deleteModule"><i class="fa fa-trash-o"></i></a>\
                        </td>\
                    </tr>\
                {% endfor %}';

        api.users.list({'inline-relation-depth': 0}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data) {
                var context = { locals: { items: json.data }}
                var html = swig.render(tpl, context);
                //console.log(html);

                $('#userList tbody').html(html)
            }
        })
        self.bindEvent();

    }

    //绑定事件
    _p.bindEvent = function(){
        //删除模块
        $(document).on('click', 'a[data-act=deleteModule]', function(){
            alert('确定要删除该用户吗?')
        })
    }

    return new UserController();

})