module.exports = function(controller, router){
	router.param('id', function(){});

	router.route('/')
		.get(controller.get)
		.post(controller.post);

	router.route('/:id')
		.get(controller.getOne)
		.delete(controller.delete)
		.put(controller.put);
};
