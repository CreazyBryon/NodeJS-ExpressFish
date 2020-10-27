
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express @ JY' });
};

exports.uploader = function(req, res){
  res.render('uploader', { title: 'Uploader @ JY' });
};