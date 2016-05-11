var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	require('../app/models/user.server.model');
	require('../app/models/bloodrequest.server.model');
	require('../app/models/bg.server.model');
	require('../app/models/bloodbank.server.model');
	require('../app/models/city.server.model');
	require('../app/models/state.server.model');
	require('../app/models/event.server.model');

	return db;
};