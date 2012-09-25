
//
// More versatile version that supports > 2 tabs:
//
Mast.registerComponent('Tab',{
	template: 'template-tab',
	events: {
		click: function(){
			this.parent.set('selected',this.get('name'));
		}
	},
	afterRender: function () {
		if (this.get('selected')) {
			this.$el.addClass('selected');
		}
		else {
			this.$el.removeClass('selected');
		}
	}
});

Mast.registerTree('TabTree',{
	
	template: '.template-tab-tree',
	
	branchComponent: 'Tab',
	
	branchOutlet: 'outlet-tabs',
	
	collection: [
		{name: 'cats'},
		{name: 'dogs'}
	],
	
	subcomponents: {
		cats: {template: '.template-cats-component'},
		dogs: {template: '.template-dogs-component'}
	},
	
	afterRender: function () {
		var selection = this.get('selected');
		this.attach(".region-content",this.subcomponents[selection]);
	}
});