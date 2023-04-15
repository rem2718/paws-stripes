require("dotenv").config();
const debug = require('debug')('app:debug');
var express = require('express');
const user = require('./app/routes/userRoutes');
const pets = require('./app/routes/petsRoutes');
const adoption = require('./app/routes/adoptionRoutes');
const adoptionExperience = require('./app/routes/adoptionExperienceRoutes');
const handover = require('./app/routes/handoverRoutes');
const rescue = require('./app/routes/rescueRoutes');
const volunteer = require('./app/routes/volunteerRoutes');

var app = express();
const port = process.env.PORT;

app.set('port', port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/app/public'));
// app.use('/api/user', user);
// app.use('api/pets', pets);
// app.use('api/adopt', adoption);
// app.use('api/experiences', adoptionExperience);
// app.use('api/handover', handover);
// app.use('api/rescue', rescue);
// app.use('api/volunteer', volunteer);

app.listen(port, () => console.log(`Listening on port ${port}...`));