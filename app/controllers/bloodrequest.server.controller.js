var mongoose = require('mongoose'),
	BloodRequest = mongoose.model('BloodRequest');
	
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
	res.render('bloodrequest',{
	user: req.user ? req.user.username : '',
	title: 'Submit Request',
	pname:'',
	page:'',
	phospital:'',
	parea:'',
	pcity:'',
	pstate:'',
	ppincode:'',
	messages: req.flash('error') || req.flash('info')	
	});
};
