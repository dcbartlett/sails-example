
Mast.registerCollection('Experiments',{
	url: '/experiment',
	comparator: function(model) {
		return -model.get('votes');
	},
	model: Mast.Model.extend({
		urlRoot: '/experiment',
		defaults: {
			votes: 0,
			highlighted: false,
			allowEdit: false,
			title: 'Sample',
			value: Math.floor(Math.random()*5000)
		}
	})
});