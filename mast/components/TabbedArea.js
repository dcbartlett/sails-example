Mast.registerComponent('TabbedArea',{
	template: '.template-tabbed-area',
	
	model: {
		selected: 'cats'
	},
	
	subcomponents: {
		cats: {template: '.template-cats-component'},
		dogs: {template: '.template-dogs-component'}
	},
	
	afterRender: function () {
		var selection = this.get('selected'),
			tabEl = this.$("."+selection+".tab");
		tabEl.addClass('selected');
		this.attach(".region-content",this.subcomponents[selection]);
	},
	
	events: {
		"click .cats.tab": 'selectCatsTab',
		"click .dogs.tab": 'selectDogsTab'
	},
	
	selectCatsTab: function() {
		this.set('selected','cats');
	},
	
	selectDogsTab: function () {
		this.set('selected','dogs');
	}
});