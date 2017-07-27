var express = require('express');
var path = require('path');
var open = require('open');
var webpack = require('webpack');
var config  = require('../webpack.config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
const compiler = webpack(config);
const port = 3000;
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

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
