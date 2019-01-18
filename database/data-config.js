const mongoose = require('mongoose');


mongoose.connect('mongodb://root:root@ds225382.mlab.com:25382/roberto-dure-db');
mongoose.Promise = global.Promise;

module.exports = mongoose;
