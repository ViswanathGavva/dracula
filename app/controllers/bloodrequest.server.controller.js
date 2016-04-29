var mongoose = require('mongoose'),
	User = require('mongoose').model('User'),
	users = require('../../app/controllers/users.server.controller'),
	BloodRequest = mongoose.model('BloodRequest'),
	ds = require('../../app/services/dataservices.server.service');
	
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.renderBloodRequest = function(req,res){	
	ds.getBgs(req,res,function(err){
		if(err){
	 		res.redirect('/');
	 		res.end();
		}
		else{
			ds.getStates(req,res,function(err){
				if(err){
					res.redirect('/');
			 		res.end();
				}
				else{
					ds.getCities(req,res,function(err){
						if(err){
							res.redirect('/');
							res.end();
						}
						else{
							var formdata= req.session.formdata ? req.session.formdata:'';
							var focusele = req.session.focusele ? req.session.focusele:'name';		
							delete req.session.formdata;
							delete req.session.focusele;
								
							res.render('bloodrequest',{
							user: req.user ? req.user.username : '',
							title: 'Submit Request',
							formdata: formdata,
							focusele: focusele,
							bgs: req.Bgs,
							states: req.states,
							cities:req.cities,
							messages: req.flash('error') || req.flash('info')	
							});
						}
					});//End GetCities.		
				}
			});//End getStates.
		}
	});//End getBgs.
	return res.redirect('/');
};

var getDonors = function(req,res,next){
	var findreq = {
			'donorProfile.bloodgroup':req.body.pbg
	};
	User.find({'donorProfile.bloodgroup':req.body.pbg},function(err,donors){
	
		if( err || donors.length <= 0 ){		
			return next({'err':'No donors'});
		}
		else{
			req.donors=donors;
			next();
		}
	});//end User.find.
};

exports.renderDonorSearchResults = function(req,res){

if(!req.body.pbg || !req.body.pcity)
{
	req.flash('error','Bloodgroup and City are mandatory');
	res.render('index', {
    	title: 'DRACULA',
    	user: req.user ? req.user.username : '',
    	messages: req.flash('error') || req.flash('info')
	});
}
else
{
	getDonors(req,res,function(err,donors){		
		if(err){	
			req.flash('error','No Results Found');
			req.session.formdata=req.body;
			req.session.focusele='p_bg';
		    return res.redirect('/');	
		}
		else
		{
			console.log(req.donors);
			req.flash('info','Below are the donors with matching bloodgroup');
			res.render('donorsearchresults', {
    			title: 'DRACULA',
    			user: req.user ? req.user.username : '',
    			donors: req.donors,
    			messages: req.flash('error') || req.flash('info')
			});
		}
	});//getDonors End;
}
};