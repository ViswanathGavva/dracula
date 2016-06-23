var Bg = require('mongoose').model('Bg'),
	State = require('mongoose').model('State'),
	City = require('mongoose').model('City'),
	Event = require('mongoose').model('Event'),
	BloodBank = require('mongoose').model('BloodBank'); 

exports.getBgs = function(req,res,next){
Bg.find({},function(err,bgs){
		
		if( err) {						
			return next(err);
		}else{			
			req.Bgs=bgs;			
			next();
		}
	});
};

exports.getStates = function(req,res,next){
	State.find({},function(err,states){
		if(err){
			return next(err);
		}else{
			req.states=states;
			next();
		}
			
	});
};

exports.getCities = function(req,res,next){
	City.find({},function(err,cities){
		if(err){
			return next(err);
		}else{
			req.cities=cities;
			next();
		}
			
	});
};

exports.getEvents = function(next){
	Event.find({},function(err,events){
		if(err){
			return next(err);
		}else{
			return next(null,events);
		}
		
	});
};

exports.getBloodbanks = function(next){	
		BloodBank.find({},function(err,bbs){
		if(err){
			//log the error and redirect to error controller
			logger.error('Error in get blood bank data',err);
			return next(err);
		}
		else
		{
			return next(null,bbs);
		}
		});
};
