Experiment = Model.extend({
	
	title: STRING,
	value: INTEGER,
	highlighted: BOOLEAN,
	
	classMethods: {
		
		fetch: function(options,callback) {
			
			var self = this;
			Experiment.findAll(
			{
				order: 'title ASC',
				limit: 25,
				offset: 0
			}).success(function(objs){
				if (objs) {
					callback(objs);
				}
				else {
					throw new Error ();
				}
			})
		}
	}
});