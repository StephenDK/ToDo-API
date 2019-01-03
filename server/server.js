require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {USER} = require('./models/user');


var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));





    

app.post('/todos', (req, res) => {
    console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    });
   
    todo.save().then((data) => {
        console.log('ToDo Saved..');
    }, (e) => {
        // console.log(e);
        res.status(400).send(e);
        console.log(e.errors.text.message)
       
    });
   

    
    // User.save(person).then((data) => {
    //     console.log('Success');
    // }, (e) => {
    //     console.log('ERROR', e);
    // })
    // User.save({
    //     userName: req.body.name,
    //     email: req.body.email
    // }).then((data) => {
    //     console.log('Saved new user');
    // }, (e) => {
    //     console.log('ERROR: ', e);
    // })
});


// route 2
app.post('/newuser', (req, res) => {

    var user = new USER({
        userName: req.body.userName,
        email: req.body.email
    });
    console.log(user);
    user.save().then((data) => {
        console.log('New User Saved');
    }, (e) => {
        console.log(e);
    })
})


// ROUTE TO GET ALL THE TODOS
app.get('/alltodos', (req, res) => {
    // console.log('I have the best wife');
    Todo.find().then((todos) => {
        // console.log(todos);
        res.send({todos});
    }, (e) => {
        // If there is an error
        res.status(400).send(e);
        console.log(e);
    });
});


// **********
// How to get todos by passing variables
// Through the URL

// GET /todos/12434342 <-- make this dynamic
// Use whatever is passed in and use
// it to make a query to todos db

// My code 
// app.get('/todos/:id', (req, res) => {
//     // req.params
//     // res.send(req.params);
//     var id = req.params.id;

//     // Validate mongo id using isValid
//     if (!ObjectID.isValid(id)) {
//         // if not valid send error
//         return res.status(404).send({});
//     } else {
//         // If valid
//         // find by id in the database
//         Todo.findById({
//             _id: id
//         }).then((todo) => {
//             // If no users found send error
//             if(!todo) {
//                 return res.status(404).send({});
//             } else {
//                 res.send({todo});
//             }
//         }).catch((e) => {
//             // if DB error send back error
//             res.status(400).send(e);
//         })
//     }
// });

app.get('/todos/:id', (req, res) => {
    var id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo})
    }).catch((e) => {  
        res.status(400).send();
    });
});


// Route to delete a todo
app.delete('/tododelete/:id', (req, res) => {
    // console.log(req);
    let id = req.params.id;
    // console.log(id);
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    // db call
    Todo.findOneAndRemove({_id: id}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        // console.log('Todo deleted');
        // console.log(todo);
        res.send({todo});
    }).catch((e) => {
        // console.log(e);
        res.status(400).send();
    })
});

// PATCH route to update a todo
app.patch('/todoupdate/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.body);
    // The lodash pick method takes in the req.body object and 
    // makes an object from the specifid keys
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(body.completed);

    // Check the object id and see if its valid
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        // Check if the body.completed is boolean and body.completed is true
        // set the completedAt to a time stamp 
        body.completedAt = new Date().getTime();
    } else {
        // set the completed and completedAt stamp to false and null
        body.completed = false;
        body.completedAt = null;
    }

    // Make a query to db to make an update
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        // check if todo object does not exist
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})


// Updating a todo
// app.put('/todoupdate/:id', (req, res) => {
//     var id = req.params.id;

//     var newTodo = {
//         text: req.body.text
//     }
//      console.log(req)
// })






app.listen(PORT, () => {
    console.log('Started on Port', PORT);
});

module.exports = {app};

// var newUser = new USER({
//     userName: 'Stephen Klein',
//     email: 'stephen.klein08yahoo.com'
// });

// var newTudo = new Todo({
//     text: 'Sky Dive'
// });

// // newTudo.save().then((doc) => {
// //     console.log('Saved todo: ', doc);
// // }, (e) => {
// //     console.log('Unbale to save tudo', e);
// // });

// newUser.save().then((data) => {
//     console.log('Saved User', data)
// }, (e) => {
//     console.log(e);
// })