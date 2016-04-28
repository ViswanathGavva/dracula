var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: {
		type: String,
		trim: true,
		index: {unique: true}
	},
	phone: {
		type: String,
		trim: true,
		index: {unique: true}
	},
	role: {
		type: String,
		default:'Donor'
	},
	profilepic:{
		type: String,
		default:'img/def_profile.png'
	},
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String,
	provider: String,
	providerId: String,
	providerData: {},

	curlocation:{
		area: String,
		city: String,
		state: String,
		pin: String
	},
	officelocation:{
		area: String,
		city: String,
		state: String,
		pin: String
	},
	hometown:{
		area: String,
		city: String,
		state: String,
		pin: String
	},
	donorProfile: {
		bloodgroup: String,
		lastdonation: String,
		donations: Number,
		shareemail:{
			type:Boolean,
			default: false
		},
		sharephone:{
			type:Boolean,
			default: false
		},
		receiveemail:{
			type:Boolean,
			default: true
		},
		receivesms:{
			type:Boolean,
			default: true
		}
	},//This will have donor profile. Will add it later.
	reqsStats:{
		numreqs: Number,
		reqsserved:Number
	}//This will have requests submitted by this user.Will add later.
});

UserSchema.pre('save',
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

UserSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{username: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};

mongoose.model('User', UserSchema);
