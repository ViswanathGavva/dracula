var User = require('mongoose').model('User'),
	Bg = require('mongoose').model('Bg'),
	State = require('mongoose').model('State'),
	City = require('mongoose').model('City'),
	passport = require('passport'),
	fs = require('fs');;

var getErrorMessage = function(err) {
	var message = '';
	var field ='';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				if(err.errmsg.search('username')>=0){
					field ='Username';
				}
				else if(err.errmsg.search('email')>=0){
					field ='Email';
				}
				else if(err.errmsg.search('phone')>=0){
					field ='Phone number';
				}
				else{
					field ='Username';
				}
				
				message = field+' already exists';
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
		var focusele = req.session.focusele ? req.session.focusele:'';		
		delete req.session.formdata;
		delete req.session.focusele;
		res.render('login', {
			title: 'Log-in Form',
			loginmessages: req.flash('error') || req.flash('info'),
			saveErrorMessages: req.flash('saveError'),
			validateErrorMessages: req.flash('validationError'),
			formdata: formdata,
			focusele: focusele

		});
	}
	else {
		return res.redirect('/');
	}
};

var getBgs = function(req,res,next){	
	Bg.find({},function(err,bgs){
		
		if( err) {						
			return next(err);
		}else{			
			req.Bgs=bgs;			
			next();
		}
	});
};

var getStates = function(req,res,next){
	State.find({},function(err,states){
		if(err){
			return next(err);
		}else{
			req.states=states;
			next();
		}
			
	});
};

var getCities = function(req,res,next){
	City.find({},function(err,cities){
		if(err){
			return next(err);
		}else{
			req.cities=cities;
			next();
		}
			
	});
};

exports.listCities = function(req, res) {
	//console.log(req.state._id);
	City.find({"state":req.state._id},function(err,cities){
	if(err){
		 res.json(err);
	}else{
		res.json(cities);
	}
	});
	
};


exports.stateByName = function(req, res, next, name) {
	State.findOne({
			name: name
		},
		function(err, state) {
			if (err) {
				return next(err);
			}
			else {
				req.state = state;
				next();
			}
		}
	);
};

exports.renderRegister = function(req, res, next) {
	
	if (!req.user) {		
		getBgs(req,res,function(err){
			if(err){
				return res.redirect('/error');
			}
			getStates(req,res,function(err){
				if(err){
					return res.redirect('/error');
				}
				getCities(req,res,function(err){
					if(err){
						return res.redirect('/error');
					}
					var formdata= req.session.formdata ? req.session.formdata:'';
					var focusele = req.session.focusele ? req.session.focusele:'name';		
					delete req.session.formdata;
					delete req.session.focusele;
					//console.log(formdata);
					res.render('register', {
						title: 'Register Form',
						saveErrorMessages: req.flash('saveError'),
						validateErrorMessages: req.flash('validationError'),
						formdata: formdata,
						focusele: focusele,
						bgs: req.Bgs,
						states: req.states,
						cities:req.cities
					});
				});//getCities End
								
				
			});//getStates End.
			
			
		});//getBgs End.
		//TODO: This is called callback HELL. Need to use Async module OR promises here.
		
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
		  //console.log(errors);
		    req.flash('validationError', errors);
		    //console.log(req.body);
				req.session.formdata=req.body;
				req.session.focusele=errors[0].param;
		    return res.redirect('/register');				
		  }
		else{

	   /*Viswa added*/
	  	var user = new User(req.body);
		  var message = null;
		  user.provider = 'local';

			user.save(function(err) {
			if (err) {
				//console.log(err);
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



/*exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};*/

/*exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};*/

/*exports.read = function(req, res) {
	res.json(req.user);
};*/

/*exports.userByID = function(req, res, next, id) {
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
};*/

/*exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};*/

/*exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	})
};*/

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
		
		getBgs(req,res,function(err){
			if(err){
				return res.redirect('/error');
			}
			getStates(req,res,function(err){
				if(err){
					return res.redirect('/error');
				}
				getCities(req,res,function(err){
					if(err){
						return res.redirect('/error');
					}
					//console.log(req.user);
					res.render('profile', {
					    user: req.user ? req.user.username : '',
						title: 'Profile Form',
						userdata: req.user ? req.user : '',
						cities: req.cities,
						states:req.states,
						bgs:req.Bgs,						
						messages: req.flash('error')
					});
				});//getCities End.
			});//getStatesEnd.
		});//getBgsEnd.
	};
};

exports.saveProfile = function(req,res,next) {
	//console.log(req.body);
	//console.log(req.user);
	req.body['donorProfile.receiveemail'] = (req.body['donorProfile.receiveemail']==='on') ? true:false;
	req.body['donorProfile.receivesms'] = (req.body['donorProfile.receivesms']==='on') ? true:false;
	req.body['donorProfile.shareemail'] = (req.body['donorProfile.shareemail']==='on') ? true:false;
	req.body['donorProfile.sharephone'] = (req.body['donorProfile.sharephone']==='on') ? true:false;
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			var message = getErrorMessage(err);
			var user = new User(req.body);
			req.flash('error', message);
			req.user=user;
			return res.redirect('/profile');
		}
		else {
			req.flash('error', 'Changes saved successfully!');
			return res.redirect('/profile');
			//res.json(user);
		}
	});
};

exports.uploadProfilePic = function(req,res,next){
	console.log(req.files);
	var user_id=req.user.id;
	fs.readFile(req.files.profilepic.path, function (err, data){
		if(err){
    		req.flash('error', 'Error in reading the uploaded file!');
			res.redirect('/profile');	        		
    	}
		var imageName = req.files.profilepic.name;
		var imagetype = req.files.profilepic.name.split('.')[1];
		if(!imageName){
		      req.flash('error',"There was an error")
		      res.redirect("/profile");
		      res.end();
		    } else {
		    	var newPath = __dirname + "/../../public/img/uploads/profilepics/"+user_id + "."+imagetype;	
		    	
		        fs.writeFile(newPath, data, function (err) {
		        	if(err){
		        		req.flash('error', 'Error in uploading!');
		    			res.redirect('/profile');
		    			res.end();
		        	}
		          // let's save it
		        	User.findByIdAndUpdate(req.user.id, {'profilepic':user_id + "."+imagetype}, function(err, user) {
		        		if(err){
		        			req.flash('error',"There was an error while saving");
		        			res.redirect('/profile');
			    			res.end();			    		
		        		}
		        		//saved successfully.
		        		
		        	});//findbyIdandUpdate End.
		        });//WriteFile End.
		    };
	});//ReadFile end.
	
	//Remove all the temp files.
	fs.unlink(req.files.profilepic.path,function(err){
		if(err){
			console.log('Error whule deleting temp file');
		}
	});//unlink End.
	return res.redirect('/profile');
};
