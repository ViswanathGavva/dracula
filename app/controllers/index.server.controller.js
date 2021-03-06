var User = require('mongoose').model('User'),
	Bg = require('mongoose').model('Bg'),
	State = require('mongoose').model('State'),
	City = require('mongoose').model('City'),
	passport = require('passport'),
	ds = require('../../app/services/dataservices.server.service'),
	fs = require('fs');
	logger = require('../../config/logger');
exports.renderIndex = function(req, res) {
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
							logger.error(err);
							res.redirect('/');
							res.end();
						}
						else{	
							ds.getEvents(function(err,events){
								if(err){
									logger.error(err);
									res.redirect('/');
									res.end();
								}
								var formdata= req.session.formdata ? req.session.formdata:'';
								var focusele = req.session.focusele ? req.session.focusele:'p_bg';		
								delete req.session.formdata;
								delete req.session.focusele;
									
								res.render('index', {
						    	title: 'DRACULA',
						    	user: req.user ? req.user.username : '',
						    	formdata: formdata,
								focusele: focusele,
								bgs: req.Bgs,
								states: req.states,
								cities:req.cities,
								events:events,
								messages: req.flash('error') || req.flash('info')
						    	});

							});//End getEvents.											
							
							
						}
					});//End getCities.
				}
			});//End getState.
		}
	});//End GetBgs.					
						
						
};