// isAuthenticated() is provided by passport
// we add this export to any route that we wish to be protected behind authentication

module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		req.flash('error_msg', 'Please log in to view this resource');
		res.redirect('/users/login');
	}
}
