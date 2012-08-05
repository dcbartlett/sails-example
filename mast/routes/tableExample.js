Mast.routes.tableExample = function(query,page){
			
	// Empty container
	$(".sandbox").empty();
				
	// Now let's try creating a Table
	// A Table is basically just a Component which contains 
	// a homogenous list of sub-Components
	this.testTable = new Mast.components.TestTable();

	// Finally, let's create another button for the user to go back
	// to the previous example		
	this.previousButton = new Mast.Button({
		label: '< Previous: Components',
		click: function(e) {
			Mast.navigate('index');
		},
		outlet: '.sandbox'
	});
	
	// On to the next experiment
	this.nextButton = new Mast.Button({
		label: 'Next: Subcomponents >',
		click: function(e) {
			Mast.navigate('subcomponents');
		},
		outlet: '.sandbox'
	});
	
}