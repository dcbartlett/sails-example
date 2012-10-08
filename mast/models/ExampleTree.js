Mast.models.ExampleTreeModel = Mast.Model.extend({
	_class: 'ExampleTreeModel',
	
	defaults: {
		highlighted: false,
		allowEdit: false,
		title: 'Sample',
		value: Math.floor(Math.random()*5000)
	}
});

Mast.models.ExampleTreeCollection = Mast.Collection.extend({
	_class: 'ExampleTreeCollection',
	model: Mast.models.ExampleTreeModel
});