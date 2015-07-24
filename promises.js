var action = function(cb){
	setTimeout(function(){
		cb('hey');
	}, 5000);
};

action(function(arg){
	console.log(arg);
});

// PROMISES ----------------------------------------------

// READ FILE EXAMPLE
var fs = require('fs');

var readFile = function(){
	return new Promise(function(resolve, reject){
		fs.readFile('./package.json', function(err, file){
			return err ? reject(err) : resolve(file.toString());
		});
	});
};

readFile()
	.then(function(file){
		console.log(file);
	})
	.catch(function(err){
		console.log('ERROR', err);
	})
	.finally();

fs.readFile('./package.json', function(err, file){
	console.log('reading file');
	console.log(file.toString());
});
console.log('after read file');



// TIMEOUT EXAMPLE
var action = function(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve('hey');
		}, 5000);
	});
};

action()
	.then(function(word){
		console.log(word);
	})
	.catch(function(err){
		console.log('ERROR', err);
	});

// PROMISE is just an object with notification methods on it
// Invented for single threaded environments like javascript
