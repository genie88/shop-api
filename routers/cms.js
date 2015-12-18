var express = require('express');
var cmsRouter = express.Router();

var cmsFragmentController = require('../controllers/cms_fragment.js');
var cmsModuleController = require('../controllers/cms_module.js');

//modules
cmsRouter.get('/modules', cmsModuleController.queryAll)
cmsRouter.get('/modules/:module_id', cmsModuleController.findOne)
cmsRouter.put('/modules/:module_id', cmsModuleController.update) //admin
cmsRouter.post('/modules', cmsModuleController.add) //admin
cmsRouter.delete('/modules/:module_id', cmsModuleController.del) //admin

//fragments
cmsRouter.get('/fragments', cmsFragmentController.queryAll)
cmsRouter.get('/fragments/:fragment_id', cmsFragmentController.findOne)
cmsRouter.put('/fragments/:fragment_id', cmsFragmentController.update) //admin
cmsRouter.post('/fragments', cmsFragmentController.add) //admin
cmsRouter.delete('/fragments/:fragment_id', cmsFragmentController.del) //admin

module.exports = cmsRouter;