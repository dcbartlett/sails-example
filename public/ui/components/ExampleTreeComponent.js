Mast.registerComponent('SimplerTree',{
	events: {
		'click >a.doDelete':'deleteTree' ,
		'click >a.addButton': 'addTree'
	},
	template: '.mast-template-simpler-tree',
	outlet: '.sandbox',
	model: {
		name: 'Testing Simpler Tree'
	},
	regions: {
		'.tree-outlet': {
			collection: {},
			emptyHTML: '<em>There are no branches available.</em>',
			component: 'SimplerTree'
		}
	},
	
	afterRender: function () {
		this.$el.disableSelection();

		// If this is the top-level tree, hide the delete button
		if (!this.parent) {
			this.$el.closest_descendant('a.doDelete').hide();
		}
	},
	
	deleteTree: function (e) {
		this.parent.collection.remove(this.model);
	},
	
	addTree: function (e) {
		this.children['.tree-outlet'].collection.add({});
	}
});

Mast.registerTree('ExampleTreeComponent',{
	events: {
		'click >a.doDelete':'deleteTree' ,
		'click >a.addButton': 'addTree',
		'contextmenu':	'_test'
	},
	outlet: '.sandbox',
	model: 'ExampleTreeModel',
	template: '.mast-template-exampleTree',
	emptyHTML: '<em>There are no children available.</em>',
	
	branchOutlet: '.branchOutlet',
	branchComponent: "ExampleTreeComponent",
	collection: "ExampleTreeCollection",

	
	// Called after initialization, before render
	afterCreate: function () {
	},
	
	afterRender: function () {
		this.$el.disableSelection();

		// If this is the top-level tree, hide the delete button
		if (!this.parent) {
			this.$el.closest_descendant('a.doDelete').hide();
		}
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