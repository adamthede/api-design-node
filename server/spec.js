var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, POST, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function() {

	it('should get all lions', function(done) {
		request(app)
			.get('/lions')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, resp) {
				expect(resp.body).to.be.an('array');
				done();
			});
	});

	it('should create one lion', function(done) {
		request(app)
			.post('/lions')
            .send({'name':'Adam','age':36,'pride':'Super Cool','gender':'male'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp) {
                expect(resp.body).to.be.an('object');
                expect(resp.body.name).to.equal('Adam');
                expect(resp.body.id).to.be.a('string');
                done();
            });
	});

    it('should get one lion', function(done){
        request(app)
            .get('/lions/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp){
                expect(resp.body).to.be.an('object');
                done();
            });
    });

    it('should update a lion with new information', function(done){
        var lion = {'name':'Adam','age':36,'pride':'Super Duper Cool','gender':'male','id':1};
        request(app)
            .put('/lions/1')
            .send(lion)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp){
                expect(resp.body).to.be.an('object');
                expect(resp.body.pride).to.equal('Super Duper Cool');
                done();
            });
    });

    it('should delete one lion', function(done){
        request(app)
            .delete('/lions/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp){
                expect(resp.body).to.be.an('object');
                done();
            });
    });

    it('should delete a lion', function(done){
        request(app)
            .post('/lions')
            .send({
                name: 'Mufasa',
                pride: 'Super Duper Cool',
                age: 35,
                gender: 'male'
            })
            .set('Accept', 'application/json')
            .end(function(err, resp){
                var lion = resp.body;
                request(app)
                    .delete('/lions/' + lion.id)
                    .end(function(err, resp){
                        expect(resp.body).to.eql(lion);
                        done();
                    });
            });
    });
});
