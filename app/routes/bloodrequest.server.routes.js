var users = require('../../app/controllers/users.server.controller'),
	bloodrequest = require('../../app/controllers/bloodrequest.server.controller');	

module.exports = function(app) {
	app.route('/bloodrequest')
	.get(bloodrequest.renderBloodRequest)
	.post(bloodrequest.saveBloodRequest);
	
	app.route('/sendRequest')
	.post(bloodrequest.sendRequest)
	.get(bloodrequest.sendRequest);
	
	app.route('/bloodrequests')
	.get(bloodrequest.getRequests);
};	
