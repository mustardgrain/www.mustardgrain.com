/**
 * jQuery Li Slider 
 * Copyright (c) 2010 Spotnil (http://spotnil.com)
 * Version: 0.1 (11/15/2010)
 */		  		  
			var fade = function(position, time,slider,$sliderImage,settings) {
					
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).fadeOut(time);
					$($sliderImage[position]).fadeIn(time);
					slider.newPosition(position);
					slider.setTransition(false);					
					slider.autoPlaySlider();		
			};
			
			var slide_up = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css({'z-index':1, 'height': settings.height}).show() ;
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
						opacity: 1,
						height: '0px'
					  }, time ,function(){
						  slider.clearLi();
						  slider.setTransition(false);
						  slider.autoPlaySlider();
						  });					
					slider.newPosition(position);
			};
			
			var slide_down = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).css('z-index',1);					
					$($sliderImage[position]).css('z-index',2).slideDown(time,function(){
						  						slider.clearLi();
												slider.setTransition(false);
												slider.autoPlaySlider();
												});
					slider.newPosition(position);
			};
			
			var slide_left_right = function(position, time,slider,$sliderImage,settings,dir) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: dir*settings.width
									 },time,function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};						
			
			var slide_back = function(position, time,slider,$sliderImage,settings,dir) {
								
					slider.setTransition(true);
//					dir = parseInt(dir);
					$('img',$sliderImage[position]).css({'position': 'absolute'});
					$('img',$sliderImage[slider.currentImage]).css({'position': 'absolute'});
					$($sliderImage[position]).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',1);
					$('img',$sliderImage[slider.currentImage]).animate({
												height: settings.height,
												left: (dir*(settings.width*2/3))+'px'
												},time/2, function(){
													$($sliderImage[slider.prevPosition]).css('z-index',0).find('img').animate({
														width: settings.width,
														height: settings.height,
														left: 0
												},time/2);});
					$('img',$sliderImage[position]).animate({
												left:(dir*('-'+(settings.width*1/3)))+'px'
												},time/2, function(){
														
														$('img',$sliderImage[slider.currentImage]).css('z-index',1).animate({
															left:0
														},time/2, function(){
														slider.clearLi();
														slider.clearImg();
														slider.setTransition(false);
														slider.autoPlaySlider();
													
												});
													
												});
					
					slider.newPosition(position);	
			};
			
			var slide_back_v = function(position, time,slider,$sliderImage,settings,dir) {
								
					slider.setTransition(true);
					$('img',$sliderImage[position]).css({'position': 'absolute'});
					$('img',$sliderImage[slider.currentImage]).css({'position': 'absolute'});
					$($sliderImage[position]).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',1);
					$('img',$sliderImage[slider.currentImage]).animate({
												height: settings.height,
												top: (dir*(settings.height*2/3))+'px'
												},time/2, function(){
													$($sliderImage[slider.prevPosition]).css('z-index',0).find('img').animate({
														width: settings.width,
														height: settings.height,
														top: 0
												},time/2);});
					$('img',$sliderImage[position]).animate({
												top:(dir*('-'+(settings.height*1/3)))+'px'
												},time/2, function(){
														
														$('img',$sliderImage[slider.currentImage]).css('z-index',1).animate({
															top:0
														},time/2, function(){
														slider.clearLi();
														slider.clearImg();
														slider.setTransition(false);
														slider.autoPlaySlider();
													
												});
													
												});
					
					slider.newPosition(position);	
			};
			
			//animation
			var close_center = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					var urlNew = $('img',$sliderImage[position]).attr('src');
					$('.li-sectors_2_X-0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});
					$('.li-sectors_2_X-1', slider.slide).show().find('img').attr('src',urlNew).css({'width':0, 'height':settings.height});


					$('#'+slider.prefix+'-sect-2-x-0-0-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px',
												left: slider.width2/2+'px'
												},time);
					$('#'+slider.prefix+'-sect-2-x-0-0-1').css({'z-index':0, 'opacity':1}).find('img').animate({
												width: settings.width+'px',
												height: settings.height+'px'
												},time);
					$('#'+slider.prefix+'-sect-2-x-0-1-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px',
												left: 0
												},time);
					$('#'+slider.prefix+'-sect-2-x-0-1-1').css({'z-index':0, 'opacity':1}).find('img').css({'left':slider.width2/2, 'width':0}).animate({
												width: settings.width+'px',
												height: settings.height+'px',
												left: "-"+slider.width2/2+"px"
												},time,function(){
																slider.replaceLi();																
																slider.reInit_2_X_Sectors();
																slider.setTransition(false);
																slider.autoPlaySlider();
													
												});																																		
					slider.newPosition(position);	
			};
			
			//animation
			var close_bounce_2 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					$('.li-sectors_2_X-0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});

					$($sliderImage[position]).css('z-index',0).show();
					$($sliderImage[slider.currentImage]).hide();
					$('#'+slider.prefix+'-sect-2-x-0-0-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												left: slider.width2/4+'px'
												},time,'easeOutBounce');
					$('#'+slider.prefix+'-sect-2-x-0-1-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												left: slider.width2/4+'px'
												},time,'easeOutBounce',function(){
																slider.clearLi();
																slider.reInit_2_X_Sectors();
																slider.setTransition(false);
																slider.autoPlaySlider();													
												});																																		
					slider.newPosition(position);	
			};
			
			//animation
			var shrink_bounce_2 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					$('.li-sectors_2_X-0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});

					$($sliderImage[position]).css('z-index',1).show();
					$('#'+slider.prefix+'-sect-2-x-0-0-0').css({'z-index':2, 'opacity':1}).find('img').animate({
												width: 0,
												height:0,
												left: (Math.random()*slider.width2/2)+'px',
												top: (Math.random()*slider.height2)+'px'
												},time,'easeOutBounce');
					$('#'+slider.prefix+'-sect-2-x-0-1-0').css({'z-index':2, 'opacity':1}).find('img').animate({
												width: 0,
												height:0,
												left: (Math.random()*slider.width2/2)+'px',
												top: (Math.random()*slider.height2)+'px'
												},time,'easeOutBounce',function(){
																slider.clearLi();
																slider.reInit_2_X_Sectors();
																slider.setTransition(false);
																slider.autoPlaySlider();													
												});																																		
					slider.newPosition(position);	
			};
			
			//animation
			var shrink_top_bottom_2 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					$('.li-sectors_2_X-0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});

					$($sliderImage[position]).css('z-index',0).show();
					$($sliderImage[slider.currentImage]).hide();
					$('#'+slider.prefix+'-sect-2-x-0-0-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												height:0,
												top: (Math.random()*slider.height2)+'px'
												},time,'easeOutBounce');
					$('#'+slider.prefix+'-sect-2-x-0-1-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												height:0,
												top: (Math.random()*slider.height2)+'px'
												},time,'easeOutBounce',function(){
																$($sliderImage[slider.currentImage]).css('z-index','');
																slider.reInit_2_X_Sectors();
																slider.setTransition(false);
																slider.autoPlaySlider();													
												});																																		
					slider.newPosition(position);	
			};

			//animation
			var open_center = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					var urlNew = $('img',$sliderImage[position]).attr('src');
					$('.li-sectors_2_X-0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});
					$('.li-sectors_2_X-1', slider.slide).show().find('img').attr('src',urlNew).css({'width':0, 'height':settings.height, 'opacity':1});

					$('#'+slider.prefix+'-sect-2-x-0-0-0').css({'z-index':0, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px'
												},time,'easeInOutCubic');
					$('#'+slider.prefix+'-sect-2-x-0-0-1').css({'z-index':1, 'opacity':1}).find('img').css({'left':slider.width2/2, 'width':0}).animate({
												width: settings.width+'px',
												height: settings.height+'px',
												left: 0
												},time,'easeInOutCubic');	
					$('#'+slider.prefix+'-sect-2-x-0-1-0').css({'z-index':0, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px',
												left: slider.width2/2+'px'
												},time,'easeInOutCubic');
					$('#'+slider.prefix+'-sect-2-x-0-1-1').css({'z-index':1, 'opacity':1}).find('img').css({'left':0, 'width':0}).animate({
												width: settings.width+'px',
												height: settings.height+'px',
												left: "-"+slider.width2/2+"px"
												},time,'easeInOutCubic',function(){
																slider.replaceLi();
																slider.reInit_2_X_Sectors();
																slider.setTransition(false);
																slider.autoPlaySlider();
													
												});
																																						
					slider.newPosition(position);	
			};
			
			
			//animation
			var shrink_close_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');
					var urlNew = $('img',$sliderImage[position]).attr('src');
					$('.li-sectors0', slider.slide).show().find('img').attr('src',url).css({'width':settings.width, 'height':settings.height});
					$('.li-sectors1', slider.slide).show().find('img').attr('src',urlNew).css({'width':settings.width, 'height':0, 'opacity':1});
					
					$('#'+slider.prefix+'-sqr-sect-0-0-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px',
												left: slider.width4/2+'px'
												},time);
					$('#'+slider.prefix+'-sqr-sect-0-0-1').css({'z-index':0, 'opacity':1}).find('img').css({'width':0, 'height':settings.height}).animate({
												width: settings.width+'px',
												height: settings.height+'px'
												},time);
					$('#'+slider.prefix+'-sqr-sect-0-1-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												height: 0,
												width: settings.width+'px',
												top: slider.height4/2+'px'
												},time);
					$('#'+slider.prefix+'-sqr-sect-0-1-1').css({'z-index':0, 'opacity':1}).find('img').css({'top':0, 'height':0}).animate({
												width: settings.width+'px',
												height: settings.height+'px'
												},time);
					$('#'+slider.prefix+'-sqr-sect-1-0-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: settings.width+'px',
												height: 0,
												top: 0
												},time);
					$('#'+slider.prefix+'-sqr-sect-1-0-1').css({'z-index':0, 'opacity':1}).find('img').css({'left':0,'top':slider.height4/2+'px', 'height':0}).animate({
												width: settings.width+'px',
												height: settings.height+'px',
												top: "-"+slider.height4/2+"px"
												},time);
					$('#'+slider.prefix+'-sqr-sect-1-1-0').css({'z-index':1, 'opacity':1}).find('img').animate({
												width: 0,
												height: settings.height+'px',
												left: 0
												},time);
					$('#'+slider.prefix+'-sqr-sect-1-1-1').css({'z-index':0, 'opacity':1}).find('img').css({'left':slider.width4/2, 'width':0, 'height': settings.height+'px'}).animate({
												width: settings.width+'px',
												height: settings.height+'px',
												left: "-"+slider.width4/2+"px"
												},time, function(){
																slider.replaceLi();
																slider.reInitSectors();
																slider.setTransition(false);
																slider.autoPlaySlider();
													
												});																																		
					slider.newPosition(position);	
			};
			
			//animation
			var push_left = function(position, time,slider,$sliderImage,settings,dir) {
				
					slider.setTransition(true);
					$('img',$sliderImage[position]).css({'width':0, 'height':settings.height, 'left':(settings.width-5), 'position': 'absolute'});
					$($sliderImage[position]).css({'z-index':1}).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',0);
					$('img',$sliderImage[slider.currentImage]).css({'width':settings.width, 'height':settings.height}).animate({
												width: 0
												},time);
					$('img',$sliderImage[position]).animate({
												width: settings.width,
												left: 0
												},time, function(){
														slider.clearLi();
														slider.clearImg();
														slider.setTransition(false);
														slider.autoPlaySlider();
													
												});
					
					slider.newPosition(position);	
			};
			
			//animation
			var push_up = function(position, time,slider,$sliderImage,settings,dir) {
				
					slider.setTransition(true);
					$('img',$sliderImage[position]).css({'width':settings.width, 'height':0, 'top':(settings.height-5), 'position': 'absolute'});
					$($sliderImage[position]).css({'z-index':1}).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',0);
					$('img',$sliderImage[slider.currentImage]).animate({
												height: 0,
												width:  settings.width
												},time);
					$('img',$sliderImage[position]).animate({
												height: settings.height,
												top: 0
												},time, function(){
														slider.clearLi();														
														slider.clearImg();														
														slider.setTransition(false);
														slider.autoPlaySlider();
											
												});
					
					slider.newPosition(position);	
			};
			
			//animation
			var push_down = function(position, time,slider,$sliderImage,settings,dir) {
				
					slider.setTransition(true);
					$('img',$sliderImage[position]).css({'width':settings.width, 'height':5});
					$('img',$sliderImage[slider.currentImage]).css({'position': 'absolute'});
					$($sliderImage[position]).css({'z-index':1}).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',0);
					$('img',$sliderImage[slider.currentImage]).delay(20).animate({
												top: settings.height,
												height: 0,
												width:  settings.width
												},time, function(){
														slider.clearLi();														
														slider.clearImg();
														slider.setTransition(false);
														slider.autoPlaySlider();
											
												});
					$('img',$sliderImage[position]).animate({
												height: settings.height,
												width: settings.width
												},time);
					
					slider.newPosition(position);	
			};
			
			var push_right = function(position, time,slider,$sliderImage,settings,dir) {
				
					slider.setTransition(true);
					$('img',$sliderImage[position]).css({'width':0, 'height':settings.height, 'left':0, 'position': 'absolute'});
					$('img',$sliderImage[slider.currentImage]).css({'position': 'absolute'});
					$($sliderImage[position]).css({'z-index':1}).show();
					
					$($sliderImage[slider.currentImage]).css('z-index',0);
					$('img',$sliderImage[slider.currentImage]).delay(20).animate({
												width: 0,
												height: settings.height,
												left: settings.width
												},time, function(){
														slider.clearLi();
														slider.clearImg();
														slider.setTransition(false);
														slider.autoPlaySlider();
													
												});
					$('img',$sliderImage[position]).animate({
												width: settings.width,
												height: settings.height,
												left: 0
												},time);
					
					slider.newPosition(position);	
			};
			
			//animation
			var curtain_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: settings.width/2+'px',
									 width: 0
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var curtain_random_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: (Math.random()*settings.width)+'px',
									 width: 0
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var curtain = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: settings.width/2+'px',
									 width: 0
									 },time,'easeOutCirc',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var shrink_angle = function(position, time,slider,$sliderImage,settings,l,t) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: (l*settings.width)+'px',
									 width: 0,
									 height: 0,
									 top: (t*settings.height)+'px'
									 },time,'easeInOutCirc',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var shrink_center_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: settings.width/2+'px',
									 top: settings.height/2+'px',
									 width: 0,
									 height: 0
									 },time,'easeOutBounce' ,function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var srink_random_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: (Math.random()*settings.width)+'px',
									 top: (Math.random()*settings.height)+'px',
									 width: 0,
									 height: 0
									 },time,'easeOutBounce' ,function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var shrink_center = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 left: settings.width/2+'px',
									 top: settings.height/2+'px',
									 width: 0,
									 height: 0
									 },time/2,function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var close_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":1}).show();
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"-"+slider.width4/2+"px"})
							.animate({
									 left: "0px"
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"-"+slider.height4/2+"px"})
							.animate({
									 top: "0px"
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4+"px"})
							.animate({
									 top: slider.height4/2+"px"
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4+"px"})
							.animate({
									 left: slider.width4/2+"px"
									 },time, function(){
												 slider.replaceLi();
												 $('.sectors-bg', slider.slide).hide().css({"background-image": "url('')","opacity":0});										
												 slider.setTransition(false);
												 slider.autoPlaySlider();
									 							});							
					slider.newPosition(position);
			};
			
			//animation
			var open_delay_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":1}).show();
					$($sliderImage[slider.currentImage]).css("z-index","").hide(200);
					$($sliderImage[position]).show(100);
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"0px", top:"0px"})
							.animate({
									 left: "-"+slider.width4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"0px", left:slider.width4/2+"px"})
							.delay(time/4).animate({
									 top: "-"+slider.height4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4/2+"px", left:"0px"})
							.delay(3*time/4).animate({
									 top: slider.height4+"px",
									 opacity:0
									 },time, function(){
																$('.sectors-bg', slider.slide).hide().css({"background-image": "url('')"});
																slider.setTransition(false);
																slider.autoPlaySlider();
										 					});
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4/2+"px", top:slider.height4/2+"px"})
							.delay(2*time/4).animate({
									 left: slider.width4+"px",
									 opacity:0
									 },time);
					slider.newPosition(position);

			};
			
			//animation
			var open_4 = function(position, time,slider,$sliderImage,settings) {
		
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":1}).show();										
					$($sliderImage[slider.currentImage]).hide(200);
					$($sliderImage[position]).show(100);
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"0px", top:"0px"})
							.animate({
									 left: "-"+slider.width4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"0px", left:slider.width4/2+"px"})
							.animate({
									 top: "-"+slider.height4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4/2+"px", left:"0px"})
							.animate({
									 top: slider.height4+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4/2+"px", top:slider.height4/2+"px"})
							.animate({
									 left: slider.width4+"px",
									 opacity:0
									 },time, function(){
															 $('.sectors-bg', slider.slide).hide().css({"background-image": "url('')"});
															 	slider.setTransition(false);
																slider.autoPlaySlider();
									 						});													
					slider.newPosition(position);
			};
			
			//animation
			var close_delay_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":0}).show();
					
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"-"+slider.width4/2+"px"})
							.animate({
									 left: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"-"+slider.height4/2+"px"})
							.delay(time/4).animate({
									 top: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4+"px"})
							.delay(3*time/4).animate({
									 top: slider.height4/2+"px",
									 opacity:1
									 },time,function(){
										 							slider.replaceLi();
												 $('.sectors-bg', slider.slide).hide().css({"background-image": "url('')","opacity":0});
												 					slider.setTransition(false);
																	slider.autoPlaySlider();
									 								});
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4+"px"})
							.delay(2*time/4).animate({
									 left: slider.width4/2+"px",
									 opacity:1
									 },time);
							
					slider.newPosition(position);
			};
			
			//animation
			var close_shift_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":0}).show();
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"-"+slider.width4/2+"px", top:"-"+slider.height4/2+"px"})
							.animate({
									 left: "0px",
									 top: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"-"+slider.height4/2+"px", left:slider.width4+"px"})
							.animate({
									 top: "0px",
									 left: slider.width4/2+"px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4+"px", left:"-"+slider.width4/2+"px"})
							.animate({
									 top: slider.height4/2+"px",
									 left: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4+"px", top:slider.height4+"px"})
							.animate({
									 left: slider.width4/2+"px",
									 top: slider.height4/2+"px",
									 opacity:1
									 },time,function(){
																	slider.replaceLi();
												 					$('.sectors-bg', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
																	
									 						});
							
					slider.newPosition(position);
			};
			
			//animation
			var open_shift_4 = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[slider.currentImage]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":1}).show();
					$($sliderImage[slider.currentImage]).hide(200);
					$($sliderImage[position]).show(100);					
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:"0px", top:"0px"})
							.animate({
									 left: "-"+slider.width4/2+"px",
									 top: "-"+slider.height4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:"0px", left:slider.width4/2+"px"})
							.animate({
									 top: "-"+slider.height4/2+"px",
									 left: slider.width4+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:slider.height4/2+"px", left:"0px"})
							.animate({
									 top: slider.height4+"px",
									 left: "-"+slider.width4/2+"px",
									 opacity:0
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:slider.width4/2+"px", top:slider.height4/2+"px"})
							.animate({
									 left: slider.width4+"px",
									 top: slider.height4+"px",
									 opacity:0
									 },time, function(){
										 							$('.sectors-bg', slider.slide).hide().css({"background-image": "url('')"});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
									 							});														
					slider.newPosition(position);

			};
			
			//animation
			var cross_4  = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');

					$('.sectors-bg', slider.slide).css({"background-image": "url('"+ url +"')","opacity":0}).show();
					
					$('#'+slider.prefix+'-bg-sect-0-0').css({left:slider.width4/2+"px", top:slider.height4/2+"px"})
							.animate({
									 left: "0px",
									 top: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-0-1').css({top:slider.height4/2+"px", left:"-"+slider.width4/2+"px"})

							.animate({
									 top: "0px",
									 left: slider.width4/2+"px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-0').css({top:"0px", left:slider.width4/2+"px"})
							.animate({
									 top: slider.height4/2+"px",
									 left: "0px",
									 opacity:1
									 },time);
					$('#'+slider.prefix+'-bg-sect-1-1').css({left:"0px", top:"0px"})
							.animate({
									 left: slider.width4/2+"px",
									 top: slider.height4/2+"px",
									 opacity:1
									 },time,function(){
										 							slider.replaceLi();
												 					$('.sectors-bg', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
									 								});
							
					slider.newPosition(position);
			};
			
			//animation
			var blind_right_fade = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');

					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0});

					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(i*time/settings.vert_sections).animate({
										  opacity:1
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay((settings.vert_sections-1)*time/settings.vert_sections).animate({
										  opacity:1
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var blind_right_all = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('#'+slider.prefix+'-v0').css("width");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, 'display':'none'});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).show(time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).show(time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0,'display':''});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var blind_right_ = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('#'+slider.prefix+'-v0').css("width");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1});
					
						$('#'+slider.prefix+'-v'+0).animate({
										  width: 0,
										  left: width
										  },(time/settings.vert_sections),'easeInExpo',function(){
											  $('#'+slider.prefix+'-v'+0).css({"background-image": "url('')","background-color":"#FFF","z-index":1});})
											.animate({
												  width: width,
												  left: width
										  },(time/settings.vert_sections),'easeOutExpo',function(){
											  	$('#'+slider.prefix+'-v'+1).hide();})
						
