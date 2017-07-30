var express = require('express');
var path = require('path');
var open = require('open');
var webpack = require('webpack');
var config  = require('../webpack.config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test');
const compiler = webpack(config);
const port = 3000;
const app = express();

// var lists = new Schema({
//   store: String,
//   User: String,
//   item: String,
//   quantity: Number,
//   bought: Boolean
//
// });

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
  // req.on('data',(data)=> {
  //   console.log(JSON.parse(data));
  //   res.send(200);
  // });

    console.log(req.body);
    res.send("succses");

});
