// JavaScript Document
(function($) {

    	$(document).ready(	
			function() {
				$("#m-banner").sp_Li_Slider({
						auto_play 	:	false,
						auto_hide 	:	false,
						delay 		: 	1000,
						trans_period:	500,
						vert_sections	:	12,
						sqr_sections_Y	:	4,
						animation	:	'Random-Exception',
						transitions	:	'None',
						active_links:	true,
						buttons_show:	true
				});
				$("#m-banner-125").sp_Li_Slider({        
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	450,
						trans_period:	550,
						animation	:	'Regular',
						vert_sections	:	12,
						sqr_sections_Y	:	4,
						buttons_show:	false
				});
				$("#m-banner-180").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	300,
						trans_period:	500,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	10,
						sqr_sections_Y	:	5,
						buttons_show:	false
				});
				$("#m-banner-220").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	300,
						trans_period:	500,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	10,
						sqr_sections_Y	:	5,
						buttons_show:	false
				});

				$("#m-banner-260").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	100,
						trans_period:	500,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	6,
						sqr_sections_Y	:	4,
						buttons_show:	false
				});
				$("#m-banner-300").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	1850,
						trans_period:	500,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	7,
						sqr_sections_Y	:	4,
						buttons_show:	false
				});
				$("#m-banner-468").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	800,
						trans_period:	500,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	8,
						sqr_sections_Y	:	4,
						buttons_show:	false
				});
				$("#m-banner-728").sp_Li_Slider({
						auto_play 	:	true,
						auto_hide 	:	true,
						delay 		: 	300,
						trans_period:	450,
						animation	:	'Random-Exception',
						transitions	:	'None',
						vert_sections	:	10,
						sqr_sections_Y	:	4,
						buttons_show:	false
				});
			}
		);		
})(jQuery);