/* 
wrap the app in a self-invoking anonymous function to prevent leakage of global variables
*/
(function ($) {
	
	var CloudCalc = {
		
		// bootstrap the app
		init: function (config) {
			this.cache(config);
			this.createSlider();
			this.setSliderOutputValue();
			return this;
		},

		// cache all variables related to this app
		cache: function (config) {
			this.sl = config.slider;
			this.output = config.output;
			// this.logger(config.output);
		},

		createSlider: function () {
			var self = CloudCalc;			
			self.sl.slider({
				animate: true,
				min: 1,
				max: 8
			});

			return self;			
		},

		setSliderOutputValue: function () {
			var self = CloudCalc;

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

	// kick things off
	window.CloudCalc = CloudCalc.init({
		slider: $('#slider'),
		output: $('#slider-result') 
	});
})(jQuery);