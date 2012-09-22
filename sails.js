// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	bootstrap: function() {
	    Role.findOrCreate({name: 'admin'},['name'],function(err,r) {
		    console.log("DB bootstrap complete.");
		});
	},

	appPath: __dirname,

	    port: 5009,

	appEnvironment: 'development',

	datasource: require("./config").datasource,

	rigging: true
});
