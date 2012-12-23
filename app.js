// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	// Prepopulate the database
	bootstrap: function(cb) {

		// Populate leaderboard data
		async.forEach(['Claude Shannon', 'Carl Friedrich Gauss', 'Marie Curie', 'Ada Lovelace', 'Grace Hopper', 'Nikola Tesla'], function(title, cb) {
			sails.models.leader.findOrCreate({
				title: title
			}, {
				title: title,
				votes: 0
			}, cb);
		}, function (err) {
			if (err) cb(err);
			else sails.models.role.findOrCreate({ name: 'admin' },{ name: 'admin' },cb);
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