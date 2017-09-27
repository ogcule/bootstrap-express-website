const express = require('express');
const app = express();
const path = require('path');
const bodyParser =require('body-parser');

let parseUrlencoded = bodyParser.urlencoded({ extended: false});

let family = {
  'Mia': 'little cheeky monkey',
  'Isobel': 'The sassy one',
  'Charlie': 'The dude',
  'Mummy': 'The sensible one',
  'Daddy': 'The awesome one'
};
app.use(express.static('./../dist'));
app.post('/family', parseUrlencoded, function(request,response){
  response.json(family);
});
app.listen(3000, ()=> {
  console.log('express server listening on port 3000');
});
