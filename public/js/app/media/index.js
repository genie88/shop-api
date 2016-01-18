define(['jquery', 'swig', 'ckeditor', 'app/pager', 'fileupload', 'comp/dialog/index', 'app/base', 'api/index'], 
    function ($, swig, CKEDITOR,Pager, upload, Dialog, BaseController, API) {
    var jQuery = $;
    //console.log(CKEDITOR)
    var userId = parseInt(window.location.pathname.split('/')[2]);
    api = new API('http://localhost:3000/api', {});

    var roleMap = ['','管理员', '普通用户', '供应商'];
    var tobeDeleteUserId = '';

    //初始化模块控制器
    var MediaController = function(){

    }

    var _p = MediaController.prototype = new BaseController();

    _p.initUploader = function(){

        $("#input-repl-2").fileinput({
            uploadUrl: "/cms/upload",
            autoReplace: true,
            maxFileCount: 5,
            previewFileIconSettings: {
                'doc': '<i class="fa fa-file-word-o text-primary"></i>',
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
                'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
                'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
                'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
                'htm': '<i class="fa fa-file-code-o text-info"></i>',
                'txt': '<i class="fa fa-file-text-o text-info"></i>',
                'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
                'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
            },
            previewFileExtSettings: {
                'doc': function(ext) {
                    return ext.match(/(doc|docx)$/i);
                },
                'xls': function(ext) {
                    return ext.match(/(xls|xlsx)$/i);
                },
                'ppt': function(ext) {
                    return ext.match(/(ppt|pptx)$/i);
                },
                'zip': function(ext) {
                    return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
                },
                'htm': function(ext) {
                    return ext.match(/(php|js|css|htm|html)$/i);
                },
                'txt': function(ext) {
                    return ext.match(/(txt|ini|md|js)$/i);
                },
                'mov': function(ext) {
                    return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
                },
                'mp3': function(ext) {
                    return ext.match(/(mp3|wav)$/i);
                },
            }
            //allowedFileExtensions: ["jpg", "png", "gif"]
        });
    }


    //初始化用户列表页
    _p.initList = function(){
        var self = this;
        self.pager = new Pager({wrapper: $('.pagination'), total: 8, page: 2});
        
        //self.getUsers({}, {page: 1, page_size: 2});
        self.$scope.media = [
            {type: 'images', path: '/images/gallery/image1.jpg', preview: '/images/gallery/image1.jpg', name:'image1.jpg' },
            {type: 'images', path: '/images/gallery/image2.jpg', preview: '/images/gallery/image2.jpg', name:'image2.jpg' },
            {type: 'images', path: '/images/gallery/image3.jpg', preview: '/images/gallery/image3.jpg', name:'image3.jpg' },
            {type: 'docs', path: '/images/gallery/image1.jpg', preview: '/images/gallery/image1.jpg', name:'image1.jpg' },
            {type: 'audio', path: '/images/gallery/image2.jpg', preview: '/images/gallery/image2.jpg', name:'image2.jpg' }
        ]
        self.apply();
        self.initUploader();
        self.pager.render(1 , 1);

        $(document).on('PAGER_CHANGED', function(e, page){
            //console.log(page);
            self.getUsers({'inline-relation-depth': 1}, {page: page, page_size: 2});
        })
    }

    //删除文件
    _p.deleteFileDialog = function(e){
        var self = this;
        tobeDeleteFileId = $(this).parents('tr').data('id');

        var dialog = new Dialog({
            title: '删除文件',
            content:  '确定要删除该文件吗? 删除后将无法恢复.',
            btns: [
                {klass: 'btn-danger', text: '确定', callback: function(){
                    this.hide();
                    _p.deleteUser();
                }},
                {klass: 'btn-default',text: '取消', callback: null, dismiss: true}
            ]
        });
        dialog.show();
    }

    _p.deleteFile = function(){
        
    }

    //获取媒体库列表列表
    _p.getMediaLib = function(query, filter){
        var self = this;
        
    }

    return (new MediaController());

})