const express = require('express');
const app = express();
const routes = require('./route/route');
const admin = require('firebase-admin')
const firebaseConfig = require('./config/config');
const cookieParser = require("cookie-parser");

app.use('/api', routes)
app.use(cookieParser());
// nodejs firebase server side sdk
firebaseConfig.startFireBase();

// nodejs firebase client side sdk
firebaseConfig.startFireBaseWithApi();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});

app.get('/success', checkCookie, (req, res) => {
	res.sendFile(__dirname + '/success.html');
	console.log("UID of Signed in User is" + req.decodedClaims.uid);
	//You will reach here only if session is working Fine
});

app.get('/savecookie', (req, res) => {
	const Idtoken = req.query.idToken;
	savecookie(Idtoken, res);
});

function savecookie(idtoken, res) {

	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	admin.auth().createSessionCookie(idtoken, { expiresIn })
		.then(async (sessionCookie) => {
			const options = { maxAge: expiresIn, httpOnly: true, secure: true };
			res.cookie('__session', sessionCookie, options);
			await res.end(JSON.stringify({ sessionCookie }));
			admin.auth().verifyIdToken(idtoken).then(function (decodedClaims) {
				res.redirect('/success');
			});

		}, error => {
			console.log(error);
			res.status(401).send("UnAuthorised Request");

		});
}


function checkCookie(req, res, next) {


	const sessionCookie = req.cookies.__session || '';
	admin.auth().verifySessionCookie(
		sessionCookie, true).then((decodedClaims) => {
			res.end(JSON.stringify({ decodedClaims }));
			req.decodedClaims = decodedClaims;
			next();
		})
		.catch(error => {
			console.log('errr', error)
			// Session cookie is unavailable or invalid. Force user to login.
			res.redirect('/login');
		});

}


const server = app.listen(3000, function () {
	console.log("Server is running on port 3000");
});
