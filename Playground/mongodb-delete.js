
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost/ToDoDB', 
{ useNewUrlParser: true }, (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ToDoDB');

    // deleteMany
    deletes all documents with matching criteria
    db.collection('Todos').deleteMany({text: 'Jump'}).then((result) => {
        console.log(result);
    });

    // deleteOne
    only deletes one document with passed in criteria
    db.collection('Todos').deleteOne({ text: 'Love' }).then((res) => {
        console.log(res);
    });

    // findOneAndDelete
    Uses the ObjectID to find and delete
    db.collection('Todos').findOneAndDelete({
        _id: ObjectID('5bea09f0d57b61fbfb729bed')
    }).then((res) => {
        console.log(res)
    });

    // Delete multiple user documents with name Andrew from the user collection
    db.collection('Users').deleteMany({
       name: 'Andrew' 
    }).then((res) => {
        console.log(res);
    })
    // client.close();
});

