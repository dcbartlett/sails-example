Mast.models.TestRow = Mast.Model.extend({
	_class: 'TestRow',
	
	urlRoot: '/experiment',
	defaults: {
		highlighted: false,
		allowEdit: false,
		title: 'Sample',
		value: Math.floor(Math.random()*5000)
	}
	
})

Mast.models.TestRows = Mast.Collection.extend({
	_class: 'TestRows',
	url: '/experiment',
	model: Mast.models.TestRow,
	
	$create: function(attributes) {
		this.add(attributes);
	},
	$update: function(attributes) {
		this.get(attributes.id).set(attributes);
	},
	$destroy: function(attributes) {
		this.remove(this.get(attributes.id));
	}
	
});