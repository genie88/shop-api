var express = require('express');
var apiRouter = express.Router();

var goodController = require('../controllers/good.js');
var userController = require('../controllers/user.js');
var orderController = require('../controllers/order.js');

//goods
apiRouter.get('cats/cat_id/goods', goodController.queryAll);
apiRouter.get('specs/spec_id/goods', goodController.queryAll);
apiRouter.get('suppliers/supplier_id/goods', goodController.queryAll);
apiRouter.get('/goods', goodController.queryAll)

apiRouter.get('/goods/:goodId', goodController.findOne)
apiRouter.put('/goods/:goodId', goodController.update)
apiRouter.post('/goods', goodController.add)
apiRouter.delete('/goods/:goodId', goodController.del)

apiRouter.get('/orders', orderController.queryAll)
apiRouter.get('/orders/:id', orderController.findOne)
apiRouter.put('/orders/:id', orderController.update)
apiRouter.post('/orders', orderController.add)
apiRouter.delete('/orders/:id', orderController.del)

//users
apiRouter.get('/users', userController.queryAll)
apiRouter.get('/users/:user_id', userController.findOne)
apiRouter.put('/users/:user_id', userController.update)
apiRouter.post('/users', userController.add)
apiRouter.delete('/users/:user_id', userController.del)

module.exports = apiRouter;