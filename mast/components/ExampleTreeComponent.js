Mast.components.ExampleTreeComponent = Mast.Tree.extend({
	
	events: {
		'click >a.doDelete':'deleteTree' ,
		'click >a.addButton': 'addTree',
		'contextmenu':	'_test'
	},
	outlet: '.sandbox',
	model: 'ExampleTreeModel',
	template: '#mast-template-exampleTree',
	emptyHTML: '<em>There are no children available.</em>',
	
	branchOutlet: '.branchOutlet',
	branchComponent: "ExampleTreeComponent",
	collection: "ExampleTreeCollection",

	
	// Called after initialization, before autorender
	init: function () {},
	
	afterRender: function () {
		this.$el.disableSelection();
	},
	
	changeName: function(formFieldValue) {
		this.set('name',formFieldValue);
	},
	
	deleteTree: function (e) {
		// Stop event from propagating up to parent components
		e.stopImmediatePropagation();
	
		this.parent.collection.remove(this.model);
	},
	
	addTree: function (e) {
		// Stop event from propagating up to parent components
//		e.stopImmediatePropagation();
		
		this.collection.add({value: this.get('value')+1});
	}
});