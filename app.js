const express = require('express'),
			expressLayouts = require('express-ejs-layouts'),
			app = express(),
			port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

// DB Config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser setup - included in express now
app.use(express.urlencoded({ extended: false}))

// express session Middleware
app.use(
	session({
	  secret: 'secret',
	  resave: true,
	  saveUninitialized: true,
	})
);

// connect flash middleware
app.use(flash());

// Global vars, used for colorizing success/failure messages, created with custom middleware
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, console.log(`Server started on port ${port}`));
