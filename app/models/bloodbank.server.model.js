var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var BloodbankSchema = new Schema({
	name : String,	
	address : String,
	city :String,
	state : String,
	pincode : String,		
	email :String,
	phone :String			
});

mongoose.model('BloodBank', BloodbankSchema);