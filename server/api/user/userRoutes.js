var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./userController');
var createRoutes = require('../../util/createRoutes');
// setup boilerplate route jsut to satisfy a request
// for building

createRoutes(controller, router);

module.exports = router;
