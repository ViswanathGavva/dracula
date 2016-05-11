var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var BgSchema = new Schema({
	name : String
});	
mongoose.model('Bg', BgSchema);	