Mast.routes.subcomponents = function(query,page){
			
	// Empty container
	$(".sandbox").empty();
	
	
				
	// Now let's try creating a Table
	// A Table is basically just a Component which contains 
	// a homogenous list of sub-Components
	tc = new Mast.components.TestTableWithSubcomponents();
	

	// Make another component to test out attach and detach
	tabbedarea = new Mast.components.TabbedArea({
		outlet: ".sandbox"
	})
	
	tabbedarea2 = new Mast.components.TabbedArea2({
		outlet: ".sandbox"
	})

	// Finally, let's create another button for the user to go back
	// to the previous example		
	new Mast.Button({
		label: '< Previous: Tables',
		click: function(e) {
			Mast.navigate('tableExample');
		},
		outlet: '.sandbox'
	});
	
	
	// On to the next experiment
	new Mast.Button({
		label: 'Next: Trees >',
		click: function(e) {
			Mast.navigate('treeExample');
		},
		outlet: '.sandbox'
	});
}