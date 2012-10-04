/**
 * A Table of Experiment models
 */
Mast.registerTree('TestTable',{
				
	outlet: '.sandbox',
	
	template: '#mast-template-testtable',
	
	branchComponent: "TestRow",
	
	branchOutlet: '.row-outlet',
	
	collection: "Experiments",
	
	model: {
		selected: null
	},
	
	subscriptions: {
		// Receiving this event means the model was already destroyed on the server
		'experiment/:id/destroy': function (id) {
			this.collection.remove(id);
		},
		
		'experiment/create': function(atrs) {
			this.collection.add(atrs);
			this.collection.sort();
		}
	},
	
	bindings: {

		selected: function(selectedModel) {
			if (selectedModel) {
				this.$(".voteUp").show();
				this.$(".voteDown").show();
				
				// Unhighlight the rest and highlight the proper row
				this.collection.invoke('set','highlighted',false);
				selectedModel.set('highlighted',true);
			}
			else {
				this.$(".voteUp").hide();
				this.$(".voteDown").hide();
			}
		}
	},
	
	events: {
		'click .addRow': 'addRow',
		'click .voteUp': 'voteUp',
		'click .voteDown': 'voteDown',
		'keyup .searchbox': _.debounce(function(){
			this.fetchFilteredResults();
		},100)
	},
	
	// If a destroyed row is selected, deselect it
	init: function(){
		this.collection.on('remove',this.deselectDeletedModel);
		this.collection.on('reset',this.deselectResetModel);
	},
	
	
	// Create a random new row
	addRow: function(e) {
		this.collection.create();
		this.collection.sort();
	},
	
	voteUp: function (e) {
		e.stopPropagation();
		this.get('selected').increment('votes',1);
		this.get('selected').save();
	},
	
	voteDown: function (e) {
		e.stopPropagation();
		this.get('selected').decrement('votes',1);
		this.get('selected').save();
	},
	
	
	fetchFilteredResults: function () { 
		var searchQuery = this.$('.searchbox').val();
		
		if (searchQuery.length > 0) {
			this.collection.fetch({
				search: {
					title: searchQuery
				},
				limit: 15,
				skip: 0,
				order: 'id ASC'
			});
		}
		else {
			this.collection.fetch();
		}	
	},
	
	
	// Deselect if this row was deleted
	deselectDeletedModel: function(removedModel){
		if (this.get('selected') && this.get('selected').get('id')==removedModel.get('id')) {
			this.set('selected',null);
		}
	},
	
	// Deselect now-invisble rows after a reset
	deselectResetModel: function(){
		if (this.get('selected')) {
			var currentlySelectedModelId = this.get('selected').get('id');
			var selectedModels = this.collection.where({
				id: currentlySelectedModelId
			});
			if (selectedModels.length === 0) {
				this.set('selected',null);
			}
			else {
				this.set('selected',selectedModels[0]);
			}
		}
	}
});

/**
 * This component represents a row in TestTable
 */
Mast.registerComponent('TestRow',{
	template: '#mast-template-testtable-row',
	
	events: {
		'click .doDelete': 'removeRow',
		'click': 'selectRow'
	},
	
	bindings: {
		// Called when title is changed
		title: function (newAttrValue) {
			var $e = this.$el;
			$e = $e.children('span');
			$e.fadeTo(75,0.001,function(){
				$e.text(newAttrValue);
				$e.fadeTo(150,1);
			});
		},
		// Called when votes are changed
		votes: function () {
			this.model.collection.sort();
		}
	},
	
	// Listen for when the dropdown form is submitted
	init: function() {
		this.on('dropdownSubmit',this.updateRow);
	},
	
	afterRender: function (changes) {
		this.$el.disableSelection();
	},
	
	selectRow: function(e) {
		this.parent.set('selected',this.model);
	},
	
	removeRow: function(e) {
		this.model.destroy();
		e.stopPropagation();
	},
	
	updateRow: function(value) {
		this.model.set('title',value);
		this.save();
		
		// Remove row if name doesn't match the current search filter
		var searchFilter = this.parent.$('.searchbox').val();
		if (searchFilter !== "" && !~value.indexOf(searchFilter)) {
			this.parent.collection.remove(this.model);
		}
	}
});