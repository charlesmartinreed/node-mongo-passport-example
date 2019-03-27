const express = require('express'),
			app = express()
			port = process.env.PORT || 5000;

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, console.log(`Server started on port ${port}`));