//					var i=1;
					for (var i=1; i < settings.vert_sections-1; i++){
							$('#'+slider.prefix+'-v'+0).animate({
													  width: 0,
													  left: ((i+1)*parseInt(width))+'px'
												  },(time/settings.vert_sections),'easeInCirc')
												.animate({
													  width: width,
													  left: ((i+1)*parseInt(width))+'px'
												  },(time/settings.vert_sections),'easeOutCirc',function(){
											  	$('#'+slider.prefix+'-v'+(parseInt($(this).css('left'))/parseInt(width))).hide();});
								};				
/*					
							$('#'+slider.prefix+'-v'+0).animate({
													  width: 0,
													  left: ((i+1)*parseInt(width))+'px'
												  },(time/settings.vert_sections),'easeInExpo')
												.animate({
													  width: width,
													  left: ((i+1)*parseInt(width))+'px'
												  },(time/settings.vert_sections),'easeOutExpo',function(){
														$('#'+slider.prefix+'-v'+(i)).hide();});
					
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).animate({
										  width: width
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
*/					slider.newPosition(position);
			};
			
			var blind_right = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('#'+slider.prefix+'-v0').css("width");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "width":0});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).animate({
										  width: width
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).animate({
										  width: width
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var blind_right_wave = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('#'+slider.prefix+'-v0').css("width");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "width":0});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(i*time/settings.vert_sections).animate({
										  width: width
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay((settings.vert_sections-1)*time/settings.vert_sections).animate({
										  width: width
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var blind_right_wave_full = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('#'+slider.prefix+'-v0').css("width");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "width":0});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(i*time/settings.vert_sections/2).animate({
										  width: width
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay(time/2).animate({
										  width: width
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var showImage_blind_down_cons_full = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":"-"+height});					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(i*time/settings.vert_sections/2).animate({
										  top: "0px"
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay(time/2).animate({
										  top: "0px"
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var blind_down_right = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":"-"+height});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(i*time/settings.vert_sections).animate({
										  top: "0px"
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay(time).animate({
										  top: "0px"
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();																	
										  });
					slider.newPosition(position);				
			};
			
			//animation
			var blind_down_up__wave = function(position, time,slider,$sliderImage,settings,t,easing) {
				
					slider.setTransition(true);
//					if(b) var easing = 'easeOutCirc';
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					
					$('.v-sectors:even', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":"-"+height});
					$('.v-sectors:odd', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":height});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).delay(t*i*time/settings.vert_sections).animate({
										  top: "0px"
										  },time,easing);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).delay(t*time).animate({
										  top: "0px"
										  },time,easing, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();																	
										  });
					slider.newPosition(position);				
			};
			
			//animation
			var blind_down_up_fade = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					
					$('.v-sectors:even', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0, "top":"-"+height});
					$('.v-sectors:odd', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0, "top":height});
					
					for (var i=0; i < settings.vert_sections-1; i++){
						$('#'+slider.prefix+'-v'+i).animate({
										  top: "0px",
										  opacity:1
										  },time);
					}
					
					$('#'+slider.prefix+'-v'+(settings.vert_sections-1)).animate({
										  top: "0px",
										  opacity:1
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();																	
										  });
					slider.newPosition(position);				
			};
			
			//animation
			var blind_down_center = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					var center = Math.ceil(settings.vert_sections/2);
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":"-"+height});
					;
					for (var i=1; i < center; i++){
						$('#'+slider.prefix+'-v'+(center-i)).delay(i*time/settings.vert_sections).animate({
										  top: "0px"
										  },time);
						$('#'+slider.prefix+'-v'+(center-1+i)).delay(i*time/settings.vert_sections).animate({
										  top: "0px"
										  },time);
					}
					$('#'+slider.prefix+'-v'+(2*center-1)).delay(time/2).animate({
										  top: "0px"
										  },time);
					$('#'+slider.prefix+'-v0').delay(time/2).animate({
										  top: "0px"
										  },time, function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			var blind_down_random = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('#'+slider.prefix+'-v0').css("height");
					var center = Math.ceil(settings.vert_sections/2);
					
					$('.v-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, "top":"-"+height});
					;
					$('.v-sectors', slider.slide).not(':first').each(function(){
											$(this).delay(Math.random()*center*time/settings.vert_sections).animate({
										  top: "0px"
										  },time,'easeOutBack')});
					$('#'+slider.prefix+'-v0').delay(center*time/settings.vert_sections).animate({
										  top: "0px"
										  },time,'easeOutBack', function(){
											  						slider.replaceLi();
																	$('.v-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																	slider.setTransition(false);
																	slider.autoPlaySlider();
										  });
					slider.newPosition(position);
			};
			
			//animation
			var line_down = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('.sqr-sectors', slider.slide).css('height');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')"});
						var newTop;				
						for (var y = (settings.sqr_sections_Y-1); y >=0  ; y--){
							for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == 0) && i == (settings.sqr_sections_X-1)){
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');	
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).delay(((1-y/settings.sqr_sections_Y)*time/2)).animate({
												top : newTop
												},time/2, function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
												});	
							continue;
							}
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).	delay(((1-y/settings.sqr_sections_Y)*time/2)).animate({
												top : newTop
												},time/2);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};
			
			//animation
			var sqr_down = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('.sqr-sectors', slider.slide).css('height');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')"});

						var newTop;				
						for (var y = (settings.sqr_sections_Y-1); y >=0  ; y--){
							for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == 0) && i == (settings.sqr_sections_X-1)){
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');	
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).delay((settings.sqr_sections_Y-y)*time/3+(i*time/3-15*i*i)).animate({
												top : newTop
												},time, function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
												});	
							continue;
							}
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).delay((settings.sqr_sections_Y-y)*time/3+(i*time/3-15*i*i)).animate({
												top : newTop
												},time);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};

			//animation
			var line_down_revers = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var height = $('.sqr-sectors', slider.slide).css('height');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')"});

						var newTop;				
						for (var y=0; y < settings.sqr_sections_Y ; y++){
							for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == (settings.sqr_sections_Y-1)) && i == (settings.sqr_sections_X-1)){
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');	
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).delay((y*time/settings.sqr_sections_Y/2)).animate({
												top : newTop
												},time/2, function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													});	
							continue;
							}
							newTop = $('#'+slider.prefix+'-sqr-'+i+'-'+y).css('top');
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).css({'top': '-'+height, "opacity":1}).delay((y*time/settings.sqr_sections_Y/2)).animate({
												top : newTop
												},time/2);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};
			
			//animation
			var sqr_down_expand = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var del = settings.sqr_sections_Y;//*settings.sqr_sections_X;

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, 'display': 'none'});

											
						for (var y=0; y < settings.sqr_sections_Y ; y++){
							for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == (settings.sqr_sections_Y-1)) && i == (settings.sqr_sections_X-1)){
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).show(time*3/4+y*(time/4)/del, function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0,'display':''});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													});	
							continue;
							}

							$('#'+slider.prefix+'-sqr-'+i+'-'+y).show(time*3/4+y*(time/4)/del);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};
			
			//animation
			var sqr_expand = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, 'display':'none'});
					
					for (var y=0; y < settings.sqr_sections_Y ; y++){
						for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == (settings.sqr_sections_Y-1)) && i == (settings.sqr_sections_X-1)){
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).show(time,function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0, 'display':''});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													});	
							continue;
							}

							$('#'+slider.prefix+'-sqr-'+i+'-'+y).show(time);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};
			
			//animation
			var sqr_fade = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0});
					
					for (var y=0; y < settings.sqr_sections_Y ; y++){
						for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == (settings.sqr_sections_Y-1)) && i == (settings.sqr_sections_X-1)){
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).delay(i*time/settings.sqr_sections_X + y*time/settings.sqr_sections_Y).animate({
											  opacity: 1
											  },time, function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													});	
							continue;
							}

							$('#'+slider.prefix+'-sqr-'+i+'-'+y).delay(i*time/settings.sqr_sections_X + y*time/settings.sqr_sections_Y).animate({
											  opacity: 1
											  },time);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};
			
			var sqr_fade_down = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0});
					
					for (var y=0; y < settings.sqr_sections_Y ; y++){
						for (var i=0; i < settings.sqr_sections_X; i=i+2){
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).delay(200+y*time/settings.sqr_sections_Y).animate({
											  opacity: 1
											  },time);	
							$('#'+slider.prefix+'-sqr-'+(i+1)+'-'+y).delay(y*time/settings.sqr_sections_Y).animate({
											  opacity: 1
											  },time);	

						}
						
					}									
					var toStart = function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													};
					setTimeout(toStart,200+2*time);
					slider.newPosition(position);
					
				
			};
			
			//animation
			var sqr_random = function(position, time,slider,$sliderImage,settings) {

					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var randomPositions = new Array();
					var pos= 0;
					var oldPos, newPos;
					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":0});
					
					for (var y=0; y < settings.sqr_sections_Y ; y++){
						for (var i=0; i < settings.sqr_sections_X; i++){
							
							randomPositions[pos] = '#'+slider.prefix+'-sqr-'+i+'-'+y;
							pos++;														
						}
					}
					for (var i = 0; i < pos; i++){
						
						oldPos = Math.floor(Math.random()*pos);
						newPos = randomPositions[i];
						randomPositions[i] = randomPositions[oldPos];
						randomPositions[oldPos] = newPos;												
					}
					
					for (var i = 0; i < pos-1; i++){
						
						$(randomPositions[i]).delay((time*i)/(2*pos)).animate({
											  opacity: 1
											  },time/2);													
					}
					
					$(randomPositions[pos-1]).delay((time*i)/(2*pos)).animate({
											  opacity: 1
											  },time/2, function(){
							  											slider.replaceLi();
																		$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0});
																		slider.setTransition(false);
											  							slider.autoPlaySlider();
																		});
					
					slider.newPosition(position);				
			};
						
