// This Collection is synced with the server
Mast.registerCollection('Leaders',{
	url		: '/leader',
	model	: Mast.Model.extend({
		defaults: {				// Fields specified exclusively on the client are not shared
			highlight: false
		}
	}),
	comparator: function(model) {
		return -model.get('votes');
	}
});

// This Tree brings life to the leaderboard and its items
Mast.registerTree('LeaderBoard',{
	template        : '.template-leaderboard',  // Identify an HTML template to represent the leaderboard frame
	model			: Mast.Model.extend({
		defaults: {
			selected: null
		}
	}),
	collection      : 'Leaders',				// Associate a collection with the leaderboard
	branchComponent : 'LeaderBoardItem',        // An instance of branchComponent will be created for each item in the collection
	branchOutlet    : '.item-outlet',           // A CSS selector, automatically scoped within the component, to identify where new branches should be appended
	events: {
		clickoutside		 : 'deselect',		// Deselect the selected Leader when the user clicks outside of the LeaderBoard
		'click a.add-points' : 'addVote'     // Add a vote to the selected Leader
	},
	
	// Add a vote to the total for the selected item
	addVote: function (){
		this.get('selected').increment('votes',1);
		this.get('selected').model.save();
	},
	
	// Select the specified item
	select: function (item) {
		this.deselect();
		this.set('selected',item);
		item.set('highlight',true);
	},
	
	// Deselect the currently selected row
	deselect: function () {
		if (this.get('selected')) {
			this.get('selected').set('highlight',false);
		}
		this.set('selected',null);
	}
});

// This component represents a single row of the leaderboard
Mast.registerComponent('LeaderBoardItem',{
	template  : '.template-leaderboard-item',   // Identify an HTML template to represent each leaderboard item
	bindings: {
		votes: function () {
			this.model.collection.sort();
		}
	},
	events : { 
		click: function (e) {
			e.stopPropagation();
			this.parent.select(this);
		}
	}
});