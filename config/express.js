var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
	validator = require('express-validator');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	//Added by Viswa
	app.use(validator({
	 customValidators: {
	    isArray: function(value) {
	        return Array.isArray(value);
	    },	    
	    isPhone: function(value){
	     if (value.length > 0) {
	     return value.match(/\d/g).length===10;
	     }
	     else{
	     return true;
	     }
	    }
	 }
	}
	
	));
	//Added by Viswa

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/bloodrequest.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};