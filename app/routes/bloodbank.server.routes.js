var bloodbank = require('../../app/controllers/bloodbank.server.controller'),
	ds =  require('../../app/services/dataservices.server.service');	
module.exports = function(app) {
	app.route('/bloodbank')
		.get(bloodbank.renderBloodbanks);
	app.route('/searchbloodbank')	
    	.post(bloodbank.renderBloodbanks);
};