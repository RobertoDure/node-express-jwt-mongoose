const mongoose = require('mongoose');


mongoose.connect('mongodb://root:hall9000@ds225382.mlab.com:25382/roberto-dure-db');
mongoose.Promise = global.Promise;

module.exports = mongoose;