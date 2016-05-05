var index = require('../controllers/index.server.controller'),
	bloodrequest = require('../controllers/bloodrequest.server.controller');
	
module.exports = function(app) {
	app.route('/')
		.get(index.renderIndex);
	app.route('/searchDonors')	
    	.post(bloodrequest.renderDonorSearchResults);
};