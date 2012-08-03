// lift sails                                                                                                          
require('sails').lift({
	appName: "Sails Example",

	appPath: __dirname,

	appEnvironment: 'development',

	datasource: require("./config").datasource,

	rigging: true
});
