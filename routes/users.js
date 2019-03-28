const express = require('express'),
			router = express.Router(),
			bcrypt = require('bcryptjs'),
			passport = require('passport');

// User model
const User = require('../models/User');

// LOGIN PAGE
router.get('/login', (req, res) => {
	res.render('login');
})

router.get('/register', (req, res) => {
	res.render('register');
})

// handing registration
router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body;

	let errors = [];

	// Check required fields
	if(!name || !email || !password || !password2) {
		errors.push({
			msg: 'Please fill in all fields'
		});
	}

	// Check passwords match
	if(password !== password2) {
		errors.push({
			msg: 'Sorry, your passwords do not match'
		});
	}

	// Check password length
	if(password.length < 6) {
		errors.push({
			msg: 'Password should be at least 6 characters'
		});
	}

	if(errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		// if validation passes
		User.findOne({ email: email })
			.then(user => {
				if(user) {
					errors.push({msg: 'Email is already registered!'})
					//re-render register form, send along error that user exists
					res.render('register', {
						errors,
						name,
						email,
						password,
						password2
					});
				} else {
					// if no user, create one, encrypt the password
					const newUser = new User({
						name,
						email,
						password
					});

					// hashing password with bcrypt
					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) throw err;
							// set password to hash
							newUser.password = hash;
							// save the user
							newUser.save()
								.then(user => {
									req.flash('success_msg', 'Thanks for registering 😄 Please log in below.');
									res.redirect('/users/login');
								})
								.catch(err => console.log(err));
					}))
				}
			});
	}
});

// Handling Logins
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
});

// Handling Logouts
router.get('/logout', (req, res) => {
	req.logout(); //courtesy of passport
	req.flash('success_msg', 'You are now logged out');
	res.redirect('/users/login')
})

module.exports = router;
