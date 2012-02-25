/* 
wrap the app in a self-invoking anonymous function to prevent leakage of global variables
*/
(function ($) {
	
	var CloudCalc = {
		
		// bootstrap the app
		init: function (config) {
			console.log('app init');
			this.cache(config);
		},

		cache: function (config) {
			var slider = config.slider;
			// this.callme(slider);
		},

		callme: function (msg) {
			console.log(msg);	
		}

	}; //end of CloudCalc

	// kick things off
	window.CloudCalc = CloudCalc.init({
		slider: $('#slider') 
	});

})(jQuery);