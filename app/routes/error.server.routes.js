module.exports = function(app) {
    var index = require('../controllers/error.server.controller');
    app.get('/error', index.renderErrorPage);
};