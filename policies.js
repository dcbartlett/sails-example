// Some basic authentication middleware is bundled in the AuthenticationService
var policy = AuthenticationService.policy;
module.exports = {

	'*': true,

	auth: {
		login: policy.inverse,
		register: policy.inverse,
		logout: policy.any
	},
	meta: {
		denied: true,
		error: true,
		notfound: true
		// 403 is hard-coded to be enabled
	},

	settings: {
		"*": policy.any
	},

	admin: {
		'*': policy.only('admin')
	}
};