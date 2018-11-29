const mongoose = require('mongoose');


// connect to DB


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/TodoApp', {
    useNewUrlParser: true
});


module.exports = {
    mongoose
};