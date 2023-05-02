require("dotenv").config();
const debug = require('debug')('app:main');
const express = require('express');
require('./app/utils/database');
const cookieParser = require('cookie-parser');
const err404 = require('./app/utils/handle404Middleware');
const session = require('express-session');
const router = require('./app/routes/mainRoutes');
const api = require('./app/routes/apiRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
    secret: process.env.PRIVATE_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/app/public'));

app.use('/api', api);
app.use('/', router);
app.use(err404);
app.listen(port, () => debug(`Listening on port ${port}...`));