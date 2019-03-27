const express = require('express'),
			router = express.Router();

// LOGIN PAGE
router.get('/login', (req, res) => {
	res.send('Login here!');
})

router.get('/register', (req, res) => {
	res.send('Register here!');
})

module.exports = router;
