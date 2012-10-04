Mast.registerComponent('TabbedArea',{
	
	template: '.template-tabbed-area',
	model: {
		selected: 'cats'
	},
	events: {
		"click .cats.tab": '#selected=cats',
		"click .dogs.tab": '#selected=dogs'
	},
	bindings: {
		selected: function(){
			// Remove selected class from all tabs
			this.$('.tab').removeClass('selected');
		}
	},
	subcomponents: {
		// The cats collection is stored on the server
		cats: {
			emptyHTML: 'No cats found.',
			collection: {
				url: '/cat'
			},
			component: {
				template: '.template-cats-component'
			}
		},
		// The dogs collection is explicitly defined on the client
		dogs: {
			emptyHTML: 'No dogs found.',
			collection: [],//[{name: 'Scruffy'}, {name: 'Suki'}],
			component: {
				template: '.template-dogs-component'
			}
		}
	},

	afterRender: function () {
		// Add selected class to the proper tab
		var tabEl = this.$("."+this.get('selected')+".tab");
		tabEl.addClass('selected');

		// Attach the appropriate subcomponent to the region
		this.attach(".region-content",this.subcomponents[this.get('selected')]);
	}
});

