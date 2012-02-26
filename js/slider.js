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
			
			// bind change events
			this.bindEvents();

			// setup data
			this.fetchPlanData();
			this.subscriptions();
			
			return this;
		},

		// cache all variables related to this app
		cache: function (config) {
			this.sl = config.slider;
			this.output = config.output;
			this.minVal = config.min;
			this.maxVal = config.max;
			this.anim = config.animate;

			// this.logger(config.output);
		},

		// this is where I bind all slide events
		bindEvents: function() {
			// hold on to the value of this
			var self = CloudCalc;
			
			self.setSliderOutputValue();	
				
		},

		fetchPlanData: function () {
			
			return $.getJSON( 'json/Plans_JSON_file.json', function( data ) {
				CloudCalc.data = data.Response.Plans.Plan;
				$.publish( 'plan/results' );				
			});
		},

		subscriptions: function () {
			$.subscribe( 'plan/results', this.parseJSON );
		},

		parseJSON: function () {
			console.log(CloudCalc.data);
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

		setSliderOutputValue: function () {
			// hold on to the value of this
			var self = CloudCalc;

			// show the ui output value on slide event
			self.sl.slider({
				slide: function ( event, ui ) {
					self.output.html( ui.value + " INSTANCE");	
				}
			});

			return self;	
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