Mast.registerTree('TestTableWithSubcomponents',{
	extendsFrom: 'TestTable',
	branchComponent: 'TestRowWithSubcomponent'
});

Mast.registerComponent('TestRowWithSubcomponent',{
	extendsFrom: 'TestRow',
	subcomponents: {
		'.doUpdate': 'DropdownComponent'
	}
});