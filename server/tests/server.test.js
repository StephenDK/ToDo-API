
const expect = require('expect')
const request = require('supertest');
const {ObjectID} = require('mongodb');


const {app} = require('./../server');
const {Todo} = require('../models/todo');

// console.log(app);

// DB SEED DATA
const todos = [
    {
        _id: new ObjectID(),
        text: 'Make dinner'
    },
    {
        _id: new ObjectID(),
        text: 'Go out for dessert',
        completed: true,
        completedAt: 333
    }
]

// Testing lifecycle method
// run this code before every test case
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
    
  });


// Testing route
describe('POST /todos', () => {
    // Use done if asychronus
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
            done()
    });
    
    it('should not create todo with invalid body data', (done) => {
        
        // make request
        request(app)
            .post('/todos')
        // send empty object
            .send({})
        // expect 400
            .expect(400)
        // pass call back to end
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
            })
        // get length of todos from db and make sure its zero
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
    });
});

describe('GET /alltodos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/alltodos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


// Test the GET /todo route
describe('GET /todos/:id', () => {
    it('should get user with id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    })

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    })

    it('should return 404 for non object id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })
})

// test the DELETE /todosdelete/:id
describe('DELETE /tododelete/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        // console.log(hexId);
        request(app)
            .delete(`/tododelete/${hexId}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body._id);
                expect(res.body.todo._id).toBe(hexId);
            })
            .end(done);
    })

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete('/tododelete/5c2063b5d57b61fbfb73ca86')
            .expect(404)
            .end(done);
    });

    it('should return 404 if objectID is invalid', (done) => {
        request(app)
            .delete('/tododelete/35c2063b5d57b61fbfb7')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        // grab id of first item
        var hexId = todos[0]._id.toHexString();
        // make PATCH request, update text, set completed to true
        request(app)
            .patch(`/todoupdate/${hexId}`)
            .send({
                text: 'Going out to drink beer',
                completed: true,
                
            })
            .expect(200)
        // assert a 200 response code
            .expect((res) => {
                // console.log(res.body);
                expect(res.body.todo.text).toBe('Going out to drink beer');
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');

            })
        // custom assertion response body.text = text, completed = true, and completedAt = number
        // hint toBe()
        .end(done);
    });

    it('should clear completed at when todo is not completed', (done) => {
        // grab id of second todo item
        var id = todos[1]._id.toHexString();
        // update text to something different, set completed = false
        request(app)
            .patch(`/todoupdate/${id}`)
            .send({
                text: 'Buy a MotorCycle',
                completed: false
            })
        // assert 200 response code
            .expect(200)
        // text is changed, completed = false, completedAt = null
            .expect((res) => {
                // console.log(res.body);
                expect(res.body.todo.text).toBe('Buy a MotorCycle');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
        // toNotExist()
            .end(done);
    });
})