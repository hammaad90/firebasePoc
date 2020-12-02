const  admin = require('firebase-admin')
const fb = require('firebase');
const bcrypt = require('bcrypt');

const createUser =  async function(req, res) {
    try {
       // through nodejs client sdk
      let user = await fb.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
       // through nodejs server side sdk
      // let encryptedPassword =  await bcrypt.hashSync(req.body.password, 8); 
      // let user =  await admin.auth().createUser({email: req.body.email, password: encryptedPassword})
      return res
      .json({info: 'user created', user: user})
    } catch (e) {
      console.log(e)
     res.json({message:'Error creating user'})
    }

  }


  const getAllUser =  async function(req, res) {
    try {

      let users = await admin.auth().listUsers();
      return res
              .json({user: users})
    } catch (e) {
      console.log(e)
     res.json({message:'Error gettting user'})
    }

  }

  const login =  async function(req, res) {
    let result;
    try {
       // through nodejs server side sdk
      // let userfromEmail = await admin.auth().getUserByEmail(req.body.email);
      // let token = await admin.auth().createCustomToken(req.body.email)
      // if (token) {
      //   result = token;
      // }

         // through nodejs client sdk
      let user = await await fb.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
      if (user) {
        result  = user;
      }
      return res
        .json(result)
    } catch (e) {
      console.log(e)
     res.json({message:'Error login!!'})
    }

  }

  const createDB =  async function(req, res) {
    try {
      const db = admin.firestore();
      const usersDb = db.collection('users'); 
      await usersDb.doc('Test').set({
        first: req.body.firstName,
        last: req.body.lastName,
        address: req.body.address,
        age: req.body.age
       });
       // get collection
     // const users = await db.collection('users').get();

    // get document
      const doc = await db.collection('users').doc('Test');
      const result = await doc.get();
      if (!result.exists) {
        return res
        .json('No Such Document');
      } else {
        return res
        .json(result.data())
      }
     
    } catch (e) {
      console.log(e)
     res.json({message:'Error gettting user'})
    }

  }


  
  module.exports = {
    createUser,
    getAllUser,
    login,
    createDB
  };