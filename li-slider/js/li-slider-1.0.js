/**
 * jQuery Li Slider 
 * Copyright (c) 2010 Spotnil (http://spotnil.com)
 * Version: 0.1 (11/15/2010)
 */
(function($) {	
		  		  
		  
	$.fn.sp_Li_Slider = function(client_settings) {
		
		var default_settings = { 	
			width				:	'',
			height				:	'',
			auto_play 			: 	true,
			auto_hide 			: 	true,
			delay     			: 	3000,
			trans_period		:	1000,
			animation			:   "Fade",
			effect				:	false,
			vert_sections		:	15,
			sqr_sections_Y		:	5,
			sqr_sections_X		:	0,
			buttons_show		:	true,
			transitions			:   '',
			active_links		:	true,
			buttons_hide_time 	:	3000,
			buttons_hide_delay	:	500,
			buttons_show_time	:	500,
			buttons_show_delay	:	500
		};
				
		
		var settings = $.extend({}, default_settings, client_settings);

		return this.each(
			function() {
				var slider = new Slider($(this),settings);
				slider.init();
			}
		);
		
	};
		// class Slider
		function Slider($newSlider,settings) {

				var oSlider = this;
				var $slider = $($newSlider);
				this.slide = $slider;
				settings.width = parseInt($slider.css('width'));
				settings.height = parseInt($slider.css('height'));				
				this.prefix = $slider.attr('id');
				var $sliderImage = $slider.find('ul').first().children();
				var container;
				this.currentImage, this.prevPosition;
				var numberImages;
				var playSliderRec = null;
				var activeButtons ;
				var $play_btn, $pause_btn;
				var sections = '';
				var animRandom = 0, animCons = 0;
				var animList;
				var showContent;
				var inTransition;
				this.width4, this.height4, this.width2, this.height2;
				var easing = new Array("linear","swing","easeInQuad","easeOutQuad","easeInOutQuad","easeInCubic","easeOutCubic","easeInOutCubic","easeInQuart","easeOutQuart","easeInOutQuart","easeInQuint","easeOutQuint","easeInOutQuint","easeInSine","easeOutSine","easeInOutSine","easeInExpo","easeOutExpo","easeInOutExpo","easeInCirc","easeOutCirc","easeInOutCirc","easeInElastic","easeOutElastic","easeInOutElastic","easeInBack","easeOutBack","easeInOutBack","easeInBounce","easeOutBounce","easeInOutBounce");
				var easingNumber=0;					 

				
				// init class Slider
				this.init = function() {
				oSlider.currentImage = 0;
				numberImages = $sliderImage.length;
				fixLi();
				initFirstImg();
				if(settings.buttons_show){
					initButtons();
					initPointers();
					initActiveButtons();
				}else initPlayPause();
				initAttributes();
				if(settings.active_links)
					initLinks();
				initStructure();
				initAnimation();
								
				if (settings.auto_play)
					playSlider();				
			};
			// check animation in progress
			var inProgres = function(fun){

			if 	(inTransition) {

			}else
			
					fun();
			};
			// check animation in progress
			var inProgresSpec = function(pos,time){
				if 	(inTransition) {
				}else {
					var time = $($sliderImage[pos]).data('time');
					if (!time) time = settings.trans_period;
					showContent(pos,time);
				}
			};
				
			// init Buttons	
			var initButtons = function() {
				
					var $prev_btn = $('<div class="prev-btn"></div>');
					var $next_btn = $('<div class="next-btn"></div>');
					$play_btn = $('<div class="play-btn"></div>');
					$pause_btn = $('<div class="pause-btn"></div>');
					
					$prev_btn	.click(function(event){event.preventDefault();
													stopSlider();													
													inProgres(showPrevImage);})
								.css('display', 'none');
					
					$next_btn	.click(function(event){event.preventDefault();
														stopSlider();
														inProgres(showNextImage);})
								.css('display', 'none');
					
					$play_btn	.click(function(event){event.preventDefault();
														activeButtons = activeButtons.add( $pause_btn.show()).not( $play_btn.hide());
														startSlider();})
								.css('display', 'none');
					
					$pause_btn	.click(function(event){event.preventDefault();
														stopSlider();})
								.css('display', 'none');
					$slider.append($prev_btn);
					$slider.append($next_btn);
					$slider.append($play_btn);
					$slider.append($pause_btn);					
					
					activeButtons = $( [] ).add( $prev_btn ).add( $next_btn );
					if (settings.auto_play) activeButtons = activeButtons.add( $pause_btn );
					else activeButtons = activeButtons.add( $play_btn );
					
			};
			
			//init Play Pause for outside use
			var initPlayPause = function() {
									
					$play_btn = $('<div class="play-btn"></div>');
					$pause_btn = $('<div class="pause-btn"></div>');
											
					$play_btn	.click(function(event){event.preventDefault();
														startSlider();})
								.css('display', 'none');
					
					$pause_btn	.click(function(event){event.preventDefault();
														stopSliderDistance();})
								.css('display', 'none');
					$slider.append($play_btn);
					$slider.append($pause_btn);					
			};
			
			//init Pointers
			var initPointers = function() {
				
				var allPointers = $('<div class="nav-btns" ></div>').css('display', 'none');
				
				for (i=1;i<=numberImages;i++){
					var $pointer = $('<div class="nav-btn"></div>');
					$pointer.click(function(event) {	event.preventDefault();
														if (!$(this).hasClass('current-slide')){
																stopSlider();
																inProgresSpec($(this).index());}})	;							
					$($pointer).appendTo(allPointers);
					
				}
				activeButtons = activeButtons.add( allPointers);
				$slider.append(allPointers);
				$($(".nav-btns",$slider).find('.nav-btn')[oSlider.currentImage]).addClass('current-slide');
					
			};
			
			var fixLi = function() {
				
				for ( var i=0; i < $sliderImage.size(); i++){												
				
					var img = $($sliderImage[i]).find('img:first');
					var a = $($sliderImage[i]).find('a:first');
					if (a.attr('href')) {
						a.html(img);
						$($sliderImage[i]).html(a);
					}else $($sliderImage[i]).html(img);
				}
			};

			
			//init First Image
			var initFirstImg = function() {
				
				$($sliderImage[oSlider.currentImage]).show();
				$($slider).css({"background-image": "url('')"});   							
				if(settings.effect) 
				playEffect();
			};
			
			//init Active Buttons
			var initActiveButtons = function() {
				if (settings.auto_hide){
						if (settings.auto_play) activeButtons.show().delay(settings.buttons_hide_time).fadeOut(settings.buttons_hide_delay);
						$slider.not(activeButtons)	.mouseenter(function(){activeButtons.stop(true,true).delay(settings.buttons_show_delay).fadeIn(settings.buttons_show_time);})
								.mouseleave(function(){activeButtons.delay(settings.buttons_hide_time).fadeOut(settings.buttons_hide_delay);});
//						$slider.not(activeButtons)	.mouseenter(function(){activeButtons.stop(true,true).delay(settings.buttons_show_delay).fadeIn(settings.buttons_show_time);})
//								.mouseleave(function(){activeButtons.delay(settings.buttons_hide_time).fadeOut(settings.buttons_hide_delay);});

				}else activeButtons.show();									
			};
			
			//init Links
			var initLinks = function(){
				
				
				$slider.mouseup(function(event){
								
								if ($(event.target).parent().is('div.li-banner-image-wrap') || $(event.target).is('div.li-banner-image-wrap'))  {
	
										var info_link = $($sliderImage[oSlider.currentImage]).find('>a').attr('href');
										if (info_link)
										document.location.href = info_link;
									}
								});
				
			};
			
			//init Attributes
			var initAttributes = function() {
				
				var image = 0;
				var nov, custClass, custClasses, transition, delay, time;
				
				for ( image; image < $sliderImage.size(); image++){
						
						custClass = $($sliderImage[image]).attr('class');
						custClasses = custClass.split(' ');
						for (i=0; i < custClasses.length; i++){
							
								if( custClasses[i].indexOf('transition_') > -1)
								transition = custClasses[i].replace('transition_','');
								if( custClasses[i].indexOf('delay_') > -1)
								delay = custClasses[i].replace('delay_','');
								if( custClasses[i].indexOf('time_') > -1)
								time = parseInt(custClasses[i].replace('time_',''));

						}

						$($sliderImage[image]).data({'delay':delay, 'transition': transition, 'time':time});
						delay = '';
						transition = '';
						time = '';
					}
				
				if (settings.animation == 'Regular' || settings.animation == 'Random'){
						animList = new Array();
						var i = 0;
						for (key in animations){
							animList[i] = key;
							i++;							
						}
						animList = animList.slice(0,-6);
				}
				if (settings.animation == 'Regular-Exception' || settings.animation == 'Random-Exception'){
						animList = new Array();
						var animListEx = settings.transitions.split(' ');
						var i = 0;
						for (key in animations){
							if($.inArray(key, animListEx)>=0) continue;
							animList[i] = key;
							i++;							
						}
						animList = animList.slice(0,-6);
				}
				if (settings.animation == 'Regular-Custom' || settings.animation == 'Random-Custom'){
					
					animList = settings.transitions.split(' ');										

				}
				if (settings.animation == 'Random' || settings.animation == 'Random-Custom' || settings.animation == 'Random-Exception'){
										
					var oldVal, newVal;
					for (i = 0; i < animList.length; i++){
						newVal = Math.floor(Math.random()*(animList.length));
						oldVal = animList[i];						
						animList[i] = animList[newVal];
						animList[newVal] = oldVal;
					}					
				}
				
			};
			
			//init Structure
			var initStructure = function(){								
			
				container = $('<div class="li-banner-image-wrap" ></div>').css({'position': 'absolute', 'top': '0px', 'left': '0px', 'overflow': 'hidden','height':settings.height, 'width':settings.width, 'z-index': -10}); 
				$('ul',$slider).before(container);
				
				if ((settings.animation == 'Random') || (settings.animation == 'Regular')){
					
					initSections();
					init_2_X_Sections();
					initBgSections();
					initVertSections();
					initSqrSections();
				}else{
				
				var animStructure = [0,0,0,0,0,0];

				for ( var image=0; image < $sliderImage.size(); image++){
						
						var anim = $($sliderImage[image]).data('transition');
						if(anim && animations[anim]) {
							animStructure[animations[anim][2]] ++;
						}
					}
				if (animations[settings.animation]){
					animStructure[animations[settings.animation][2]] ++;
					if (animations[settings.animation][0] >= animations['Regular-Custom'][0]){
						
						for(var i=0; i< animList.length; i++){
							if(animations[animList[i]])
							animStructure[animations[animList[i]][2]] ++;
							else animList[i] = 'None';
						}
					}
				}else settings.animation = 'None';
				
				if(animStructure[1]>0)
					init_2_X_Sections();
				
				if(animStructure[2]>0)
					initBgSections();

				if(animStructure[3]>0)
					initSections();
				
				if(animStructure[4]>0)
					initVertSections();
					
				if(animStructure[5]>0)
					initSqrSections();
				};	
				
			};
			
			//init Sections - 2*2
			var initSections = function() {
				
				var sqr_sections, sqr_section, image, sectionsX = 2, sectionsY = 2, sectionsZ = 2 ;
				var url="";// = $('img',$sliderImage[oSlider.currentImage]).attr('src');
				var xPos, tOffset;
				var width = Math.ceil(parseInt(settings.width)/sectionsX);
				oSlider.width4 = width*2;
				var height = Math.ceil(parseInt(settings.height)/sectionsY);
				oSlider.height4 = height*2;
								
				for ( var y=0; y < sectionsY; y++){
					for ( var i=0; i < sectionsX; i++){
						for ( var z=0; z < sectionsZ; z++){
												
						sqr_section=$('<div class="li-sectors'+z+'" id="'+oSlider.prefix+'-sqr-sect-'+y+'-'+i+'-'+z+'" style="left:'+i*width+'px; top: '+y*height+'px; width:'+width+'px; height:'+height+'px; position: absolute; display: none; overflow: hidden;  z-index:-100">');
						image = '<img src="'+url+'" alt="Pic '+y+'.'+i+'" style="position: absolute; left: -'+i*width+'px; top: -'+y*height+'px" />';
						$(sqr_section).html(image);

						sqr_sections = $(sqr_sections).add(sqr_section);
						}
													
					}
				}
				$(container,$slider).append(sqr_sections);
//				oSlider.reInitSectors();
				
					
			};
			// init Sections 2*1
			var init_2_X_Sections = function() {
				
				var sections_2, section_2, image, sectionsX = 2, sectionsY = 1, sectionsZ = 2 ;
				var url="";// = $('img',$sliderImage[oSlider.currentImage]).attr('src');
				var xPos, tOffset;
				var width = Math.ceil(parseInt(settings.width)/sectionsX);
				oSlider.width2 = width*2;
				var height = Math.ceil(parseInt(settings.height)/sectionsY);
				oSlider.height2 = height;
								
				for ( var y=0; y < sectionsY; y++){
					for ( var i=0; i < sectionsX; i++){
						for ( var z=0; z < sectionsZ; z++){
												
						section_2=$('<div class="li-sectors_2_X-'+z+'" id="'+oSlider.prefix+'-sect-2-x-'+y+'-'+i+'-'+z+'" style="left:'+i*width+'px; top: '+y*height+'px; width:'+width+'px; height:'+height+'px; position: absolute; display: none; overflow: hidden;">');
						image = '<img src="" alt="Pic '+y+'.'+i+'" style="position: absolute; left: -'+i*width+'px; top: -'+y*height+'px;" />';
						$(section_2).html(image);

						sections_2= $(sections_2).add(section_2);
						}
													
					}
				}
				$(container,$slider).append(sections_2);
//				oSlider.reInit_2_X_Sectors();
				
					
			};
			//init Sections 2*2 with bg images
			var initBgSections = function() {
				
				var section, sectionsX = 2, sectionsY = 2 ;
				var bgColor = $slider.css("background-color");
				var url = $('img',$sliderImage[oSlider.currentImage]).attr('src');
				var xPos, tOffset;
				var width = Math.ceil(parseInt(settings.width)/sectionsX);
				oSlider.width4 = width*2;
				var height = Math.ceil(parseInt(settings.height)/sectionsY);
				oSlider.height4 = height*2;
								
				for ( var y=0; y < sectionsY; y++){
					for ( var i=0; i < sectionsX; i++){
												
						section = '<div class="sectors-bg" id="'+oSlider.prefix+'-bg-sect-'+y+'-'+i+'" style="left:'+i*width+'px; top: '+y*height+'px; width:'+width+'px; height:'+height+'px; position: absolute; display: none;" >';

						sections = $(sections).add($(section).css({background:bgColor + " url('"+ url +"') no-repeat ", backgroundPosition:-i*width + "px " + -y*height + "px ", "z-index":-100 }));
													
					}
				}
				$(container,$slider).append(sections);
				
					
			};
			// init Sections - Vertical
			var initVertSections = function() {
				
				var section, sectionsX = settings.vert_sections;
				var bgColor = $slider.css("background-color");
				var url="";// = $('img',$sliderImage[oSlider.currentImage]).attr('src');				
				var width = Math.ceil(parseInt(settings.width)/sectionsX);
				var sectionsXRed = Math.ceil(settings.width/width);
				settings.vert_sections = sectionsXRed;
				var height = parseInt(settings.height);

				
					for ( i=0; i < sectionsXRed; i++){
												
						section = '<div class="v-sectors" id="'+oSlider.prefix+'-v'+i+'" style="left:'+i*width+'px; top: 0px; width:'+width+'px; height:'+height+'px; position: absolute; display: none" >';

						sections = $(sections).add($(section).css({background:bgColor + " url('"+ url +"') no-repeat ", backgroundPosition:-i*width + "px 0px " }));
													
					}
				$(container,$slider).append(sections);
				
					
			};
			//init Sections Squares
			var initSqrSections = function() {
				
				var section, sectionsY = settings.sqr_sections_Y, sectionsX ;
				var bgColor = $slider.css("background-color");
				var url="";// = $('img',$sliderImage[oSlider.currentImage]).attr('src');				
				var height = Math.ceil(settings.height/sectionsY);
				var sectionsYRed = Math.ceil(settings.height/height);
				settings.sqr_sections_Y = sectionsYRed;
				sectionsX = Math.ceil(settings.width/height);
				settings.sqr_sections_X = sectionsX;
				var width = height;

				for (y = 0; y < sectionsYRed; y++){
					for ( i=0; i < sectionsX; i++){
												
						section = '<div id="'+oSlider.prefix+'-sqr-'+i+'-'+y+'" class="sqr-sectors" style="left:'+i*width+'px; top: '+y*height+'px; width:'+width+'px; height:'+height+'px; position: absolute; display: none" >';

						sections = $(sections).add($(section).css({background:bgColor + " url('"+ url +"') no-repeat ", backgroundPosition:-i*width + "px " + -y*height + "px "}));
													
					}
				}
				$(container,$slider).append(sections);
				
					
			};
			
			
			//init Animation effect
			var initAnimation = function() {
				
				var funcName = animations[settings.animation][1];
				if (funcName == showImage_random){
					showContent = function(pos,time){
								showImage_random(pos,time,animations[settings.animation][3],false);
							};
				}else{
					var anim = animations[settings.animation];
					if (typeof funcName == 'string' && eval('typeof ' + funcName) == 'function') {
						var arg = animations[settings.animation][3];
						if (arg) arg = ','+arg+'';
						else arg = '';
						showContent = function(pos,time){
									eval(funcName+'('+pos+','+time+',oSlider,$sliderImage,settings'+arg+')');
								};					
					}else {
						showContent = function(pos,time){									
									showImage(pos,time);
								};
					}
				}
				
			};

			// Show next image
			var showNextImage = function() {
				
					var pos = (oSlider.currentImage<(numberImages-1))?(oSlider.currentImage+1):(0);
					var transition = $($sliderImage[pos]).data('transition');
					var time = $($sliderImage[pos]).data('time');
					if (!time) time = settings.trans_period;
					if(transition)
					showImage_random(pos,time,'',transition);
					else showContent(pos,time);					
					
			};
			// Show prev image
			var showPrevImage = function() {

					
					var pos = (oSlider.currentImage>0)?(oSlider.currentImage-1):(numberImages-1);
					var transition = $($sliderImage[pos]).data('transition');
					var time = $($sliderImage[pos]).data('time');
					if (!(time || time != '')) time = settings.trans_period;
					if(transition)
					showImage_random(pos,time,'',transition);
					else showContent(pos,time);
			};
			
			//change position
			this.newPosition = function(position) {
				
				$($(".nav-btns",$slider).find('.nav-btn')[oSlider.currentImage]).removeClass('current-slide');				
				$($(".nav-btns",$slider).find('.nav-btn')[position]).addClass('current-slide');
				
				oSlider.prevPosition = oSlider.currentImage;
				oSlider.currentImage = position;	
//				return position;				
			};
			
			this.setTransition = function(val){
				
				inTransition = val;
				if(!inTransition){
					var info_link = $($sliderImage[oSlider.currentImage]).find('>a').attr('href');
					if (info_link)
						$('div.li-banner-image-wrap').css({cursor:'pointer'});
					else 
						$('div.li-banner-image-wrap').css({cursor:'default'});
				}
				if(settings.effect){
					if(!val){
						playEffect();						
					}
						
				}
			};
			//spacial efect played during slider shows image
			var playEffect = function(){

				$('img',$sliderImage[oSlider.currentImage]).css({'width':settings.width, 'height':settings.height , 'left':0,'position':'absolute'}).animate({
								width: (settings.width+80)+'px',
								height: (settings.height+80)+'px',
								left: '- 40px',
								top: '- 20px'								
								}, settings.delay*2, 'linear',function(){ 
											$('img',$sliderImage[prevPosition]).css({'width':'', 'height':'' , 'left':'','position':''})});
			};
			
			//play Slider
			var playSlider = function(){
				
				var currDelay = $($sliderImage[oSlider.currentImage]).data('delay');
				
				if (isNaN(currDelay) || currDelay == '')
				currDelay = settings.delay;				
				playSliderRec = setTimeout(showNextImage,Number(currDelay));
			};
			
			var startSlider = function(){
				if (!settings.auto_play){
					settings.auto_play = true;
					if (!inTransition){							
							playSlider();
					}
				}
			};
			
			//stop Slider
			var stopSlider = function(){
				
				activeButtons = activeButtons.add( $play_btn.show()).not( $pause_btn.hide());
				clearTimeout(playSliderRec);
				playSliderRec = null;
				settings.auto_play = false;				
			};
			
			//stop Slider from outside
			var stopSliderDistance = function(){
				
				clearTimeout(playSliderRec);
				playSliderRec = null;
				settings.auto_play = false;				
			};
			
			//auto play
			this.autoPlaySlider = function(){
				if (settings.auto_play)
					playSlider();
			};
						
			//animation
			var showImage = function(position,time) {
					
					oSlider.setTransition(true);
					$($sliderImage[oSlider.currentImage]).hide();
					$($sliderImage[position]).show();
					oSlider.newPosition(position);
					oSlider.setTransition(false);
					oSlider.autoPlaySlider();
			};
			
			//claer li
			this.clearLi = function(){
					
					$($sliderImage[oSlider.prevPosition]).css({'z-index':'','left': '', 'top':'', 'width':'', 'height': '', 'opacity': '' }).hide();
					$($sliderImage[oSlider.currentImage]).css({'z-index':'','left': '', 'top':'', 'width':'', 'height': '', 'opacity': '' });
			};
			
			//clear image
			this.clearImg = function(){										
					$('img',$sliderImage[oSlider.prevPosition]).removeAttr("style");
					$('img',$sliderImage[oSlider.currentImage]).removeAttr("style");
			};
			
			// replace li
			this.replaceLi = function(){										
					$($sliderImage[oSlider.prevPosition]).hide();
					$($sliderImage[oSlider.currentImage]).show();
			};						
			
			//re init 2_X_Sectors
			this.reInit_2_X_Sectors = function(){
				
				$('.li-sectors_2_X-0',$slider).hide().css({'z-index': '','opacity':0 });
				$('.li-sectors_2_X-1',$slider).hide().css({'z-index': '','opacity':0 });
				$('#'+oSlider.prefix+'-sect-2-x-0-0-0').find('img').css({'left': 0, 'top':0, 'width':'', 'height':'' });
				$('#'+oSlider.prefix+'-sect-2-x-0-0-1').find('img').css({'left': 0, 'top':0, 'width':'', 'height':''});
				$('#'+oSlider.prefix+'-sect-2-x-0-1-0').find('img').css({'left': '-'+oSlider.width2/2+'px', 'top':0, 'width':'', 'height':'' });
				$('#'+oSlider.prefix+'-sect-2-x-0-1-1').find('img').css({'left': '-'+oSlider.width2/2+'px', 'top':0, 'width':'', 'height':'' });				
			};
			
			//re init Sectors
			this.reInitSectors = function(){
				
				$('.li-sectors0',$slider).hide().css({'z-index': '','opacity':0 });
				$('.li-sectors1',$slider).hide().css({'z-index': '','opacity':0 });
				$('#'+oSlider.prefix+'-sqr-sect-0-0-0').find('img').css({'left': 0, 'top':0 });
				$('#'+oSlider.prefix+'-sqr-sect-0-0-1').find('img').css({'left': 0, 'top':0 });
				$('#'+oSlider.prefix+'-sqr-sect-0-1-0').find('img').css({'left': '-'+oSlider.width4/2+'px', 'top':0 });
				$('#'+oSlider.prefix+'-sqr-sect-0-1-1').find('img').css({'left': '-'+oSlider.width4/2+'px', 'top':0 });
				$('#'+oSlider.prefix+'-sqr-sect-1-0-0').find('img').css({'left': 0, 'top':'-'+oSlider.height4/2+'px' });
				$('#'+oSlider.prefix+'-sqr-sect-1-0-1').find('img').css({'left': 0, 'top':'-'+oSlider.height4/2+'px' });
				$('#'+oSlider.prefix+'-sqr-sect-1-1-0').find('img').css({'left': '-'+oSlider.width4/2+'px', 'top':'-'+oSlider.height4/2+'px' });
				$('#'+oSlider.prefix+'-sqr-sect-1-1-1').find('img').css({'left': '-'+oSlider.width4/2+'px', 'top':'-'+oSlider.height4/2+'px' });
			};
			
						
			//animation Random, Regular Custom 
			var showImage_random = function(pos,time,type,anim){
					
					if (anim) animRandom = anim;
					else{
							animRandom = animList[animCons];
							(animCons < animList.length-1)?animCons++:animCons=0;
						}					
				
					var funcName = animations[animRandom][1];
					if (typeof funcName == 'string' &&
						eval('typeof ' + funcName) == 'function') {
						var arg = animations[animRandom][3];
						if (arg) arg = ','+arg+'';
						else arg = '';
							eval(funcName+'('+pos+','+time+',oSlider,$sliderImage,settings'+arg+')');			
					}else if (anim)	 showImage(pos,time);
					else showImage_random(pos,time,type,anim);
			};

		var animations = new Array();
		animations['None'] = [0,'showImage',0,];
		animations['Fade'] = [animations['None'][0]+1,'fade',0,];
		animations['Slide-Left'] = [animations['Fade'][0]+1,'slide_left_right',0,'-1'];
		animations['Slide-Right'] = [animations['Slide-Left'][0]+1,'slide_left_right' ,0,'1'];
		animations['Slide-Down'] = [animations['Slide-Right'][0]+1,'slide_down',0,];
		animations['Slide-Up'] = [animations['Slide-Down'][0]+1,'slide_up' ,0,];
		animations['Curtain-Cl'] = [animations['Slide-Up'][0]+1,'curtain' ,0,];					
		animations['Curtain-Cl-Bou'] = [animations['Curtain-Cl'][0]+1,'curtain_bounce' ,0,];
		animations['Curtain-Cl-Ran-Bou'] = [animations['Curtain-Cl-Bou'][0]+1,'curtain_random_bounce' ,0,];
		animations['Curtain-Op'] = [animations['Curtain-Cl-Ran-Bou'][0]+1,'curtain_open' ,0,];					
		animations['Curtain-Op-Bou'] = [animations['Curtain-Op'][0]+1,'curtain_open_bounce' ,0,];
		animations['Curtain-Op-Ran-Bou'] = [animations['Curtain-Op-Bou'][0]+1,'curtain_open_random_bounce' , 0, ''];
		animations['Curtain-V-Cl'] = [animations['Curtain-Op-Ran-Bou'][0]+1,'h_curtain' , 0, ''];
		animations['Curtain-V-Cl-Bou'] = [animations['Curtain-V-Cl'][0]+1,'h_curtain_bounce' , 0, ''];
		animations['Curtain-V-Cl-Ran-Bou'] = [animations['Curtain-V-Cl-Bou'][0]+1,'h_curtain_random_bounce' ,0 , ''];
		animations['Curtain-V-Op'] = [animations['Curtain-V-Cl-Ran-Bou'][0]+1,'h_curtain_open' ,0 , ''];					
		animations['Curtain-V-Op-Bou'] = [animations['Curtain-V-Op'][0]+1,'h_curtain_open_bounce' ,0 , ''];
		animations['Curtain-V-Op-Ran-Bou'] = [animations['Curtain-V-Op-Bou'][0]+1,'h_curtain_open_random_bounce' , 0, ''];					
		animations['Shrink-Left-Bottom'] = [animations['Curtain-V-Op-Ran-Bou'][0]+1,'shrink_angle' , 0, '0,1'];
		animations['Shrink-Left-Top'] = [animations['Shrink-Left-Bottom'][0]+1,'shrink_angle' , 0, '0,0'];
		animations['Shrink-Right-Bottom'] = [animations['Shrink-Left-Top'][0]+1,'shrink_angle' , 0, '1,1'];
		animations['Shrink-Right-Top'] = [animations['Shrink-Right-Bottom'][0]+1,'shrink_angle' , 0, '1,0']; 																		
		animations['Shrink-Center'] = [animations['Shrink-Right-Top'][0]+1,'shrink_center' ,0 , ''];					
		animations['Shrink-Center-Bounce'] = [animations['Shrink-Center'][0]+1,'shrink_center_bounce' , 0, ''];
		animations['Srink-Random-Bounce'] = [animations['Shrink-Center-Bounce'][0]+1,'srink_random_bounce' ,0 , ''];
		animations['Push-Right'] = [animations['Srink-Random-Bounce'][0]+1,'push_right' , 0, ''];
		animations['Push-Left'] = [animations['Push-Right'][0]+1,'push_left' ,0 , ''];
		animations['Push-Up'] = [animations['Push-Left'][0]+1,'push_up' , 0, ''];
		animations['Push-Down'] = [animations['Push-Up'][0]+1,'push_down' , 0, ''];
		
		animations['Close-Center'] = [animations['Push-Down'][0]+1,'close_center' ,1 , ''];
		animations['Open-Center'] = [animations['Close-Center'][0]+1,'open_center' ,1 , ''];
		animations['2-Close-Bounce'] = [animations['Open-Center'][0]+1,'close_bounce_2' ,1 , ''];
		animations['2-Shrink-Bounce'] = [animations['2-Close-Bounce'][0]+1,'shrink_bounce_2' ,1 , ''];
		animations['2-Shrink-Top-Bottom'] = [animations['2-Shrink-Bounce'][0]+1,'shrink_top_bottom_2' , 1, ''];
		
		animations['4-Shrink-Close'] = [animations['2-Shrink-Top-Bottom'][0]+1,'shrink_close_4' , 3, ''];
					
		animations['4-Close'] = [animations['4-Shrink-Close'][0]+1,'close_4' ,2 , ''];
		animations['4-Open'] = [animations['4-Close'][0]+1,'open_4' , 2, ''];
		animations['4-Close-Delay'] = [animations['4-Open'][0]+1,'close_delay_4' ,2 , ''];
		animations['4-Open-Delay'] = [animations['4-Close-Delay'][0]+1,'open_delay_4' ,2 , ''];
		animations['4-Close-Shift'] = [animations['4-Open-Delay'][0]+1,'close_shift_4' ,2 , ''];
		animations['4-Open-Shift'] = [animations['4-Close-Shift'][0]+1,'open_shift_4' , 2, ''];
		animations['4-Cross'] = [animations['4-Open-Shift'][0]+1,'cross_4' ,2 , ''];
							
		animations['Blind-Right'] = [animations['4-Cross'][0]+1,'blind_right' ,4 , ''];
		animations['Blind-Right-All'] = [animations['Blind-Right'][0]+1,'blind_right_all' , 4, ''];
		animations['Blind-Right-Wave'] = [animations['Blind-Right-All'][0]+1,'blind_right_wave' ,4 , ''];
		animations['Blind-Right-Wave-Full'] = [animations['Blind-Right-Wave'][0]+1,'blind_right_wave_full' ,4 , ''];
		animations['Blind-Right-Fade'] = [animations['Blind-Right-Wave-Full'][0]+1,'blind_right_fade' , 4, ''];
		animations['Blind-Down-Right'] = [animations['Blind-Right-Fade'][0]+1,'blind_down_right' , 4, ''];
		animations['Blind-Down-Center'] = [animations['Blind-Down-Right'][0]+1,'blind_down_center' ,4 , ''];
		animations['Blind-Down-Random'] = [animations['Blind-Down-Center'][0]+1,'blind_down_random' ,4 , ''];
		animations['Blind-Down-Up'] = [animations['Blind-Down-Random'][0]+1,'blind_down_up__wave' ,4 , '0,"easeOutCirc"'];
		animations['Blind-Down-Up-Fade'] = [animations['Blind-Down-Up'][0]+1,'blind_down_up_fade' ,4 , ''];
		animations['Blind-Down-Up-Bounce'] = [animations['Blind-Down-Up-Fade'][0]+1,'blind_down_up__wave' ,4 , '0,"easeOutBack"'];
		animations['Blind-Down-Up-Wave'] = [animations['Blind-Down-Up-Bounce'][0]+1,'blind_down_up__wave' ,4 , '1'];
		
		animations['Line-Down'] = [animations['Blind-Down-Up-Wave'][0]+1,'line_down' ,5 , ''];
		animations['Sqr-Down'] = [animations['Line-Down'][0]+1,'sqr_down' , 5, ''];
		animations['Line-Down-Reverse'] = [animations['Sqr-Down'][0]+1,'line_down_revers' , 5, ''];
		animations['Sqr-Down-Expand'] = [animations['Line-Down-Reverse'][0]+1,'sqr_down_expand' ,5 , ''];
		animations['Sqr-Expand'] = [animations['Sqr-Down-Expand'][0]+1,'sqr_expand' , 5, ''];
//		animations['Sqr-Expand-Center'] = [animations['Sqr-Expand'][0]+1,'sqr_expand_center' ,5 , ''];
		animations['Sqr-Fade'] = [animations['Sqr-Expand'][0]+1,'sqr_fade' , 5, ''];
		animations['Sqr-Fade-Down'] = [animations['Sqr-Fade'][0]+1,'sqr_fade_down' , 5, ''];
		animations['Sqr-Random'] = [animations['Sqr-Fade-Down'][0]+1,'sqr_random' ,5 , ''];
		animations['Slide-Back-Left'] = [animations['Sqr-Random'][0]+1,'slide_back' , 0, '-1'];
		animations['Slide-Back-Right'] = [animations['Slide-Back-Left'][0]+1,'slide_back' ,0 , '1'];
		animations['Slide-Back-Up'] = [animations['Slide-Back-Right'][0]+1,'slide_back_v' ,0 , '-1']; 
		animations['Slide-Back-Down'] = [animations['Slide-Back-Up'][0]+1,'slide_back_v' , 0, '1']; 
		animations['Regular'] = [animations['Slide-Back-Down'][0]+1,showImage_random , , 'Regular'];
		animations['Random'] = [animations['Regular'][0]+1,showImage_random , , 'Random'];
		animations['Regular-Custom'] = [animations['Random'][0]+1,showImage_random ,,'Regular-Custom'];
		animations['Random-Custom'] = [animations['Regular-Custom'][0]+1,showImage_random ,,'Random-Custom'];
		animations['Regular-Exception'] = [animations['Random-Custom'][0]+1,showImage_random ,,'Regular-Exception'];
		animations['Random-Exception'] = [animations['Regular-Exception'][0]+1,showImage_random ,,'Random-Exception'];
					
}

})(jQuery);

