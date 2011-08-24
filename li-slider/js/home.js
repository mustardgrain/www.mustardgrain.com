// JavaScript Document
(function($) {

    	$(window).load(	
			function() {
				$("#li-banner").sp_Li_Slider({						
					animation			:   'Regular-Custom',//"Regular-Custom","Regular"  // type of Animation  /default - "Fade:
					transitions			:   'Sqr-Down Sqr-Fade Slide-Back-Right Slide-Back-Left Blind-Right-Fade Open-Center Close-Center 4-Shrink-Close Blind-Down-Right Sqr-Random Sqr-Expand Blind-Down-Up-Bounce Line-Down-Reverse',
					effect				:	false,  // not working properly
					auto_play 			: 	true,   // auto play on start /default - true
					delay     			: 	1000,	// time period of a photos displaying /default - 3000 (3 sec)
					trans_period		:	1500,	// time period of chenging the photos /default - 1000 (1 sec)
					vert_sections		:	15,		// number of vertical sectors (only for Animation type Blind) /default - 15
					sqr_sections_Y		:	5,		// number of squeres by vertical (only for Animation type Sqr) /default - 5
					active_links		:	true,	// activate links of photos /default - true
					buttons_show		:	true,	// show all buttons 		/default - true
					auto_hide 			: 	true,	// auto hide buttons ot start (when auto_play is true) /default - true
					buttons_show_time	:	500,	// time period befor displayins of the buttons 	/default - 100
					buttons_show_delay	:	500,	// time period for appearing of the buttons		/default - 300
					buttons_hide_time 	:	500,	// time period befor disappearing of the buttons/default - 2000
					buttons_hide_delay	:	500		// time period for disappearing of the buttons	/default - 500
				});
			}
		);	
})(jQuery);