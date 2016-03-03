var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;
var StateSchema = new Schema({
	name : String

});	
mongoose.model('State', StateSchema);