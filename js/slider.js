$( ".slider" ).slider({
	animate: true,
	range: "min",
	value: 50,
	min: 10,
	max: 100,
	step: 10,
//this gets a live reading of the value and prints it on the page
slide: function( event, ui ) {
    $( "#slider-result" ).html( ui.value + " GB");
},

//this updates the hidden form field so we can submit the data using a form
change: function(event, ui) { 
$('#hidden').attr('value', ui.value);
		var val = ui.value,
		$box = $('#message');
		switch(true)
		{
		case (val > 50):
		  $box.fadeOut().fadeIn().html('you have chosen xtremenet');
		  break;
		case (val < 50):
		  $box.fadeOut().fadeIn().html('you have chosen valuenet');
		  break;
		default:
		  $box.fadeOut().fadeIn().html('you have chosen powernet');
		}
	}
});

$("#message").fadeIn(800);