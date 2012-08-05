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
	select: function(attributes) {
		this.get(attributes.id).set({highlighted:attributes.highlighted});
	}
});