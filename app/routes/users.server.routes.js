var users = require('../../app/controllers/users.server.controller'),
	error = require('../../app/controllers/error.server.controller'),
	passport = require('passport');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function(app) {
	app.route('/users').post(users.create).get(users.list);

	app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

	app.param('userId', users.userByID);

	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);

	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.get('/logout', users.logout);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope:['email']
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/login',
		successRedirect: '/',
		scope:['email']
	}));

	app.get('/oauth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/login'
	}));

	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/login',
		successRedirect: '/'
	}));
	
	app.route('/profile')
		.get(users.renderProfile)
		.post(users.requiresLogin,users.saveProfile);
	/*app.post('/upload', multipartMiddleware, function(req, resp) {
		  console.log(req.body, req.files);
		  // don't forget to delete all req.files when done
		});*/
	app.route('/uploadprofilepic')
		.post(multipartMiddleware,users.requiresLogin,users.uploadProfilePic);
	
	app.route('/error')
	.get(error.renderErrorPage);
	
	app.route('/getCities/:stateName')
	.get(users.listCities);
	app.param('stateName', users.stateByName);
};