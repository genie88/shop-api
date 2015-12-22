requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        app: '../app',
        'nicescroll': 'jquery.nicescroll',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        nicescroll: {
            deps: ['jquery'],
            exports: '$.fn.niceScroll'
        }
    }
});