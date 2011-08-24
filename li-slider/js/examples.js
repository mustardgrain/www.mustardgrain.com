// JavaScript Document
(function($) {

    	$(document).ready(	
			function() {
				$("#m-banner").sp_Li_Slider({
	auto_play 	:	false,
						auto_hide 	:	false,
						delay 		: 	1000,
						trans_period:	1000,
						animation	:	'Random',
						transitions	:	'Curtain-Left-Down Curtain-Left-Up Curtain-Right-Up Curtain-Right-Down 2-Curtain-To-Angles 2-Curtain-To-Top-Bottom',
						active_links:	true,
						buttons_show:	true
				});
				
				$('.li-slider-new-style').find('>a').click(function(event){
						event.preventDefault();
						var skin = $(this).attr('href');
						$('.li-banner-header').remove();
						loadCSS({type:'css',src:'../media/skin'+skin+'/li-baner.css'});

				});
				
				function loadCSS(options){

					var src	= options.src,
						cache = true,
						arg	= options.arg || {};
	
					if (typeof options.cache != 'undefined') {cache=options.cache;}
					if (cache===false) {
						var d=new Date();
						src=src+"?"+d.getTime();
					}
					var node = document.createElement('link');
					node.type = 'text/css';
					node.rel = 'stylesheet';
					node.href = src;
					node.media = 'screen';
					$(node).addClass('li-banner-header');
					
					document.getElementsByTagName("head")[0].appendChild(node);
			}

			}
		);		
})(jQuery);