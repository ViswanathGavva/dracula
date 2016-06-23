var mongoose = require('mongoose'),	
	BloodBank = mongoose.model('BloodBank'),
	logger = require('../../config/logger')
	ds = require('../../app/services/dataservices.server.service');

/*var getBloodbanks = function(req,res,next){
	var state=req.body.state,
		city=req.body.city,
		area=req.body.area;
	BloodBank.find({})
//		.and([{'area':area},{'city':city},{'state':state}])
		.exec(function(err,bbs){
		if(err){
			//log the error and redirect to error controller
			logger.error('Error in get blood bank data',err);
			return next(err);
		}
		else
		{
			req.bloodbanks=bbs;
			next();
		}
		});
	
}*/

exports.renderBloodbanks = function(req,res){
ds.getStates(req,res,function(err){
	if(err){
	 	//log the error and redirect to error controller
	 	logger.error('Error in get states data',err);
	 	res.redirect('/error');
	}
	ds.getCities(req,res,function(err){
		if(err){
			//log the error and redirect to error controller
			logger.error('Error in get Cities data',err);
			res.redirect('/error');
		
		}
		ds.getBloodbanks(function(err,bloodbanks){
			if(err){
			//log the error and redirect to error controller
			logger.error('Error in get Bloodbank data',err);
			res.redirect('/error');
			}
			var formdata= req.session.formdata ? req.session.formdata:'';
			var focusele = req.session.focusele ? req.session.focusele:'state';		
			delete req.session.formdata;
			delete req.session.focusele;
			res.render('bloodbank',{
				user: req.user ? req.user.username : '',
				title: 'Blood banks',
				validateErrorMessages: req.flash('validationError'),
				formdata: formdata,
				focusele: focusele,				
				states: req.states,
				cities: req.cities,
				bloodbanks:bloodbanks,
				messages: req.flash('info')	,
				errors: req.flash('error')
			});		
		});//End getbloodbanks.

		
	});//End getcities.
});//End getstates.
};	

//Admin CRUD APIs

exports.listBloodbanks = function(req,res){
	ds.getBloodbanks(function(err,bbs){
		if(err){
	 		//log the error and redirect to error controller
	 		logger.error('Error in get blood banks data',err);
	 		res.status(500).json({"msg":errmsg});
		}
		res.json(bbs);
		res.end();
	});
};

exports.updateBloodbank = function(req,res,next){
	BloodBank.findByIdAndUpdate(req.params.bloodbankId,req.body,function(err,bb){
		if(err){
			return next(err);
		}else{
			res.json(bb);
		}
	});
	
}

exports.deleteBloodbank = function(req,res,next){
	BloodBank.findByIdAndDelete(req.params.bloodbankId,req.body,function(err,bb){
		if(err){
			return next(err);
		}else{
			res.json(bb);
		}
	});
	
}

exports.createBloodbank = function(req,res,next){
	var bb= new BloodBank(req.body);
	bb.save(function(err) {
		if (err) {
			logger.error(err);
			var errmsg = getErrorMessage(err);
			res.status(500).json({"msg":errmsg});
		}
		else {
			res.json(bb);
		}
	});
}

exports.BloodbankById = function(req,res,next){
	var id = req.params.bloodbankId;
	BloodBank.findOne({
			_id: id
		},
		function(err, bb) {
			if (err) {
				logger.error(err);
				return next(err);
			}
			else {
				res.json(bb);
			}
		}
	);
}