require("dotenv").config();
const debug = require('debug')('app:debug');
var express = require('express');
const router = require('./app/routes/mainRoutes');
const user = require('./app/routes/userRoutes');
const pets = require('./app/routes/petsRoutes');
const request = require('./app/routes/requestRoutes');
const experience = require('./app/routes/experienceRoutes');
const volunteer = require('./app/routes/volunteerRoutes');

var app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/app/public'));
app.use('/api/user', user);
app.use('/api/pets', pets);
app.use('/api/adopt', request);
app.use('/api/experiences', experience);
app.use('/api/volunteer', volunteer);
app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));