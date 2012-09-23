Mast.models.TestRow = Mast.Model.extend({
	_class: 'TestRow',
	
	urlRoot: '/experiment',
	defaults: {
		votes: 0,
		highlighted: false,
		allowEdit: false,
		title: 'Sample',
		value: Math.floor(Math.random()*5000)
	}
	
})

Mast.models.TestRows = Mast.Collection.extend({
	_class: 'TestRows',
	url: '/experiment',
	comparator: function(model) {
		return -model.get('votes');
	},
	model: Mast.models.TestRow
});