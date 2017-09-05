var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiRouter = require('./routes/apiRouter');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log(">>> acrux_api server start on port 3000");
});