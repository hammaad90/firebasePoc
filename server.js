const express = require('express');
const app = express();
const routes = require('./route/route');
const admin = require('firebase-admin')
const firebaseConfig = require('./config/config');
const cookieParser = require("cookie-parser");


app.set('view engine', 'pug')
app.set('views', 'views')

app.use('/api', routes)
app.use(cookieParser());
// nodejs firebase server side sdk
firebaseConfig.startFireBase();

// nodejs firebase client side sdk
firebaseConfig.startFireBaseWithApi();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});


app.get('/savecookie', async (req, res) => {
	const Idtoken = req.query.idToken;
	let userInfo = await admin.auth().verifyIdToken(Idtoken);
	return res.json({info: 'success', userInfo: userInfo})
	// res.render('./views/index', userInfo);
});

const server = app.listen(3000, function () {
	console.log("Server is running on port 3000");
});
