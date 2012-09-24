/**
 * A Table of Experiment models
 */
Mast.registerTree('TestTable',{
	events: {
		'click .addRow': 'addRow',
		'click .voteUp': 'voteUp',
		'click .voteDown': 'voteDown'
	},
				
	outlet: '.sandbox',
	
	subscriptions: {
		'experiment/:id/destroy': function (id) {
			this.collection.remove(id);
			// If this destroyed row is selected, deselect it
			if (this.get('selected') && this.get('selected').get('id')==id) {
				this.set('selected',null);
			}
		}
	},
	
	bindings: {
		selected: function(newVal) {
			if (newVal) {
				this.$(".voteUp").show();
				this.$(".voteDown").show();
			}
			else {
				this.$(".voteUp").hide();
				this.$(".voteDown").hide();
			}
		}
	},
	
	template: '#mast-template-testtable',
	
	branchComponent: "TestRow",
	
	branchOutlet: '.row-outlet',
	
	collection: "Experiments",
	
	model: {
		selected: null
	},
	
	// Create a random new row
	addRow: function(e) {
		this.collection.create();
	},
	
	voteUp: function (e) {
		e.stopPropagation();
		this.get('selected').set({
			votes: this.get('selected').get('votes')+1
		});
		this.get('selected').save();
	},
	voteDown: function (e) {
		e.stopPropagation();
		this.get('selected').set({
			votes: this.get('selected').get('votes')-1
		});
		this.get('selected').save();
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
			$e.fadeTo(50,0.001,function(){
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
		var current = this.parent.get('selected');
		current && current.set('highlighted',false);
		this.set('highlighted',true);
		this.parent.set('selected',this);
	},
	
	removeRow: function(e) {
		var rowModel = this.model;
		this.parent.collection.remove(rowModel);
		rowModel.destroy();
		e.stopPropagation();
	},
	
	updateRow: function(value) {
		this.set('title',value);
		this.save();
	}
});