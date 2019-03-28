// mongoose to check for password, email, etc match to the local
const LocalStrategy = require('passport-local').Strategy,
			mongoose = require('mongoose'),
			bcrypt = require('bcryptjs');

const User = require('../models/User');

// passport is passed in from app.js
module.exports = function(passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
			// first, match the user
			User.findOne({ email: email })
				.then(user => {
					if(!user) {
						return done(null, false, { message: 'That email is not registered' });
					}
					// Match password using bcrypt - user.password is the hashed passowrd, password is the plaintext
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if(err) throw err;
						if(isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {
								message: 'Incorrect password'
							})
						}
					})
				})
				.catch(err => console.log(err));
		})
	);

		// serialize/deserialize - if auth succeeds, a session is established and maintaineed via a cookie set in the user's browser. Therefore, subsequent requests wil not contain credentials but rather the unique cookie to identify the session. Passport handles this serialize and deserialization of the user instance to/from the session.

		passport.serializeUser((user, done) => {
			done(null, user.id);
		});

		passport.deserializeUser((id, done) => {
			User.findById(id, (err, user) => {
				done(err, user);
			})
		})
}
