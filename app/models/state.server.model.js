var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var StateSchema = new Schema({
	name : {type: String,
			trim: true,
			unique: true
			}
});	
mongoose.model('State', StateSchema);