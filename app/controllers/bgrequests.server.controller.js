var mongoose = require('mongoose'),
	BgRequest = mongoose.model('BgRequest');
	
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.renderBgRequest = function(req,res){	
	res.render('bgrequest',{
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
