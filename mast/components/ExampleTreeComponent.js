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

	
	// Called after initialization, before render
	afterCreate: function () {

	},
	
	afterRender: function () {
		this.$el.disableSelection();
	},
	
	changeName: function(formFieldValue) {
		this.set('name',formFieldValue);
	},
	
	deleteTree: function (e) {
	
		this.parent.collection.remove(this.model);
	},
	
	addTree: function (e) {
		
		this.collection.add({value: this.get('value')+1});
	}
});