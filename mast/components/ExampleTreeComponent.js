Mast.components.ExampleTreeComponent = Mast.Tree.extend({
	
	outlet: '.sandbox',
	model: 'ExampleTreeModel',
	template: '#mast-template-exampleTree',
	
	branchOutlet: '.branchOutlet',
	branchComponent: "ExampleTreeComponent",
	collection: "ExampleTreeCollection",
	
	events: {},
	
	// Called after initialization, before autorender
	init: function () {
	},
	
	changeName: function(formFieldValue) {
		this.set('name',formFieldValue);
	},
	afterRender: function () {
		this.$el.disableSelection();
	}
});