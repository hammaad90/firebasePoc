const express 				= require('express');
const bodyParser 			= require('body-parser');
const router  				= express.Router();
const firebaseController = require('../controller/firebaseController')


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.use(function(error, req,res, next) {
	if(error) {
		res.send('invalid json');
	}
})



router.post('/createUser', firebaseController.createUser);

router.get('/getAllUser', firebaseController.getAllUser);

router.post('/login', firebaseController.login);

router.post('/db', firebaseController.createDB)




module.exports = router;