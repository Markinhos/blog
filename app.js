var express = require('express');
var DatabaseProvider = require('./databaseProvider').DatabaseProvider;
var ArticleProvider = require('./articleprovider').ArticleProvider;

var app = module.exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider(new DatabaseProvider('node-mongo-blog-2','localhost', 27017).db);

app.get('/', function(req, res){
  articleProvider.findAll( function(error,docs){
    res.render('index.jade', {title: 'Blog',
      articles:docs});    
    })
});

app.get('/blog/new', function(req, res) {
  res.render('blog_new.jade', { 
    title: 'New Post'
  });
});

app.get('/blog/:id', function(req, res){
  articleProvider.findById(req.params.id, function(error, article){
    res.render('blog_show-final.jade',{
      title: article.title,
      article: article
    })
  })
})

app.post('/blog/new', function(req, res){
  articleProvider.save({
      title: req.param('title'),
      body: req.param('body')
    }, function( error, docs) {
      res.redirect('/');
  });
});

app.post('/blog/delete/:id', function(req, res){
    articleProvider.delete(req.params.id, function(error, docs){
      res.redirect('/');
    });
});

app.post('/blog/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});


app.listen(3000);