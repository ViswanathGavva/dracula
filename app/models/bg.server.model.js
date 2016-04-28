var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;
var BgSchema = new Schema({
	name : String
});	
mongoose.model('Bg', BgSchema);	