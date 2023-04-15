const debug = require('debug')('app:debug');
// debug(require("dotenv").config());

var express = require('express');
debug('hi');
const user = require('./app/routes/user_route');

var app = express();
debug(process.env);
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app/public'));
app.use('/api/user', user);


app.listen(port, () => console.log(`Listening on port ${port}...`));