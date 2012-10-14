/**
* Only allow users with the roleName role.
*/
module.exports = function(roleName) {
	return function (req,res,next) {

		// Check if this Account has the specified role
		Account.hasRole(req.session.account,roleName,next, function () {
			res.render('denied',{title:'Access Denied'});
		});
	};
};