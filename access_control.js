var policy = sails.policies;
module.exports = {

	// Default policy
	// (true === accessible by the entire web)
	'*': true,

	'meta': {
		denied: true,
		error: true,
		notfound: true
		// 403 is hard-coded to be enabled
	},

	'settings': {
		"*": policy.authenticated
	},

	'admin': {
		'*': policy.only('admin')
	}
};
/**

someController: {

	// Apply to all unspecified actions on this controller unless otherwise specified below
	'*': {},

	// Override the wildcard policy
	someAction: policy.somePolicy
}

*/