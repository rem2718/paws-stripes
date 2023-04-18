require("dotenv").config();
const debug = require('debug')('app:debug');
var express = require('express');
const router = require('./app/routes/mainRoutes');
const api = require('./app/routes/apiRoutes');
var app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/app/public'));
app.use('/api', api);
app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));