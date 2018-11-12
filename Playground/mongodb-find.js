const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost/ToDoDB', 
{ useNewUrlParser: true }, (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ToDoDB');

    // Query the db for all documents
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    // Query db for not completed todos
    db.collection('Todos').find({
        completed: true
    })
    .toArray()
    .then((res) => {
        console.log('Completed Tasks');
        console.log(JSON.stringify(res, undefined, 2));
    }, (err) => {
        console.log('ERROR', err);
    })
    
    // Getting a document by object id
    db.collection('Users').find({
        _id: new ObjectID('5bea0146d57b61fbfb72992d')
    })
    .toArray()
    .then((result) => {
        console.log('User', result);
    }, (err) => {
        console.log('ERROR', err)
    })

    // Query the db for total number of Todo's
    db.collection('Todos').find().count().then((count) => {
        console.log(`Total Todo's Left: ${count}`)
    }, (err) => {
        console.log(err)
    })

    client.close();
});


