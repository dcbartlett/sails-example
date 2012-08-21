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
			$e.fadeTo(150,0.001,function(){
				$e.children('span').text(newAttrValue);
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
//		this.pattern.model.save(null,{silent:true});
	}
});







Mast.components.TestTable = Mast.Table.extend({
	events: {
		'click .deselectAll': 'deselectAll',
		'click .addRow': 'addRow'
	},
				
	outlet: '.sandbox',
	
	template: '#mast-template-testtable',
	
	rowcomponent: "TestRow",
	
	rowoutlet: '.row-outlet',
	
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
	
	addRow: function(e) {
		// Create a random new row
		var a = this.collection.create();
		
	},
	
	deselectAll: function(e) {
		this.collection.each(function(model){
			model.set('highlighted',false);
			model.save();
		});
	}
});





Mast.components.TestTableWithSubcomponents = Mast.components.TestTable.extend({
	rowcomponent: 'TestRowWithSubcomponent'
});

Mast.components.TestRowWithSubcomponent = Mast.components.TestRow.extend({
	init: function () {
		
		this.set('allowEdit',true);
	},
	subcomponents: {
		dropdown: {
			component: "DropdownComponent",
			outlet: ".doUpdate",
			value: 'test'
		}
	}
});