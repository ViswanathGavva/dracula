var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var BloodreqSchema = new Schema({
	creator: String,
	opendate: {
		type: Date,
		default: Date.now
	},
	reqData: {
		bloodgroup: String,
		patientdata: {
		name: String,
		age: String
		},
		location: {
			city: String,
			state: String,
			area: String,
			pincode: String
		},
		hospital: String
	},
	closedate: {
		type: Date,
		default: Date.now
	}
	
});

mongoose.model('BloodRequest', BloodreqSchema);