const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./controllers/index')(app);
//require('./controllers/email')(app);
//require('./controllers/authController')(app);
//require('./controllers/projectController')(app);

app.listen(3000);