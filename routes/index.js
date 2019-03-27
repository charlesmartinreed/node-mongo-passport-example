const express = require('express'),
			router = express.Router();

router.get('/', (req, res) => {
	//ejs is handling our template creation here, with some assistance from express via express-ejs-layouts
	res.render('welcome');
})

module.exports = router;
