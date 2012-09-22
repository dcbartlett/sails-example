Mast.components.TestRow = Mast.Component.extend({
	template: '#mast-template-testtable-row',
	
	events: {
		'click .doDelete': 'removeRow',
		'click': 'toggleRow'
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
	
	// Called after initialization, before autorender
	init: function () {
	},
	
	changeName: function(formFieldValue) {
		this.set('name',formFieldValue);
	},
	afterRender: function () {
		this.$el.disableSelection();
		
		// Listen for child events
		this.on('dropdownSubmit',this.updateRow);
	},
	
	toggleRow: function(e) {
		var rowModel = this.model;
		if (rowModel.get('highlighted')) {
			this.set('highlighted',false);
			this.save();
		}
		else {
			this.set('highlighted',true);
			this.save();
		}
	},
	
	removeRow: function(e) {
		var rowModel = this.model;
		//		debug.debug("Deleting row w/ id: "+rowModel.id+" @ index: "+rowId);
		this.parent.collection.remove(rowModel);
		rowModel.destroy();
		e.stopImmediatePropagation();
	},
	
	updateRow: function(value) {
		var self = this;
		this.set('title',value, {
			// Example usage of a custom render function
//			render: function ($current, $new) {
//				$current.fadeTo(350,0.001,function(){
//					$current.replaceWith($new);
//					$new.hide();
//					self.setElement($new);
//					self.renderSubcomponents();
//					$new.fadeIn(150);
//				});
//			}
		});
		self.save();
	}
});



Mast.registerTree('TestTable',{
	events: {
		'click .deselectAll': 'deselectAll',
		'click .addRow': 'addRow'
	},
	
	subscriptions: {
		'experiment/create' : function (attributes) {
			this.collection.add(attributes);
		},
		'experiment/:id/update' : function (id,attributes) {
			this.collection.get(id).set(attributes);
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
	
	model: Mast.Model.extend({
		defaults: {
			testtitle:'works?'
		}
	}),
	
	// Called only after the socket is live
	afterConnect: function() {
		// Only fire afterConnect once, even if a reconnect happens
		Mast.Socket.off('connect', this.afterConnect);
		
		var self = this;
		
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
	
	deselectAll: function(e) {
		this.collection.each(function(model){
			model.set('highlighted',false);
			model.save();
		});
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