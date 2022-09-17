
const { md5Hash } = require('../controllers/crypto.controller');

let chai = require('chai');
let server = require('../bin/www')
let chaiHTTP = require('chai-http');
const users = require('../models/user.model');



chai.should()

chai.use(chaiHTTP);

describe("User Routes", () => {

  //static data for testing
  const user = { username: "test123456", password: "testpassword" }//existing user
  const newUser = { username: "newuser", password: "testpassword" }//new user
  const user8 = { username: "test1238", password: " Wrongpassword" }//wrong username
  const user2 = { username: "wrongusername", password: " testpassword" }//wrong password/


  before((done) => {

    chai
      .request(server)
      .post('/register')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);

        done();
      });
  });

  after('DELETING THE EXISTING USER AND NEW USER AFTER THE TEST\n', (done) => {

    users.deleteOne(
      {
        username: md5Hash(user.username),
        username: md5Hash(newUser.username)
      }, (err) => {

        console.log("\n USERS DELETED")

        done();
      });

  });


  describe("POST /Register\n", () => {
    //not resister for existing user
    it(" Should Not Register For Existing user", (done) => {
      chai.request(server)
        .post("/register").send(user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.status.should.be.eq('failed')
          response.body.message.should.be.eq('Username taken')
          done();
        })
    })

    //register new user
    it(" Should Register New User", (done) => {
      chai.request(server)
        .post("/register").send(newUser)
        .end((err, response) => {

          response.should.have.status(200);
          response.body.status.should.be.eq('success')
          response.body.message.should.be.eq('Registration success')

          done();
        })
    })
  });


  describe("POST /login", () => {
    //login for existing user
    it(" Should Login existing User", (done) => {
      chai.request(server)
        .post("/login").send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.status.should.be.eq('success')
          response.body.message.should.be.eq('Login success')
          done();
        })
    })

    //not login for wrong password
    it(" Should Not Login User for Wrong Password", (done) => {
      chai.request(server)
        .post("/login").send(user8)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.status.should.be.eq('failed')
          response.body.message.should.be.eq('Invalid username')

          done();
        })
    })

    //not login for wrong username
    it(" Should Not Login User for Wrong username", (done) => {
      chai.request(server)
        .post("/login").send(user2)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.status.should.be.eq('failed')
          response.body.message.should.be.eq('Invalid username')
          done();
        })
    })
  });


})
