

const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {USER} = require('./../server/models/user');

var id = '6c00d89094f34ea2461b78fc11';
var userId = '5c0a1a7ad57b61fbfb7361b8';


console.log(Boolean([]));
console.log(Boolean(null));

// ObjectId.isValid
if (!ObjectID.isValid(id)) {
    console.log('YOOOO ID not valid');
}

// If your getting lots of todos make sure you use find()
// It returns an array of todos
// Todo.find({
//     _id: id
// })
// .then((todos) => {
//     if (todos.length < 0) {
//         console.log('Todos: ', todos);
        
//      } else {
//          console.log('No todos found');
//      }
// }).catch((e) => {
//     console.log(e);
// });

// QUERIES

// FindOne() return a single todo OBJECT 
// FInds a todo by a certain characterstict
// Todo.findOne({
//     _id: id
// })
// .then((todo) => {
//     console.log('Todo: ', todo);
// })

// // If you want to find todo by ID
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not Found!!');
//     }
//     console.log('Todo by ID: ', todo);  
// }).catch((e) => console.log(e));


// USER Find

USER.find().then((user) => {
    debugger;
    if (user.length == 0) {
        return console.log('There are no users');
    }
    console.log(user);
    console.log('------------------');
}).catch((e) => console.log(e));



// USER.findById({
//     _id: userId
// }).then((user) => {
//     if (!user) {
//         return console.log('No user found :(')
//     }
//     console.log(user);
// }).catch((e) => console.log(e));

// type 2

USER.findById('5c0a1a7ad57b61fbfb7361b8').then((user) => {
    if (!user) {
        return console.log('No user found :(')
    }
    console.log(user);
}, (e) => {
    console.log(e);
});