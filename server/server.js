var express = require('express');
var path = require('path');
var open = require('open');
var webpack = require('webpack');
var config  = require('../webpack.config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

mongoose.connect('mongodb://dbadim:drum12@ds127963.mlab.com:27963/shoppinglists');
const compiler = webpack(config);
const port = process.env.PORT || 3000;
const app = express();

var listSchema = new Schema({
  date: String,
  user: String,
  items: Array

});

var List = mongoose.model('List', listSchema );
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port,  (error) => {
    if(error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`);
    }
});

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.post('/lists',(req ,res)=>{
    List.create(req.body, (error) => {
      if (error) console.error("not created");
      else{
        console.log("ya!!");
      }
    });
    console.log(req.body);
    res.send("succses");
});

app.get('/lists' , (req ,res) =>{

  List.find({user:Object.keys(req.query)[0]})
  .then((data)=>{
    console.log("yo mamma", data);
    res.send(data);
  }).catch((err)=>{
    throw err;
  });

});
