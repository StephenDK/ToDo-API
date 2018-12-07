
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {USER} = require('./models/user');


var app = express();

app.use(bodyParser.json());

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
    Todo.find().then((todos) => {
        // console.log(todos);
        res.send({todos});
    }, (e) => {
        // If there is an error
        res.status(400).send(e);
        console.log(e);
    });
});




app.listen(3000, () => {
    console.log('Started on Port 3000');
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