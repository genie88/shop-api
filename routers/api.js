var express = require('express');
var apiRouter = express.Router();

var goodController = require('../controllers/good.js');
var orderController = require('../controllers/order.js');


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

module.exports = apiRouter;