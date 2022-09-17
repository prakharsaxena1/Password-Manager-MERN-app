let chai = require('chai');
let server = require('../bin/www')
let chaiHTTP = require('chai-http');
const {md5Hash,decryptData, encryptData } = require('../controllers/crypto.controller');


const secrets=require('../models/secret.model')


let jwt = require('jsonwebtoken');

chai.should()

chai.use(chaiHTTP);

describe("Password Routes\n",()=>{
  
  //static data to be passed in database for testing
  const user={username:"test123456",password:"testpassword"}//existing user
  const secret={site_name: "facebook",url: "facebook.com",login: "jpg123",site_password: "jp@123" }
  const updatesecret={site_name: "facebook",url: "facebook.com",login: "updated",site_password: "jp@123" }
  let correctid;
  const wrongid="62dfb37872d93a53";
  
  //generating jwt token for testing
  const encPassword = encryptData(user.password,user.password)
  const tokenData = encryptData({
    username: user.username,
    password: decryptData(encPassword,user.password).replaceAll('"', '')
}, process.env.SERVER_ENCRYPTION_KEY)
const token = 'bearer%20' + jwt.sign({ tokenData },process.env.TOKEN_SECRET);




after('DELETING SECRETS AFTER THE TEST\n',(done)=>{
  
 secrets.deleteOne({username: md5Hash( user.username)}, (err) => { 
console.log(" SECRETS DELETED\N");
  done();           
});
  
  
});
//test for the generation of auth token in cookies
describe("GENERATE auth_token in cookies\n", () => {

  it("should generate auth token\n", (done) => {
    
    chai.request(server)
      .get("/api/login").send(user)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
        response.should.have.status(200);
        console.log('auth-token =',token)
       done();
      })
  })

});


describe("POST /passwords", () => {
    //create sectet for authorised existing user 
    it(" Should add new password for authorised existing user", (done) => {
      chai.request(server)
        .post("/api/password").send(secret)
        .set('cookie', 'auth_token' + token)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.status.should.be.eq( 'success' );
          response.body.message.should.be.eq( 'Secret created' )
          correctid=response.body.data.id
         done();
        })
    })

    //create sectet for existing user
    it(" Should not add new password for unauthorised user\n", (done) => {
      chai.request(server)
        .post("/api/password").send(secret)
        .set('cookie', 'auth_token' + "")
        .end((err, response) => {
         response.should.have.status(401);
        
          done();
        })
    })
});
  describe("GET /passwords", () => {
    //create sectet for authorised existing user 
    it(" Shoul get all the passwords for authorised existing user", (done) => {
      chai.request(server)
        .get("/api/password")
        .set('cookie', 'auth_token' + token)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.status.should.be.eq( 'success' );
          response.body.message.should.be.eq( 'Contains 1 passwords' );
         done();
        })
    })

    //create sectet for existing user
    it(" Should not get all the passwords for unauthorised user\n", (done) => {
      chai.request(server)
        .get("/api/password")
        .set('cookie', 'auth_token' + "")
        .end((err, response) => {
         response.should.have.status(401);
          done();
        })
    })
});

describe("GET /passwords/id", () => {
  //get password by correct id 
  it(" Shoul get  the passwords for authorised existing user by correct id", (done) => {
    chai.request(server)
      .get("/api/password/"+correctid)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.status.should.be.eq( 'success' );
        response.body.message.should.be.eq( 'Contains 1 password' );
       done();
      })
  })

  //not get password for wrong id
  it(" Should not get the passwords for existing user wrong id\n", (done) => {
    chai.request(server)
      .get("/api/password/"+wrongid)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
       response.should.have.status(400);
       response.body.status.should.be.eq( 'failed' );
        done();
      })
  })
});

describe("PATCH /passwords/id", () => {
  //update password by correct id 
  it(" Shoul update  the password for authorised existing user by correct id", (done) => {
    
    chai.request(server)
      .patch("/api/password/"+correctid)
      .set('cookie', 'auth_token' + token)
      .send(updatesecret)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.status.should.be.eq( 'success' );
        response.body.message.should.be.eq( 'updated secret' );
       done();
      })
  })

  //not update password for wrong id
  it(" Should not update the passwords for existing user wrong id\n", (done) => {
    chai.request(server)
      .patch("/api/password/"+ wrongid)
      .send(updatesecret)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
       response.should.have.status(400);
       response.body.status.should.be.eq( 'failed' );
        done();
      })
     
  })
 
});


describe("DELETE /passwords/id", () => {
  //get password by correct id 
  it(" Shoul DELETE  the passwords for authorised existing user by correct id", (done) => {
    
    chai.request(server)
      .delete("/api/password/"+correctid)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.status.should.be.eq( 'success' );
        response.body.message.should.be.eq( 'deleted secret' );
       done();
      })
  })

  //not get password for wrong id
  it(" Should not DELETE the passwords for existing user wrong id\n", (done) => {
    chai.request(server)
      .delete("/api/password/"+wrongid)
      .set('cookie', 'auth_token' + token)
      .end((err, response) => {
       response.should.have.status(400);
       response.body.status.should.be.eq( 'failed' );
        done();
      })
  })
  
});

describe("Get /passwords for null values", () => {
    //message showing no password found for the user
    it(" Shoul show the message for null password for a user\n", (done) => {
      
      chai.request(server)
        .get("/api/password")
        .set('cookie', 'auth_token' + token)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.status.should.be.eq( 'success' );
          response.body.message.should.be.eq( 'No passwords found' );
          
         done();
        })
    })
  
    
    
    
  });

  describe("Get /passwords/delete-account", () => {
    //message showing no password found for the user
    it(" Shoul \delete the account of the existing  user\n", (done) => {
      
      chai.request(server)
        .get("/api/password/delete-account")
        .set('cookie', 'auth_token' + token)
        .end((err, response) => {
          response.should.have.status(200);
         
          
         done();
        })
    })
  
  });



  

})
