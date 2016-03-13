var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		var formdata= req.session.formdata ? req.session.formdata:'';
		delete req.session.formdata;
		res.render('login', {
			title: 'Log-in Form',
			loginmessages: req.flash('error') || req.flash('info'),
			saveErrorMessages: req.flash('saveError'),
			validateErrorMessages: req.flash('validationError'),
			formdata: formdata

		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	console.log(req.body);
	if (!req.user) {
		console.log(req.session);
		var formdata= req.session.formdata ? req.session.formdata:'';
		delete req.session.formdata;

		res.render('register', {
			title: 'Register Form',
			saveErrorMessages: req.flash('saveError'),
			validateErrorMessages: req.flash('validationError'),
			formdata: formdata
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.register = function(req, res, next) {
	if (!req.user) {
			delete req.session.formdata;
		   req.checkBody({
		  'name': {
		  	notEmpty: true,
		  	errorMessage: 'Name is required'
		  },
		  'password': {
		    notEmpty: true,
		    errorMessage: 'Password must not be Null' // Error message for the parameter
		  }
		  });
		  req.checkBody('username','Enter Valid username').notEmpty();
		  req.checkBody('username','Enter Valid username').optional({checkFalsy:true}).isAlphanumeric(['en-US']);
		  req.checkBody('password','Enter Valid password.Password must be between 6 and 20 characters').optional({checkFalsy:true}).len(6, 20);
		  req.checkBody('email','Email is required').notEmpty();
		  req.checkBody('email','Enter Valid Email').optional({checkFalsy:true}).isEmail();
		  req.checkBody('phone','Enter Valid Phone').optional({checkFalsy:true}).isPhone();

		  // check the validation object for errors
		  var errors = req.validationErrors();

		  //console.log(errors);

		  if (errors) {
		    req.flash('validationError', errors);
				req.session.formdata=req.body;
		    return res.redirect('/register');
				/*res.render('register',{
					title: 'Register Form',
					messages: errors,
					validated:req.body
				});*/

			//	res.json(errors);
		  }
		else{

	   /*Viswa added*/
	  	var user = new User(req.body);
		  var message = null;
		  user.provider = 'local';

			user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('saveError', message);
				req.session.formdata=req.body;
				return res.redirect('/register');
			}



			req.login(user, function(err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
	  }
}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
			provider: profile.provider,
			providerId: profile.providerId
		},
		function(err, user) {
			if (err) {
				return done(err);
			}
			else {
				if (!user) {
					var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						profile.username = availableUsername;
						user = new User(profile);

						user.save(function(err) {
							if (err) {
								var message = _this.getErrorMessage(err);
								req.flash('error', message);
								return res.redirect('/register');
							}

							return done(err, user);
						});
					});
				}
				else {
					return done(err, user);
				}
			}
		}
	);
};



exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		},
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	})
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};

exports.renderProfile = function(req, res) {
	if (!req.user) {
		res.render('login', {
			title: 'Sign in Form',
			messages: req.flash('error') || req.flash('Please sign in')
		});
	}
	else {
		res.render('profile', {
		    user: req.user ? req.user.username : '',
			title: 'Profile Form',
			name: req.user.name,
			email:req.user.email,
			phone:req.user.phone,
			username:req.user.username,
			password:req.user.password,
			bloodgroup:req.user.donorProfile.bloodgroup,
			lastdonation:req.user.donorProfile.lastdonation,
			donations:req.user.donorProfile.donations,
			messages: req.flash('error')
		});
	}
};

exports.saveProfile = function(req,res,next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};
