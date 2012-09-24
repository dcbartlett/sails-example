Mast.components.TestRow = Mast.Component.extend({
	template: '#mast-template-testtable-row',
	
	events: {
		'click .doDelete': 'removeRow',
		'click': 'selectRow'
	},
	
	// Custom render bindings
	bindings: {
		title: function (newAttrValue) {
			var $e = this.$el;
			$e = $e.children('span');
			$e.fadeTo(50,0.001,function(){
				$e.text(newAttrValue);
				$e.fadeTo(150,1);
			});
		},
		votes: function () {
			this.model.collection.sort();
		}
	},
	
	// Listen for child events
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


Mast.registerTree('TestTable',{
	events: {
		'click .addRow': 'addRow',
		'click .voteUp': 'voteUp',
		'click .voteDown': 'voteDown'
	},
				
	outlet: '.sandbox',
	
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
	
	collection: "TestRows",
	
	model: {
		selected: null
	},
	
	// Called only after the socket is live
	afterConnect: function() {
		// Only fire afterConnect once, even if a reconnect happens
		Mast.Socket.off('connect', this.afterConnect);
		
		this.collection.fetch({
			error: function(stuff){
				throw new Error(stuff);
			}
		});
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


Mast.registerTree('TestTableWithSubcomponents',{
	extendsFrom: 'TestTable',
//	collection: Mast.Collection.extend({
//		url: '/experiment',
//		comparator: function(model) {
//			return -model.get('votes');
//		},
//		model: Mast.Model.extend({
//			urlRoot: '/experiment',
//			defaults: {
//				votes: 0,
//				highlighted: false,
//				allowEdit: true,
//				title: 'Sample',
//				value: Math.floor(Math.random()*5000)
//			}
//		})
//	}),
	branchComponent: 'TestRowWithSubcomponent'
});

Mast.registerComponent('TestRowWithSubcomponent',{
	extendsFrom: 'TestRow',
	subcomponents: {
		DropdownComponent: '.doUpdate'
	}
});