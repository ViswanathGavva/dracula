var mongoose = require('mongoose'),
	User = require('mongoose').model('User'),
	users = require('../../app/controllers/users.server.controller'),
	BloodRequest = mongoose.model('BloodRequest'),
	ds = require('../../app/services/dataservices.server.service'),
	logger = require('../../config/logger'),
	transporter = require('../../config/transporter');
	
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
							var focusele = req.session.focusele ? req.session.focusele:'bloodgroup';		
							delete req.session.formdata;
							delete req.session.focusele;	
							res.render('bloodrequest',{
							user: req.user ? req.user.username : '',
							title: 'Submit Request',
							validateErrorMessages: req.flash('validationError'),
							formdata: formdata,
							focusele: focusele,
							bgs: req.Bgs,
							states: req.states,
							cities:req.cities,
							messages: req.flash('info')	,
							errors: req.flash('error')
							});
						}
					});//End GetCities.		
				}
			});//End getStates.
		}
	});//End getBgs.
	//return res.redirect('/');
};

var getDonors = function(req,res,next){
	var bg=req.body.pbg,
		city=req.body.pcity,
		state=req.body.pstate;
		
	var query = User.find({'donorProfile.bloodgroup':bg,
						   'role':'Donor'});
		
		query.and([
				{
	 			$or:[
	 				{'curlocation.city':city},
	 				{'hometown.city':city},
	 				{'officelocation.city':city}
	 	 			]
				}	
				]);
		query.and([
				{
	 			$or:[
	 				{'curlocation.state':state},
	 				{'hometown.state':state},
	 				{'officelocation.state':state}
	 	 			]
				}	
				]);		
		
		
	if(req.body.parea){
		query.and([
				{
	 			$or:[
	 				{'curlocation.area':req.body.parea},
	 				{'hometown.area':req.body.parea},
	 				{'officelocation.area':req.body.parea}
	 	 			]
				}	
				]);	
	}
							

	
	query.exec(function(err,donors){
	
		if( err || donors.length <= 0 ){		
			return next({'err':'No donors'});
		}
		else{
			//set phone and email based on donor preferences
			for(var key in donors){
			donors[key].phone = donors[key].donorProfile.sharephone ? donors[key].phone : 'Hidden';
			donors[key].email = donors[key].donorProfile.shareemail ? donors[key].email : 'Hidden';
			}
			req.donors=donors;
			next();
		}
	});//end User.find.
};

exports.renderDonorSearchResults = function(req,res){

if(!req.body.pbg || !req.body.pcity)
{
	req.flash('error','Bloodgroup and City are mandatory');
	req.session.formdata=req.body;
	req.session.focusele='p_bg';
	res.redirect('/');
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
			res.render('donorsearchresults', {
    			title: 'DRACULA',
    			user: req.user ? req.user.username : '',
    			donors: req.donors,
    			scity:req.body.pcity ? req.body.pcity : '',
    			sstate:req.body.pstate ? req.body.pstate : '',
    			sarea:req.body.parea ? req.body.parea : '',
    			spin:req.body.ppin ? req.body.ppin : '',
    			messages: req.flash('error') || req.flash('info')
			});
		}
	});//getDonors End;
}
};

exports.saveBloodRequest = function(req,res){
	
	req.checkBody('bloodgroup','BloodGroup is mandatory').notEmpty();	
	req.checkBody('pstate','State').notEmpty();
	req.checkBody('pcity','City is required').notEmpty();
	
	var errors = req.validationErrors();
	if(errors){				
		req.flash('validationError', errors);
		req.session.formdata=req.body;
		req.session.focusele=errors[0].param;
		return res.redirect('/bloodrequest');
	}
	else{
		var BR = new BloodRequest(req.body);
		BR.save(function(err) {
			if(err){
				req.session.formdata=req.body;
				req.flash('error','Error in save request');
				res.redirect('/bloodrequest');
			}
			else{
				req.session.formdata=req.body;
				req.flash('info','Request saved successfully');
				res.redirect('/bloodrequest');
			}
		});
	}

}

exports.sendRequest = function(req,res){
//console.log(transporter); 

var message = {

    // Comma separated list of recipients
    to: '"Receiver Name" <receiver@example.com>',

    // Subject of the message
    subject: 'Nodemailer is unicode friendly', //

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html: '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>'

    /*
    // Apple Watch specific HTML body
    watchHtml: '<b>Hello</b> to myself',*/

    /*// An array of attachments
    attachments: [

        // String attachment
        {
            filename: 'notes.txt',
            content: 'Some notes about this e-mail',
            contentType: 'text/plain' // optional, would be detected from the filename
        },

        // Binary Buffer attachment
        {
            filename: 'image.png',
            content: new Buffer('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),

            cid: 'note@example.com' // should be as unique as possible
        },

        // File Stream attachment
        {
            filename: 'nyan cat ✔.gif',
            path: __dirname + '/assets/nyan.gif',
            cid: 'nyan@example.com' // should be as unique as possible
        }
    ]*/
};

console.log('Sending Mail');

transporter.sendMail(message, function (error, info) {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
});

req.flash('error','Email sent to the Donor');
res.redirect('/');
};