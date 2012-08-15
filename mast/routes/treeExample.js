Mast.routes.treeExample = function(query,page){
			
	// Empty container
	$(".sandbox").empty();
				
	// Now let's try creating a Tree
	// A Tree is basically just a Component which contains 
	// a homogenous list of sub-trees
	// Each tree has a Collection
	testTree = new Mast.components.ExampleTreeComponent();
	
	// Finally, let's create another button for the user to go back
	// to the previous example		
	new Mast.Button({
		label: '< Previous: Subcomponents',
		click: function(e) {
			Mast.navigate('subcomponents');
		},
		outlet: '.sandbox'
	});
}