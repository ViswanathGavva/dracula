var port = 1337;

module.exports = {
	port: port,
	db: 'mongodb://localhost/dracula',
	facebook:{
		clientID: '584851015013943',
        clientSecret: 'b05a783a833e73c29df7a1ae9e21b74c',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	}
};

/*module.exports = {
	port:port,
	//db: 'mongodb://dracula:Dracula_098123@ds015878.mlab.com:15878/dracula',
	db: 'mongodb://heroku_r56swgft:gbpre7coa0s9h6b3ee9agtd3p1@ds017862.mlab.com:17862/heroku_r56swgft',
	facebook:{
		clientID: '584851015013943',
        clientSecret: 'b05a783a833e73c29df7a1ae9e21b74c',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	}	
};*/


/*
Binary

Import database
mongorestore -h ds015878.mlab.com:15878 -d dracula -u <user> -p <password> <input db directory>
Export database
mongodump -h ds015878.mlab.com:15878 -d dracula -u <user> -p <password> -o <output directory>
Import collection
mongorestore -h ds015878.mlab.com:15878 -d dracula -u <user> -p <password> <input .bson file>
Export collection
mongodump -h ds015878.mlab.com:15878 -d dracula -c <collection> -u <user> -p <password> -o <output directory>
JSON

Import collection
mongoimport -h ds015878.mlab.com:15878 -d dracula -c <collection> -u <user> -p <password> --file <input file>
Export collection
mongoexport -h ds015878.mlab.com:15878 -d dracula -c <collection> -u <user> -p <password> -o <output file>
CSV

Import collection
mongoimport -h ds015878.mlab.com:15878 -d dracula -c <collection> -u <user> -p <password> --file <input .csv file> --type csv --headerline
Export collection
mongoexport -h ds015878.mlab.com:15878 -d dracula -c <collection> -u <user> -p <password> -o <output .csv file> --csv -f <comma-separated list of field names>

mongolab connection string commands
user : dracula
pwd: Dracula_098123
mongo ds015878.mlab.com:15878/dracula -u <dbuser> -p <dbpassword>
mongodb://<dbuser>:<dbpassword>@ds015878.mlab.com:15878/dracula



to take backup:
mongodump  --db dracula --excludeCollection=bg --excludeCollection=stuff
this will create a folder with name dracula. inside it there will be bson files for each collection. 

mongodump  --db dracula --collection=events 

to import each collection.
mongorestore -h ds015878.mlab.com:15878 -d dracula -u dracula -p Dracula_098123 users.bson
mongorestore -h ds015878.mlab.com:15878 -d dracula -u dracula -p Dracula_098123 users.metadata.json
mongorestore -h ds015878.mlab.com:15878 -d dracula -u dracula -p Dracula_098123 users.bson


FB auth:
AppID: 584851015013943
App Secret:b05a783a833e73c29df7a1ae9e21b74c

*/
