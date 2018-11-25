const mongoose = require('mongoose');


var USER = mongoose.model('User', {
    userName: {
        type: String,
        required: true,
        min: [1, 'Try Again'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: [1, 'Email not Correct!']
    }
});

module.exports = {
    // USER: USER
    USER    
};