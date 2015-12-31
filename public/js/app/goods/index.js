define(['jquery', 'swig', 'ckeditor','api/index', ], function ($, swig, CKEDITOR, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var userId = window.location.pathname.split('/')[2];
    api = new API('http://localhost:3000/api', {});

    //初始化模块控制器
    var GoodController = function(){

    }

    var _p = GoodController.prototype;

    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        var tpl = '{% for item in items %}\
                    <tr data-id="{{item.id}}">\
                        <td><a href="/goods/{{item.id}}">{{item.name}}</a></td>\
                        <td>{{item.brand_name}}</td>\
                        <td><span class="label label-success label-mini">{{item.cat.cat_name}}</span></td>\
                        <td>{{item.description}} </td>\
                        <td> <img src="{{item.default_image}}" alt="" height=50" /> </td>\
                        <td>{{item.price}} / {{item.market_price}}</td>\
                        <td>{{item.stock}}</td>\
                        <td>\
                            <a href="/goods/{{item.id}}"><i class="fa fa-eye"></i></a>\
                            <a href="/goods/{{item.id}}/edit"><i class="fa fa-edit"></i></a>\
                            <a href="javascript:;" data-act="deleteModule"><i class="fa fa-trash-o"></i></a>\
                        </td>\
                    </tr>\
                {% endfor %}';

        api.goods.list({'inline-relation-depth': 1}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                var context = { locals: { items: json.data.data }}
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

    return new GoodController();

})