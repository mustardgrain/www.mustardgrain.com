// JavaScript Document
(function($) {
    	$(window).load(	
			function() {
				var delay = 1000;
				var trans = 1000;
				
				$("#m-banner").sp_Li_Slider({
						auto_play 	:	false,
						auto_hide 	:	false,
						delay 		: 	1000,
						trans_period:	trans,
						animation	:	'Regular',
						transitions	:	'Push-Left Push-Up Blind-Right-All Blind-Down-Center Sqr-Down Sqr-Fade 4-Close-Delay 4-Cross 2-Close-Bounce Close-Center Curtain-Random-Bounce Shrink-Right-Top',
						effect		:	false,
						active_links:	true,
						buttons_show:	true
				});

				
				var Basic = function(){
				
						$("#m_banner_None").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'None',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Fade").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Fade',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Slide-Left").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Left',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Slide-Right").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Right',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Slide-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Slide-Up").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Up',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				var Curtain = function(){
						
						$("#m-banner-Curtain-Cl").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Cl',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-Cl-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Cl-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-Cl-Ran-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Cl-Ran-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-Op").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Op',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-Op-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Op-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-Op-Ran-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-Op-Ran-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-V-Cl").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Cl',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});						
						$("#m-banner-Curtain-V-Cl-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Cl-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-V-Cl-Ran-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Cl-Ran-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-V-Op").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Op',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-V-Op-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Op-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Curtain-V-Op-Ran-Bou").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Curtain-V-Op-Ran-Bou',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				var Shrink = function(){
												
						$("#m-banner-Shrink-Left-Bottom").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Left-Bottom',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Shrink-Left-Top").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Left-Top',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Shrink-Right-Bottom").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Right-Bottom',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Shrink-Right-Top").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Right-Top',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});						
						$("#m-banner-Shrink-Center").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Center',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Shrink-Center-Bounce").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Shrink-Center-Bounce',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Srink-Random-Bounce").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Srink-Random-Bounce',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				
				var Replace = function(){
						$("#m-banner-Push-Right").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Push-Right',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Push-Left").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Push-Left',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Push-Up").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Push-Up',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Push-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Push-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				var Sectors_2 = function(){
						
						$("#m-banner-Close-Center").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Close-Center',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Open-Center").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Open-Center',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-2-Close-Bounce").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'2-Close-Bounce',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-2-Shrink-Bounce").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'2-Shrink-Bounce',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-2-Shrink-Top-Bottom").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'2-Shrink-Top-Bottom',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
							
							
				};
				
				var Sectors_4 = function(){
						$("#m-banner-4-Shrink-Close").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	1050,
								animation	:	'4-Shrink-Close',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Close").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	1050,
								animation	:	'4-Close',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Open").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Open',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Close-Delay").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Close-Delay',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Open-Delay").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Open-Delay',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Close-Shift").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Close-Shift',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Open-Shift").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Open-Shift',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-4-Cross").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'4-Cross',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				var Blind = function(){
						$("#m-banner-Blind-Right").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Right',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Right-All").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Right-All',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Right-Wave").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Right-Wave',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Right-Wave-Full").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Right-Wave-Full',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Right-Fade").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Right-Fade',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Right").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Right',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Center").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Center',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Random").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Random',
								vert_sections	:	8,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Up").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Up',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Up-Fade").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Up-Fade',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Up-Bounce").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Up-Bounce',
								vert_sections	:	12,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
						$("#m-banner-Blind-Down-Up-Wave").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Blind-Down-Up-Wave',
								vert_sections	:	8,
								sqr_sections_Y	:	12,
								buttons_show:	false
						});
				};
				
				var Squares = function(){
						$("#m-banner-Line-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Line-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Sqr-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Line-Down-Reverse").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Line-Down-Reverse',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Sqr-Down-Expand").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Down-Expand',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Sqr-Expand").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Expand',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Sqr-Fade").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Fade',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						}); 
						$("#m-banner-Sqr-Random").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Random',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
						$("#m-banner-Sqr-Fade-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Sqr-Fade-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	3,
								buttons_show:	false
						});
				};
				
				var Pages = function(){
						$("#m-banner-Slide-Back-Right").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Back-Right',
								vert_sections	:	12,
								sqr_sections_Y	:	4,
								buttons_show:	false
						});
						$("#m-banner-Slide-Back-Left").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Back-Left',
								vert_sections	:	12,
								sqr_sections_Y	:	4,
								buttons_show:	false
						});
						$("#m-banner-Slide-Back-Up").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Back-Up',
								vert_sections	:	12,
								sqr_sections_Y	:	4,
								buttons_show:	false
						});
						$("#m-banner-Slide-Back-Down").sp_Li_Slider({
								auto_play 	:	false,
								auto_hide 	:	true,
								delay 		: 	delay,
								trans_period:	trans,
								animation	:	'Slide-Back-Down',
								vert_sections	:	12,
								sqr_sections_Y	:	4,
								buttons_show:	false
						});
				};
				
				Basic();
				Curtain();
				Shrink();
				Sectors_2();
				Replace();
				Sectors_4();
				Blind();
				Squares();
				Pages();
																																			 				$('.transformations li').click(function(){
						
						$('.Transitions').not(':hidden').find('.pause-btn').trigger('click');
						$('.Transitions').not('.'+$(this).attr('id')).hide();
						$('.'+$(this).attr('id')).show().find('.play-btn').trigger('click');
						$('#content').find('>h2').html($(this).find(':first-child').data('title'));
						Cufon.replace('h2');
						$(window).scrollTop(848);
				});
				
				$('#content').find('>h1').click(function(){
						
						$('.Transitions').not(':hidden').find('.pause-btn').trigger('click');
				});
				
				var init = function(){
					
						$('.Basic').find('.play-btn').trigger('click');
						$('.Basic').show();
				};
				init();

				var count = function(){
					var total = 0;					
					$('.transformations li').find('>a').each(function(){
						var number = $('.'+$(this).parent().attr('id')).find('.li-banner').length;
						$(this).data('title',$(this).html());
						var title = $(this).html() +' ('+number+')';
						total += number;
						$(this).html(title);						
					});
					var title = $('#content').find('>h1').html() +': '+total+' Animations';
					$('#content').find('>h1').html(title);
					Cufon.replace('h1');
				};
				
				count();
				
			}
		);		
})(jQuery);
