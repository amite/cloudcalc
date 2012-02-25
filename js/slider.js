/* 
wrap the app in a self-invoking anonymous function to prevent leakage of global variables
*/
(function ($) {
	
	var CloudCalc = {
		
		// bootstrap the app
		init: function (config) {
			this.cache(config);
			this.createSlider();

			return this;
		},

		cache: function (config) {
			this.slider = config.slider;
			this.logger(slider);
		},

		createSlider: function () {
			var self = CloudCalc;
			
			self.slider.slider({
				range: "min",
			 	value: 50,
			 	min: 10,
			 	max: 100,
			 	step: 10
			 })	
		},

		logger: function (msg) {
			console.log(msg);	
		}

	}; //end of CloudCalc

	// kick things off
	window.CloudCalc = CloudCalc.init({
		slider: $('#slider') 
	});
})(jQuery);