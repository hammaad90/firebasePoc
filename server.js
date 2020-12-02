const express 				=  require('express');
const app 					=  express();
const routes  				=  require('./route/route');
const firebaseConfig = require('./config/config');
const { firestore } = require('firebase-admin');

app.use('/api', routes)

// nodejs firebase server side sdk
firebaseConfig.startFireBase();

// nodejs firebase client side sdk
firebaseConfig.startFireBaseWithApi();


const server  = app.listen(3000, function(){
	console.log("Server is running on port 3000");
});
