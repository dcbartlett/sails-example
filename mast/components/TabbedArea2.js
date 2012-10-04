Mast.registerComponent('TabbedArea2',{
	
	template: '.template-tabbed-area2',
	
	model: {
		selected: 'parrots'
	},
	
	afterRender: function () {
		var selection = this.get('selected'),
			tabEl = this.$("."+selection+".tab");
		tabEl.addClass('selected');
		this.attach(".region-content",_.str.capitalize(selection));
	},
	
	events: {
		"click .parrots.tab": "#selected=parrots",
		"click .cardinals.tab": "#selected=cardinals"
	}
});

Mast.registerComponent('Parrots',{
	template: '.template-parrots-component'
});
Mast.registerComponent('Cardinals',{
	template: '.template-cardinals-component'
});