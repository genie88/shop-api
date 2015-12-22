requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        app: '../app',
        modernizr: 'modernizr.min',
        'jquery-ui': 'jquery-ui-1.9.2.custom.min',
        'nicescroll': 'jquery.nicescroll',
        'easypiechart': 'easypiechart/jquery.easypiechart'
    },
    shim: {
        "bootstrap": ["jquery"],
        underscore: {
            exports: '_'
        },
        nicescroll: {
            deps: ['jquery'],
            exports: '$.fn.niceScroll'
        },
        easypiechart:{
            deps: ['jquery'],
            exports: '$.fn.easyPieChart'
        }
    }
});