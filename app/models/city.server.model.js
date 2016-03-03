var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;
var CitySchema = new Schema({
	name : String,
	state : {
			type:Schema.ObjectId,
			ref: 'State'
		},
});	
mongoose.model('City', CitySchema);