var ExperimentController = {
	
	index: function (req,res) {
		if (req.xhr || req.isSocket) {
			this.findAll();
		}
		else {
			res.view();
		}
	},
	
	// Lookup a single model
	find: function (req,res) {
		Experiment.find({
			where:{
				id: req.param('id')
			}
		}).success(function(experiments) {
			res.json(experiments);
		});
	},
	
	// Fetch paginated list of models from testtable
	findAll: function (req,res) {
		Experiment.fetch(null,function(experiments) {
			res.json(experiments);
		});
		
		// Join room
		req.isSocket && req.socket.join('tableViewers');
	},
	
	// Store a new model
	create: function (req,res) {
		Experiment.create({
			title: req.param('title'),
			value: req.param('value')
		}).success(function(experiment) {
			req.socket.broadcast.to('tableViewers').json.send({
				uri: 'experiment/create',
				data: {
					id: experiment.id,
					highlighted: experiment.highlighted,
					title: experiment.title,
					value: experiment.value
				}
			})
			res.json({
				id: experiment.id,
				success:true
			});
		});
	},
	
	// Edit an existing model
	update: function (req,res) {
		Experiment.findAndUpdate({
			id: req.param('id') 
		}, {
			title: req.param('title'),
			value: req.param('value'),
			highlighted: req.param('highlighted')
		},function (err,model) {
			req.socket.broadcast.to('tableViewers').json.send({
				uri: 'experiment/'+req.param('id')+'/update',
				data: {
					highlighted: req.param('highlighted'),
					title: req.param('title'),
					value: req.param('value')
				}
			});
			res.json({
				success:true
			});
		});
	},
	
	// Destroy a model
	destroy: function (req,res) {
		Experiment.findAndDelete(req.param('id'),function(err) {
			req.socket.broadcast.to('tableViewers').json.send({
				uri: 'experiment/'+req.param('id')+'/destroy'
			});
			res.json({
				success:true
			});
		});
	}
};
_.extend(exports,ExperimentController);