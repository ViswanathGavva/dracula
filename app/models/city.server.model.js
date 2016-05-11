var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var CitySchema = new Schema({
	name : String,
	state : {
			type:Schema.ObjectId,
			ref: 'State'
		},
});	
mongoose.model('City', CitySchema);