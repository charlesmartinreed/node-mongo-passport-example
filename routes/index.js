const express = require('express'),
			router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
	//ejs is handling our template creation here, with some assistance from express via express-ejs-layouts
	res.render('welcome');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
	res.render('dashboard', {
		name: req.user.name
	});
})

module.exports = router;
