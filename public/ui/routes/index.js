Mast.routes.index = function(query,page) {
				
	// Empty container
	$(".sandbox").empty();
	
	// Create a component
	leaderBoard = new Mast.components.LeaderBoard({
		outlet:'.sandbox'
	});

	// OK that was fun-- so lets move on to another example
	// We'll create a "Next Example" link
	// which will use the Mast.Router to manage the browser history stack
	// and move on to the next stage of the example app		
	new Mast.Button({
		label: 'Next: Tables >',
		click: function(e) {
			Mast.navigate('tableExample');
		},
		outlet: '.sandbox'
	});
}