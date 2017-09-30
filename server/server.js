var express = require('express');
var app = express();
var path = require('path');
var bodyParser =require('body-parser');
var logger = require('morgan');

var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var family = {
  'Mia': 'little cheeky monkey',
  'Isobel': 'The sassy one',
  'Charlie': 'The dude',
  'Mummy': 'The sensible one',
  'Daddy': 'The awesome one'
};
app.use(logger('combined'));
app.use(express.static('.\..\dist\index.html'));
app.get('/family', function(request, response){
   response.json(family);
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('express server listening on port 3000');
});
