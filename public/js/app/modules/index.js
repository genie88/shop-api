define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base','app/modules/propEditor', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, PropEditor, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var moduleId = parseInt(window.location.pathname.split('/')[2]);
    window.api = new API('http://localhost:3000/api', {});

    var propEditor;


    //初始化模块控制器
    var ModuleController = function(){

    }

    var _p = ModuleController.prototype = new BaseController();

    //初始化模块详情页
    _p.initDetail = function(){
        var self = this;

        self.pager = new Pager({wrapper: $('.pagination ul'), total: 8, page: 2});

        //获取模块字段含义
        api.modules.get(moduleId, {}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                self.$scope.module = json.data;
                //console.log(self.$scope.module.ext1);
                var props = null;
                try {
                    props = JSON.parse(self.$scope.module.ext1); 
                } catch(e){
                    
                }
                
                propEditor = new PropEditor(props, {wrap: $('#propEditor tbody')});
                
                self.getFragments({}, {page: 1, page_size: 5});
                self.apply();
            }
        })

        
        $(document).on('PAGER_CHANGED', function(e, page){
            self.getFragments({}, {page: page, page_size: 5});
        })
    }

    _p.savePropDefination = function(){
        //console.log(propEditor.getProps());
        var propsDefination = propEditor.getProps();
        api.modules.update(moduleId, {module: {ext1: propsDefination}}, function(json){
            if(json && json.code == 200 && json.data && json.data) {
                console.log('保存成功');
            }
        })
    }

    _p.getFragments = function(query, filter){
        var self = this;
        api.modules.fragments(moduleId).list({}, function(json){
            //console.log(json.data)
            if(json && json.code == 200 && json.data) {
                self.$scope.fragments = json.data.data;
                self.page = json.data.currentPage;
                self.total = json.data.pages.length;
                self.apply();
                self.pager.render(self.page , self.total);
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