exports.render = function(req, res) {
    res.render('index', {
    	title: 'DRACULA',
    	user: req.user ? req.user.username : '',
    	messages: req.flash('error') || req.flash('info')
    });
};