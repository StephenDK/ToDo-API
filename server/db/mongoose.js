const mongoose = require('mongoose');


// connect to DB


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});


module.exports = {
    mongoose
};