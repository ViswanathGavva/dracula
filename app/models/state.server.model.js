var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var StateSchema = new Schema({
	name : String

});	
mongoose.model('State', StateSchema);