/****************************************************************************************************************/

			var curtain_open = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css({'z-index':2, 'left':settings.width/2, 'width':0}).animate({
									 left: 0,
									 width: settings.width+'px'
									 },time,'easeOutCirc',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};


			var curtain_open_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css({'z-index':1,'left':settings.width/2, 'width':0}).animate({
									 left: 0,
									 width: settings.width+'px'
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();

																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var curtain_open_random_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css({'z-index':1,'left':(Math.random()*settings.width)+'px', 'width':0}).animate({
									 left: 0,
									 width: settings.width+'px'
									 },time,'easeOutBack',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			var h_curtain_open = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css({'z-index':1, 'top':settings.height/2, 'height':0}).animate({
									 top: 0,
									 height: settings.height+'px'
									 },time,'easeOutCirc',function(){
										 						slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};


			var h_curtain_open_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
//					$($sliderImage[slider.currentImage]).show();					
					$($sliderImage[position]).css({'z-index':1,'top':settings.height/2, 'height':0}).animate({
									 top: 0,
									 height: settings.height+'px'
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();

																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var h_curtain_open_random_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
//					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[position]).css({'z-index':1,'top':(Math.random()*settings.height)+'px', 'height':0}).animate({
									 top: 0,
									 height: settings.height+'px'
									 },time,'easeOutBack',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			var h_curtain_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 top: (settings.height/2)+'px',
									 height: 0
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var h_curtain_random_bounce = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 top: (Math.random()*settings.height)+'px',
									 height: 0
									 },time,'easeOutBounce',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			//animation
			var h_curtain = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[position]).css('z-index',1).show();					
					$($sliderImage[slider.currentImage]).css('z-index',2).animate({
									 top: settings.height/2+'px',
									 height: 0
									 },time,'easeOutCirc',function(){
						  										slider.clearLi();
																slider.setTransition(false);
																slider.autoPlaySlider();
																});
					slider.newPosition(position);	
			};
			
			var sqr_expand_center = function(position, time,slider,$sliderImage,settings) {
				
					slider.setTransition(true);
					$($sliderImage[slider.currentImage]).show();
					var url = $('img',$sliderImage[position]).attr('src');
					var width = $('.sqr-sectors', slider.slide).css('width');
					var height = $('.sqr-sectors', slider.slide).css('height');
					var widthI = parseInt(width);
					var heightI = parseInt(height);

					
					$('.sqr-sectors', slider.slide).show().css({"background-image": "url('"+ url +"')","opacity":1, 'width':0,'height':0, 'left': '+='+(widthI/2), 'top': '+='+(heightI/2) });
					
					for (var y=0; y < settings.sqr_sections_Y ; y++){
						for (var i=0; i < settings.sqr_sections_X; i++){
							if((y == (settings.sqr_sections_Y-1)) && i == (settings.sqr_sections_X-1)){
							$('#'+slider.prefix+'-sqr-'+i+'-'+y).animate({
														top:	'-='+(heightI/2)+'px',
														left:	'-='+(widthI/2)+'px',
														width: width,
														height: height
													},2000,function(){
												  	slider.replaceLi();
													$('.sqr-sectors', slider.slide).hide().css({"background-image": "url('')","opacity":0, 'display':''});
													slider.setTransition(false);
											  		slider.autoPlaySlider();
													});	
							continue;
							}

							$('#'+slider.prefix+'-sqr-'+i+'-'+y).animate({
														top:	'-='+(heightI/2)+'px',
														left:	'-='+(widthI/2)+'px',
														width: width,
														height: height
													},2000);	
													
						}
						
					}										
					slider.newPosition(position);
					
				
			};