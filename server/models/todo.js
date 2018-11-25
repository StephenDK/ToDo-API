const mongoose = require('mongoose');



// Making mongoose model for Todo's
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        min: 1,
        trim: true  
    },
    completed : {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}); 

module.exports = {
    Todo
};
