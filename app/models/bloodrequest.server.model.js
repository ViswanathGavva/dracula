var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var BloodreqSchema = new Schema({
	creator: {
		type:String,
		default:'guest'
		},
	opendate: {
		type: Date,
		default: Date.now
	},	
	bloodgroup: String,
	unitsrequired:Number,
	pname: String,
	page: String,			
	pcity: String,
	pstate: String,
	parea: String,
	ppin: String,
	phospital: String,
	reqdesc:String,
	ondate:{
		type: Date,
		default: Date.now
		},
	closedate: {
		type: Date,
		default: Date.now
	}
	
});

mongoose.model('BloodRequest', BloodreqSchema);