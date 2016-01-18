var express = require('express');
var cmsRouter = express.Router();

var cmsFragmentController = require('../controllers/cms_fragment.js');
var cmsModuleController = require('../controllers/cms_module.js');
var uploadController = require('../controllers/upload.js');

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

//upload
cmsRouter.post('/upload', uploadController.upload) //admin
cmsRouter.get('/media/list', uploadController.list) //admin

module.exports = cmsRouter;