//define packages
var express = require('express')
  , config = require('./config')
  , app = express()
  , stylus = require('stylus')
  , nib = require('nib')
  , poet = require('poet')( app ) //pass express app
  , html2text = require('html-to-text');


//setup stylus and nib
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

//setup jade
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
//setup stylus
app.use(stylus.middleware({
    src: __dirname + '/public'
  , compile: compile
}));

//define static file server
app.use(express.static(__dirname + '/public'));
app.use(app.router);

//set config vars
app.locals.config = config;

//define routes
app.get('/', function (req, res){ res.render('json', {}); });
app.get('/json-example', function (req, res){ res.render('json-example', {}); });
app.get('/json-array', function (req, res){ res.render('json-array', {}); });
app.get('/json-object', function (req, res){ res.render('json-object', {}); });
app.get('/json-tutorial', function (req, res){ res.render('json-tutorial', {}); });
app.get('/cheat-sheet-v-1-3', function (req, res){ res.render('cheat', {}); });


//setup poet
poet.set({
	  posts: './posts',
	  postsPerPage: 10,
	  metaFormat: 'json',
	  readMoreLink : function (post) {
		  var anchor = '<a href="'+post.url+'" title="Read more of '+post.title+'">read more</a>';
		  return '<em>' + anchor + '</em>';
	  },
})
.createPostRoute( '/json-tutorial/:post', 'post' )
.createPageRoute( '/json-tutorial/page/:page', 'page' )
.createTagRoute( '/json-tutorial/tag/:tag', 'tag' )
.createCategoryRoute( '/json-tutorial/category/:category', 'category' )
.init(function(core) {
  app.get('/json-tutorial/rss', function ( req, res ) {
    var posts = core.getPosts(0, 5);
    
    // Since the preview is automatically generated for the examples,
    // it contains markup. Strip out the markup with the html-to-text
    // module. Or you can specify your own specific rss description
    // per post
    posts.forEach(function (post) {
      post.rssDescription = html2text.fromString(post.preview);
    });

    res.render( 'rss', { posts: posts, baseUrl: 'http://www.json.com/json-tutorial/' });
  });
});

// Handle 404
app.use(function(req, res) {
    res.status(400);
   res.render('404', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
   res.render('500', {title:'500: Internal Server Error', error: error});
});


//listen on app port
var port;
var expr = typeof process.env.PORT == 'undefined' ? port = 3000 : port = process.env.PORT;
app.listen(port);
console.log('listening to: '+port);

//functions
