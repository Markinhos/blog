var assert = require('assert')
  , DatabaseProvider = require('./../databaseProvider').DatabaseProvider
  , ArticleProvider = require('./../articleprovider').ArticleProvider
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , should = require('should');

describe('articles db:', function() {
	var database = null;
	var articleProvider = null;

	before(function(done){
		database = new DatabaseProvider('node-mongo-blog-test','localhost', 27017).db;
		articleProvider = new ArticleProvider(database);
		done();
	});

	afterEach(function(done){
		articleProvider.deleteAll( done	);
	});

	it('dummy test', function() {
		assert.equal(1, 1);
	});
	it('list empty articles', function(done) {
		articleProvider.findAll(function(error, articles){
			if (error) {
				//console.log("Eror fetching collection " + error);
				done(error);
			}
			else {
				console.log("Success fetching!");
				articles.should.be.empty;
				done();
			}
		});
	});

	it('add an article', function(done){
		articleProvider.save({
			title: 'test Title',
			body: 'nothing special'
		},function(error, articles){
			articles.should.have.lengthOf(1);
			done();
		});
	});

	after(function(){
		database.dropDatabase(function(){});
	});
});