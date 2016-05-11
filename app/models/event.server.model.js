var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var EventSchema = new Schema({
	name : String,	
	startdt:{
		type: Date,
		default: Date.now
	},
	enddt:{
		type: Date,
		default: Date.now
	},	
	desc:String,
	city :String,
	state : String,
	pincode : String,		
	address : String,
	email :String,
	phone :String			
});

mongoose.model('Event', EventSchema);