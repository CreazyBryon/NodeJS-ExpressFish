
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , fileUpload = require('express-fileupload')
  , path = require('path');

var app = express();

 
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.favicon());
  //app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
 
app.use(fileUpload());
 

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/uploader', routes.uploader);
 
app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
	  //console.log(req);
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

//console.log(sampleFile);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('uploads/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.get('/download/:id', function(req, res){
  const file = `${__dirname}/uploads/`+req.params.id;
  res.download(file); // Set disposition and send it.
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
