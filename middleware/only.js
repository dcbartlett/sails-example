/**
* Only allow users with the roleName role.
*/
module.exports = function(roleName) {
	return function (req,res,next) {

		// Check if this Account has the specified role
		Account.hasRole(req.session.account,roleName,next, function () {
			if (Mast.isSocket || Mast.xhr) {
				res.send(403);
			}
			else {
				res.render('denied',{title:'Access Denied'});
			}
		});
	};
};