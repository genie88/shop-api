var rendering = require('../../util/rendering');


exports.home = function(req, res) {
    res.render('home/index');
}

//users
exports.users = function(req, res) {
    res.render('users/list');
}
exports.userDetail = function(req, res) {
    res.render('users/detail');
}

//goods
exports.goods = function(req, res) {
    res.render('goods/list');
}
exports.goodDetail = function(req, res) {
    res.render('goods/detail');
}

//suppliers
exports.suppliers = function(req, res) {
    res.render('suppliers/list');
}
exports.supplierDetail = function(req, res) {
    res.render('suppliers/detail');
}

//order
exports.orders = function(req, res) {
    res.render('orders/list');
}
exports.orderDetail = function(req, res) {
    res.render('orders/detail');
}

//modules
exports.modules = function(req, res) {
    res.render('modules/list');
}
exports.moduleDetail = function(req, res) {
    res.render('modules/detail');
}
exports.moduleNew = function(req, res) {
    res.render('modules/new');
}
exports.fragments = function(req, res) {
    res.render('modules/fragment-list');
}
exports.fragmentDetail = function(req, res) {
    res.render('modules/fragment-detail');
}
exports.fragmentNew = function(req, res) {
    res.render('modules/fragment-new');
}
