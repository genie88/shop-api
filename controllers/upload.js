var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc


var util = require('../util/util.js');

module.exports = {
	upload: function(req, res, next){
		var form = new formidable.IncomingForm();
	    //Formidable uploads to operating systems tmp dir by default
	    form.uploadDir = "./upload";       //set upload directory
	    form.keepExtensions = true;     //keep file extension

	    form.parse(req, function(err, fields, files) {
			//TESTING
	        console.log("file size: "+JSON.stringify(files.files.size));
	        console.log("file path: "+JSON.stringify(files.files.path));
	        console.log("file name: "+JSON.stringify(files.files.name));
	        console.log("file type: "+JSON.stringify(files.files.type));
	        console.log("lastModifiedDate: "+JSON.stringify(files.files.lastModifiedDate));

	        //Formidable changes the name of the uploaded file
	        //Rename the file to its original name
	        fs.rename(files.files.path, './build/public/upload/'+files.files.name, function(err) {
	        if (err)
	            throw err;
	          	console.log('renamed complete');  
	        });
	        // res.end();
	        util.res(null, res, {path: '/upload/'+files.files.name})
	    });
	}
}