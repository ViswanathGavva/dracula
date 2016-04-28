exports.renderErrorPage = function(req, res) {
	req.flash('error', 'Oops! Something went Wrong! Sorry...');
    res.render('error', {
    	title: 'DRACULA',
    	user: req.user ? req.user.username : '',
    	messages: req.flash('error') || req.flash('info')
    });
};