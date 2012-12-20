// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	// Prepopulate the database
	bootstrap: function() {
		Role.findOrCreate({
			name: 'admin'
		}, ['name'], function(err, r) {
			console.log("DB bootstrap complete.");
		});

		// Populate leaderboard data
		_.each(['Claude Shannon', 'Carl Friedrich Gauss', 'Marie Curie', 'Ada Lovelace', 'Grace Hopper', 'Nikola Tesla'], function(title, index) {
			Leader.findOrCreate({
				title: title,
				votes: 0
			}, ['title'], function() {});
		});
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