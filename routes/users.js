const express = require('express'),
			router = express.Router();

// LOGIN PAGE
router.get('/login', (req, res) => {
	res.render('login');
})

router.get('/register', (req, res) => {
	res.render('register');
})

module.exports = router;
