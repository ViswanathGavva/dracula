var mongoose = require('mongoose'),		
	logger = require('../../config/logger'),
	ds = require('../../app/services/dataservices.server.service'),
    Bg = mongoose.model('Bg'),
	State = mongoose.model('State'),
	City = mongoose.model('City'),
	Event = mongoose.model('Event');	


var getErrorMessage = function(err) {
	var message = '';
	var field ='';
	var collection ='';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				if(err.errmsg.search('dracula.states')>=0){
					collection = 'state';
					if(err.errmsg.search('name_1')>=0){
					field ='Name';
					}
				}
				else if(err.errmsg.search('dracula.cities')>=0){
					collection = 'city';
					if(err.errmsg.search('name_1')>=0){
					field ='Name';
					}
				}				
				else{
					collection='states';
					field ='Name';
				}
				
				message = collection+' already exists with '+field;
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

exports.renderAdminConsole = function(req,res){
	res.render('admin',{
				user: req.user ? req.user.username : '',
				title: 'Admin Console',
				validateErrorMessages: req.flash('validationError'),				
				messages: req.flash('info')	,
				errors: req.flash('error')
			});
};

/*
	States APIs
*/
exports.listStates = function(req,res){
	ds.getStates(req,res,function(err){
		if(err){
	 		//log the error and redirect to error controller
	 		logger.error('Error in get states data',err);
	 		res.redirect('/error');
		}
		res.json(req.states);
		//res.end();
	});
};

exports.stateByID = function(req, res, next) {
var id = req.params.stateId;

	State.findOne({
			_id: id
		},
		function(err, state) {
			if (err) {
				logger.error(err);
				return next(err);
			}
			else {
				res.json(state);
			}
		}
	);
};

exports.createState = function(req, res, next) {
	var state = new State(req.body);
	state.save(function(err) {
		if (err) {
			logger.error(err);
			var errmsg = getErrorMessage(err);
			res.status(500).json({"message":errmsg});
			//return next(err);
		}
		else {
			res.json(state);
		}
	});
};

exports.deleteState = function(req, res, next) {
	var id = req.params.stateId;
	State.findByIdAndRemove(id,function(err,state) {
		if (err) {
			logger.error(err);
			return next(err);
		}
		else {
				res.status(200).json(state);
			}	
	});
};

exports.updateState = function(req, res, next) {
	State.findByIdAndUpdate(req.params.stateId, req.body, function(err, state) {
		if (err) {
			return next(err);
		}
		else {
			res.json(state);
		}
	});
};


/*
	City APIs
*/
exports.listCities = function(req,res){
	ds.getCities(req,res,function(err){
		if(err){
	 		//log the error and redirect to error controller
	 		logger.error('Error in get cities data',err);
	 		res.redirect('/error');
		}
		res.json(req.cities);
		res.end();
	});
};

exports.cityByID = function(req,res,next){
	var id = req.params.cityId;
	City.findOne({
			_id: id
		},
		function(err, city) {
			if (err) {
				logger.error(err);
				return next(err);
			}
			else {
				res.json(city);
			}
		}
	);
};


exports.createCity = function(req, res, next) {
	var city = new City(req.body);
	city.save(function(err) {
		if (err) {
			logger.error(err);
			var errmsg = getErrorMessage(err);
			res.status(500).json({"msg":errmsg});
		}
		else {
			res.json(city);
		}
	});
};

exports.updateCity = function(req, res, next) {
	City.findByIdAndUpdate(req.params.cityId, req.body, function(err, city) {
		if (err) {
			return next(err);
		}
		else {
			res.json(city);
		}
	});
};

exports.deleteCity = function(req, res, next) {
	var id = req.params.cityId;
	City.findByIdAndRemove(id,function(err,city) {
		if (err) {
			logger.error(err);
			return next(err);
		}
		else {
				res.status(200).json(city);
			}	
	});
};


/*
	Event APIs
*/
exports.listEvents = function(req,res){

	ds.getEvents(function(err,events){
		if(err){
	 		//log the error and redirect to error controller
	 		logger.error('Error in get cities data',err);
	 		var errmsg = getErrorMessage(err);
	 		res.status(500).json({"msg":errmsg});
		}
		res.json(events);
		res.end();
	});
};

exports.eventById = function(req,res,next){
	var id = req.params.eventId;
	Event.findOne({
			_id: id
		},
		function(err, event) {
			if (err) {
				logger.error(err);
				return next(err);
			}
			else {
				res.json(event);
			}
		}
	);

}


exports.createEvent = function(req, res, next) {
	var event = new Event(req.body);
	event.save(function(err) {
		if (err) {
			logger.error(err);
			var errmsg = getErrorMessage(err);
			res.status(500).json({"msg":errmsg});
		}
		else {
			res.json(event);
		}
	});
};

exports.deleteEvent = function(req, res, next){
	var id = req.params.eventId;
	Event.findByIdAndRemove(id,function(err,event) {
		if (err) {
			logger.error(err);
			return next(err);
		}
		else {
				res.status(200).json(event);
			}	
	});
}

exports.updateEvent = function(req, res, next) {
	Event.findByIdAndUpdate(req.params.eventId, req.body, function(err, event) {
		if (err) {
			return next(err);
		}
		else {
			res.json(event);
		}
	});
};




