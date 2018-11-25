const mongoose = require('mongoose');


// connect to DB


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TodoApp', {
    useNewUrlParser: true
});


module.exports = {
    mongoose
};