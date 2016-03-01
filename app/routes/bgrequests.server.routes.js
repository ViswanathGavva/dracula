var users = require('../../app/controllers/users.server.controller'),
	bgrequests = require('../../app/controllers/bgrequests.server.controller');

module.exports = function(app) {
	app.route('/bgrequest')
	.get(bgrequests.renderBgRequest);
	//.post();
};	
