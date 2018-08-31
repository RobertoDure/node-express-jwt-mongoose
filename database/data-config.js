const mongoose = require('mongoose');


mongoose.connect('mongodb://root:root0@ds225382.mlab.com:25382/your-db');
mongoose.Promise = global.Promise;

module.exports = mongoose;
