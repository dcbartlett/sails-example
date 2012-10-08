// Define a reusable dropdown component
// Parent can listen to the "submit" event"
Mast.registerComponent('DropdownComponent',{
	template: '.dropdown',
	model: {
		value: ""
	},
	events: {
		click:'expand', 
		clickoutside: 'collapse',
		pressEnter: 'submitForm',
		pressEscape: 'collapse',
		'click a.submit': 'submitForm'
	},
	
	beforeExpand: function () {
		// Grab model from parent
		this.set('value',this.parent.get('value'), {
			render: false
		});
	},
	expand: function(e) {
		this.beforeExpand && this.beforeExpand();
		
		if (!this.get('open')) {
			debug.debug("Opened menu.",this.get('value'));
			this.set('open',true);
			
			this.setTemplate('.dropdown-expanded');
			this.$el.find('input').focus();
		}
		e.stopImmediatePropagation();
	},

	collapse: function () {
		if (this.get('open')) {
			debug.debug("Closed menu.");
			this.set('open',false);
			this.setTemplate('.dropdown');
		}
	},
	
	submitForm: function (e) {
		this.set('value',this.$el.find('input').val());
		this.parent.trigger('dropdownSubmit',this.get('value'));
		this.collapse();
		e.stopImmediatePropagation();
		e.stopPropagation();
	},

	// Triggered after each render
	afterRender: function () {}
});