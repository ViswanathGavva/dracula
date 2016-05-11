var port = 1337;

/*module.exports = {
	port: port,
	db: 'mongodb://localhost/dracula',
	facebook:{
		clientID: '584851015013943',
        clientSecret: 'b05a783a833e73c29df7a1ae9e21b74c',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	}
};*/

module.exports = {
	port:port,
	//db: 'mongodb://dracula:Dracula_098123@ds015878.mlab.com:15878/dracula'
	db: 'mongodb://heroku_r56swgft:gbpre7coa0s9h6b3ee9agtd3p1@ds017862.mlab.com:17862/heroku_r56swgft',
	facebook:{
		clientID: '584851015013943',
        clientSecret: 'b05a783a833e73c29df7a1ae9e21b74c',
        callbackURL: 'https://dracula.herokuapp.com/oauth/facebook/callback'
	}
};

