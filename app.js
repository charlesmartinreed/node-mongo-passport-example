const express = require('express'),
			expressLayouts = require('express-ejs-layouts'),
			app = express(),
			port = process.env.PORT || 5000;

// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, console.log(`Server started on port ${port}`));
