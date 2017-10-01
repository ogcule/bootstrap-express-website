import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';

let parseUrlencoded = bodyParser.urlencoded({ extended: false});

let family = [
  { name: 'Mia', description: 'little cheeky monkey'},
  { name: 'Isobel', description: 'The sassy one'},
  { name:'Charlie', description: 'The dude'},
  { name: 'Mummy', description: 'The sensible one'},
  { name: 'Daddy', description: 'The awesome one'}
];
app.use(logger('combined'));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/family', function(request, response){
   response.json(family);
});
app.post('/family',parseUrlencoded, function(request,response){
  let newMember = request.body;
  response.status(201).json(newMember);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('express server listening on port 3000');
});
