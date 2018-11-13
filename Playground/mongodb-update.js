const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost/ToDoDB', 
{ useNewUrlParser: true }, (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ToDoDB');

    // findOneAndUpdate 
    db.collection('Todos').findOneAndUpdate({
        _id: ObjectID('5bea0a4fd57b61fbfb729c03')
    },{
        $set: {
            text: 'Go to Movies',
            completed: false
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

    // Use the mongo incrementor operator
    db.collection('Users').findOneAndUpdate({
        _id: ObjectID('5be9e5744e8be22876e9a2cd')
    }, {
        $inc: {
            age: 50
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })


    // client.close();
});

