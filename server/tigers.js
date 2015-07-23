// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for tigers
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var _ = require('lodash');
var tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
	if (!req.body.id) {
		id++;
		req.body.id = id + '';
		next();
	} else {
		res.send();
	}
};

tigerRouter.param('id', function(req, res, next, id) {
	var tiger = _.find(tigers, {id: id});

	if (tiger) {
		req.tiger = tiger;
		next();
	} else {
		res.send();
	}
});

tigerRouter.route('/')
	.get(function(res, req){
		res.json(tigers);
	})
	.post(updateId, function(req, res){
		var tiger = req.body;
		tigers.push(tiger);
		res.json(tiger);
	});

tigerRouter.route('/:id')
	.get(function(req, res){
		var tiger = req.tiger;
		res.json(tiger || {});
	})
	.delete(function(req, res){
		var tiger = _.findIndex(tigers, {id:req.params.id});
		tigers.splice(tiger,1);
		res.json(req.tiger);
	})
	.put(function(req, res){
		var update = req.body;
		if(update.id) {
			delete update.id;
		}
		var tiger = _.findIndex(tigers, {id:req.params.id});
		if(!tigers[tiger]) {
			res.send();
		} else {
			var updatedTiger = _.assign(tigers[tiger], update);
			res.json(udpatedTiger);
		}
	});

module.exports = tigerRouter;
