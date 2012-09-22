// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	appPath: __dirname,

	    port: 5009,

	appEnvironment: 'development',

	datasource: require("./config").datasource,

	rigging: true
});
