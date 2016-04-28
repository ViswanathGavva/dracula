var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;
	
var BloodbankSchema = new Schema({
	name : String,
	hospital : String,
	address : {
	    area : String,
		city : {
			type:Schema.ObjectId,
			ref: 'City'
		},
		state : {
			type:Schema.ObjectId,
			ref: 'State'
		},
		pincode : String
	},
	contactinfo :{
		email :String,
		phone :String		
	}

});

mongoose.model('BloodBank', BloodbankSchema);