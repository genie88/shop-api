define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index', ], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var moduleId = window.location.pathname.split('/')[2];
    window.api = new API('http://localhost:3000/api', {});



    //初始化模块控制器
    var ModuleController = function(){

    }

    var _p = ModuleController.prototype = new BaseController();

    //初始化模块详情页
    _p.initDetail = function(){
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

    }

    _p.getModules = function(query, filter){
        var self = this;
        api.modules.list({queries: query, filters: filter}, function(json){
            console.log(json.data)
            if(json && json.code == 200 && json.data && json.data.data) {
                self.$scope.modules = json.data.data;
                self.page = json.data.currentPage;
                self.total = json.data.pages.length;
                self.apply();
                self.pager.render(self.page , self.total);
            }
        })
    }

    //初始化模块列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});
        self.getModules({}, {page: 1, page_size: 5});
        $(document).on('PAGER_CHANGED', function(e, page){
            self.getModules({'inline-relation-depth': 1}, {page: page, page_size: 5});
        })
    }

    return new ModuleController();

})