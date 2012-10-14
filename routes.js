// Custom URL mappings
// *********************
// 
// This table routes urls to controllers/actions.
//
// If the URL is not specified here, the default route for a URL is:  /:controller/:action/:id
// where :controller, :action, and the :id request parameter are derived from the url
//
// If :action is not specified, Sails will redirect to the appropriate action 
// based on the HTTP verb: (using REST/Backbone conventions)
//
//		GET:	/:controller/read/:id
//		POST:	/:controller/create
//		PUT:	/:controller/update/:id
//		DELETE:	/:controller/destroy/:id
//
module.exports = {

	// Default mappings
	'/': {
		controller: 'meta',
		action: 'home'
	},
	'/500': {
		controller: 'meta',
		action: 'error'
	},
	'/404': {
		controller: 'meta',
		action: 'notfound'
	},
	'/403': {
		controller: 'meta',
		action: 'denied'
	},

	// Authentication mappings
	'/login': {
		controller: 'auth',
		action: 'login'
	},
	'/logout': {
		controller: 'auth',
		action: 'logout'
	},
	'/register': {
		controller: 'auth',
		action: 'register'
	},
	'/tj': {
		controller: 'settings',
		action: 'testjson'
	}
};