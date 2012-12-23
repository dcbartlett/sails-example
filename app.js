// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	// Prepopulate the database
	bootstrap: function(cb) {
		// Role.findOrCreate({
		// 	name: 'admin'
		// }, ['name'], function(err, r) {
		// });

		// Populate leaderboard data
		async.forEach(['Claude Shannon', 'Carl Friedrich Gauss', 'Marie Curie', 'Ada Lovelace', 'Grace Hopper', 'Nikola Tesla'], function(title, cb) {
			Leader.findOrCreate({
				title: title,
				votes: 0
			}, {}, cb);
		}, cb);
	},

	appPath: __dirname,

	environment: 'development',

	rigging: {
	    outputPath: './.compiled'
	}

	// To make the server use SSL (https), specify a key and cert string
	// ssl: {
		// key: fs.readFileSync('ssl/private.key.pem'),
		// cert: fs.readFileSync('ssl/combined.crt')
	// }
});