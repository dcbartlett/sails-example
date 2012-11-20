/**
* Allow any authenticated user.
*/
module.exports = function (req,res,ok) {
	if (req.session.authenticated) {
		ok();
	}
	else {

		if (Mast.isSocket || Mast.xhr) {
			res.send(403);
		}
		else {
			res.render('denied',{title:'Access Denied'});
		}
	}
};