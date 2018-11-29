const expect = require('expect')
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('../models/todo');

// console.log(app);

// Testing lifecycle method
// run this code before every test case
beforeEach((done) => {
    Todo.deleteMany({}).then(() => done());
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
    });
});