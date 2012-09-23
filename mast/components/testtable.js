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
		}
	},
	
	changeName: function(formFieldValue) {
		this.set('name',formFieldValue);
	},
	afterRender: function () {
		this.$el.disableSelection();
		
		// Listen for child events
		this.on('dropdownSubmit',this.updateRow);
	},
	
	selectRow: function(e) {
		var current = this.parent.get('selected');
		current && current.set('highlighted',false);
		this.set('highlighted',true);
		this.parent.set('selected',this);
		this.save();
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
	
	subscriptions: {
		'experiment/create' : function (attributes) {
			this.collection.add(attributes);
			this.collection.sort();
		},
		'experiment/:id/update' : function (id,attributes) {
			this.collection.get(id).set(attributes);
			this.collection.sort();
		},
		'experiment/:id/destroy' : function (id) {
			this.collection.remove(id);
		}
	},
				
	outlet: '.sandbox',
	
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
		this.collection.sort();
	},
	voteDown: function (e) {
		e.stopPropagation();
		this.get('selected').set({
			votes: this.get('selected').get('votes')-1
		});
		this.get('selected').save();
		this.collection.sort();
	}
});


Mast.registerTree('TestTableWithSubcomponents',{
	extendsFrom: 'TestTable',
	branchComponent: 'TestRowWithSubcomponent'
});

Mast.registerComponent('TestRowWithSubcomponent',{
	extendsFrom: 'TestRow',
	
	init: function () {
		this.set('allowEdit',true);
	},
	subcomponents: {
		DropdownComponent: '.doUpdate'
	}
});