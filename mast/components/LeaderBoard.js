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
		selected: null
	}),
	collection      : 'Leaders',				// Associate a collection with the leaderboard
	branchComponent : 'LeaderBoardItem',        // An instance of branchComponent will be created for each item in the collection
	branchOutlet    : '.item-outlet',           // A CSS selector, automatically scoped within the component, to identify where new branches should be appended
	events: {
		'click a.add-points' : 'add5Points'     // Add 5 points to the selected Leader
	},
	init: function(){
		this.collection.fetch({data:{
			limit: 15
		}});
	},
	add5Points: function (){
		this.get('selected').increment('votes',5);
		this.get('selected').save();
		this.collection.sort();
	}
});

// This component represents a single row of the leaderboard
Mast.registerComponent('LeaderBoardItem',{
	template  : '.template-leaderboard-item',   // Identify an HTML template to represent each leaderboard item
	events    : {
		click : 'select'
	},
	select: function () {                     // When an item is clicked on, mark it as selected
		this.parent.get('selected') && this.parent.get('selected').set('highlight',false);
		this.set('highlight',true);
		this.parent.set('selected',this);
	}
});