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
		"*": ['setup','authenticated']
	},

	'admin': {
		'*': sails.middleware.only('admin')
	}
};