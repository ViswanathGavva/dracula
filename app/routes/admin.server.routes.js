var admin = require('../../app/controllers/admin.server.controller'),
	users = require('../../app/controllers/users.server.controller'),
	ds =  require('../../app/services/dataservices.server.service'),
	bloodbank = require('../../app/controllers/bloodbank.server.controller');	
	
module.exports = function(app) {
	app.route('/admin')
		.get(users.requiresLogin,users.isAdmin,admin.renderAdminConsole);	
		
	//states	
	app.route('/adminstates')
		.get(users.requiresLogin,users.isAdmin,admin.listStates);
		
	app.route('/adminstates/:stateId')
		.get(users.requiresLogin,users.isAdmin,admin.stateByID)// get one state
		.delete(users.requiresLogin,users.isAdmin,admin.deleteState)//delete one state
		.put(users.requiresLogin,users.isAdmin,admin.updateState);//update one state
	
	app.route('/adminstates/add').post(users.requiresLogin,users.isAdmin,admin.createState);
	
	/*app.route('/adminstatebyid')
		.get(users.requiresLogin,users.isAdmin,admin.stateByID);*/
		
	//cities							
	app.route('/admincities')
		.get(users.requiresLogin,users.isAdmin,admin.listCities)
		.post(users.requiresLogin,users.isAdmin,admin.createCity);	
	app.route('/admincities/:cityId')
		.get(users.requiresLogin,users.isAdmin,admin.cityByID)
		.put(users.requiresLogin,users.isAdmin,admin.updateCity)		
		.delete(users.requiresLogin,users.isAdmin,admin.deleteCity);
	
	//events
	app.route('/adminevents')
		.get(users.requiresLogin,users.isAdmin,admin.listEvents)
		.post(users.requiresLogin,users.isAdmin,admin.createEvent);
	app.route('/adminevents/:eventId')	
		.get(users.requiresLogin,users.isAdmin,admin.eventById)
		.put(users.requiresLogin,users.isAdmin,admin.updateEvent)
		.delete(users.requiresLogin,users.isAdmin,admin.deleteEvent);
		
	//bloodbanks		
	app.route('/adminbloodbanks/:bloodbankId')
		.get(users.requiresLogin,users.isAdmin,bloodbank.BloodbankById)
		.put(users.requiresLogin,users.isAdmin,bloodbank.updateBloodbank)
		.delete(users.requiresLogin,users.isAdmin,bloodbank.deleteBloodbank);
		
	app.route('/adminbloodbanks')			
		.get(users.requiresLogin,users.isAdmin,bloodbank.listBloodbanks)
		.post(users.requiresLogin,users.isAdmin,bloodbank.createBloodbank);
		
	app.route('/adminevents')
		.get(users.requiresLogin,users.isAdmin,admin.renderAdminConsole);		
};