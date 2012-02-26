/* 
wrap the app in a self-invoking anonymous function to prevent messing up scope
with global variables
*/
(function ($) {
	
	var CloudCalc = {
		
		// bootstrap the app
		init: function (config) {
			// setup basic vars and ui
			this.cache(config);
			this.createSlider();
			
			// setup data
			this.fetchPlanData();
			this.subscriptions();
		
			// bind change events
			this.bindEvents();

			return this;
		},

		// cache all variables related to this app
		cache: function (config) {
			this.sl = config.slider;
			this.output = config.output;
			this.minVal = config.min;
			this.maxVal = config.max;
			this.anim = config.animate;
			
			this.VMval = $('#VM');
			this.RAMval = $('#RAM');
			this.HDval = $('#HD');
			this.BDval = $('#BD');

			this.totVal = $('#TOT');			
		},

		
		subscriptions: function () {
			// $.subscribe( 'plan/results', this.setVMval );

			
			$.subscribe( 'slider/moved', this.setVMval );
			$.subscribe( 'slider/moved', this.setRAMval );
			$.subscribe( 'slider/moved', this.setHDval );
			$.subscribe( 'slider/moved', this.setBDval );

			$.subscribe( 'slider/moved', this.updateTotal );			
		},

		// this is where I bind all slide events
		bindEvents: function() {
			// hold on to the value of this
			var self = CloudCalc;
			
			// bind the slider's slide event to a data event
			self.sl.on('slide', this.setSliderOutputValue );				
		},

		fetchPlanData: function () {
			// hold on to the value of this
			var self = CloudCalc;
			
			return $.getJSON( 'json/Plans_JSON_file.json', function( data ) {
				CloudCalc.data = data.Response.Plans.Plan;
				$.publish( 'plan/results' );				
			});
		},

		parseJSON: function () {
			// console.log(CloudCalc.data);
		},

		createSlider: function () {
			// hold on to the value of this
			var self = CloudCalc;			
			
			// initialize slider with basic properties and defaults if no values are passed in
			self.sl.slider({
				animate: self.anim || false, // TODO: may be redundant to set this to false
				min: self.minVal || 1,
				max: self.maxVal || 8
			});

			return self;			
		},

		setSliderOutputValue: function (event, ui) {
			// hold on to the value of this
			var self = CloudCalc;

			// show the ui output value on slide event
			self.output.html( ui.value + " INSTANCE");
			
			// publish the slider moved event and pass in the 
			// current step value which should be 0
			$.publish('slider/moved', [ui.value - 1]);

		},

		setVMval: function (step) {
			// hold on to the value of this
			var self = CloudCalc;			
			$.each(self.data, function(obj, idx) {
				self.VMval.text(self.data[step].Cpu);	
			});
		},

		setRAMval: function (step) {
			// hold on to the value of this
			var self = CloudCalc;			
			$.each(self.data, function(obj, idx) {
				self.RAMval.text(self.data[step].Ram);	
			});	
		},

		setHDval: function (step) {
			// hold on to the value of this
			var self = CloudCalc;			
			$.each(self.data, function(obj, idx) {
				self.HDval.text(self.data[step].Disk);	
			});	
		},

		setBDval: function (step) {
			// hold on to the value of this
			var self = CloudCalc;			
			$.each(self.data, function(obj, idx) {
				self.BDval.text(self.data[step].Bandwidth);	
			});
		},

		updateTotal: function (step) {
			// hold on to the value of this
			var self = CloudCalc;			
			
			$.each(self.data, function(obj, idx) {
				self.totVal.text(self.data[step].PlanCost + self.data[step].SetupCost );	
			});	
		},

		logger: function (msg) {
			console.log(msg);	
		}

	}; //end of CloudCalc

	// kick things off by passing in config values
	window.CloudCalc = CloudCalc.init({
		slider: $('#slider'),
		output: $('#slider-result'),
		min: 1,
		max: 8,
		animate: true 
	});
})(jQuery);