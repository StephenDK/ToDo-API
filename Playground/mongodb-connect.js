// const MongoClient = require('mongodb').MongoClient;

// Now using destructuring
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost/ToDoDB', 
{ useNewUrlParser: true }, (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ToDoDB');

    Insert record in to collection
    db.collection('Todos').insertOne({
        text: 'Play video games',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert todo', err);
        }
        console.log('Todo has been inserted.......... \n', JSON.stringify(result.ops));
    });

    db.collection('Users').insertOne({
        name: 'Josh Aguliar',
        age: 24,
        location: 'San Jose, California'
    }, (err, result) => {
        if(err) {
            return console.log('ERROR \n', err);
        }
        console.log(result);
        // console.log('User inserted', JSON.stringify(result.ops));
        // console.log('MongoDB TimeStamp: ', result.ops[0]._id.getTimestamp());
    });


    client.close();
});

// The 12 byte object id in mongodb is made up of
// a 4 byte timestamp when created
// a 3 byte machine identifer
// 2 byte process id
// 3 byte counter

