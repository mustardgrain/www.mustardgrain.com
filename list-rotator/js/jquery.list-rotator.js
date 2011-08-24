/**
 * jQuery List Rotator 
 * Copyright (c) 2011 Allan Ma (http://codecanyon.net/user/webtako)
 * Version: 1.1 (03/08/2011)
 */
;(function($) {
	$.fn.wtListRotator = function(params) {
		var LEFT = "left";
		var RIGHT = "right";
		var PREV = 0;
		var NEXT = 1;
		var AUTO_ADJUST = 	 "auto_adjust";
		var UPDATE_TEXT = 	 "update_text";
		var UPDATE_BUTTONS = "update_buttons";			
		var UPDATE_NUMBER =  "update_number";
		var SHOW_SCROLLBAR = "show_scrollbar";
		var HIDE_SCROLLBAR = "hide_scrollbar";
		var MOVE_KNOB = 	 "update_knob";
		
		var ALIGN = {"TL":0, "TC":1, "TR":2, "BL":3, "BC":4, "BR":5};
		
		var ei = 0;
		var EFFECTS = {					
			"block.top":ei++,
			"block.right":ei++,
			"block.bottom":ei++,
			"block.left":ei++,		
			"block.drop":ei++,		
			"diag.fade":ei++,
			"diag.exp":ei++,		
			"rev.diag.fade":ei++,
			"rev.diag.exp":ei++,		
			"block.fade":ei++,
			"block.exp":ei++,
			"block.top.zz":ei++,
			"block.bottom.zz":ei++,
			"block.left.zz":ei++,
			"block.right.zz":ei++,		
			"spiral.in":ei++,	
			"spiral.out":ei++,
			"vert.tl":ei++,
			"vert.tr":ei++,
			"vert.bl":ei++,
			"vert.br":ei++,		
			"fade.left":ei++,	
			"fade.right":ei++,		
			"alt.left":ei++,
			"alt.right":ei++,
			"blinds.left":ei++,
			"blinds.right":ei++,		
			"horz.tl":ei++,
			"horz.tr":ei++,		
			"horz.bl":ei++,
			"horz.br":ei++,		
			"fade.top":ei++,
			"fade.bottom":ei++,
			"alt.top":ei++,
			"alt.bottom":ei++,
			"blinds.top":ei++,
			"blinds.bottom":ei++,				
			"none":ei++,
			"fade":ei++,
			"h.slide":ei++,
			"v.slide":ei++,
			"random":ei++
		};
		
		var TEXT_EFFECTS = {
			"fade":0,
			"down":1,
			"right":2,
			"up":3,
			"left":4,
			"none":5
		}
		
		var LIMIT = 250;
		var BLOCK_SIZE = 75;
		var STRIPE_SIZE = 50;
		var DEFAULT_DELAY = 5000;
		var DURATION = 800;
		var DEFAULT_SPEED = 300;
		var TEXT_SPEED = 600;
		var SCROLL_DELAY = 0.1;
		var SCROLL_RATE = 4;
		var MAX_SCROLL_SPEED = 600;
		
		//Vertical Stripes
		function VertStripes(rotator, areaWidth, areaHeight, stripeSize, bgColor, duration, delay) {
			var $stripes;
			var $arr;
			var total;
			var intervalId = null;
			
			//init stripes
			var init = function() {
				total = Math.ceil(areaWidth/stripeSize);
				if (total > LIMIT) {
					stripeSize = Math.ceil(areaWidth/LIMIT);
					total = Math.ceil(areaWidth/stripeSize);
				}
				var divs = "";
				for (var i = 0; i < total; i++) {
					divs += "<div class='vpiece' id='" + i + "'/>";
				}					
				rotator.addToScreen(divs);
				
				$stripes = $("div.vpiece", rotator.$el);
				$arr = new Array(total);
				$stripes.each(
					function(n) {						
						$(this).css({left:(n * stripeSize), height: areaHeight});
						$arr[n] = $(this);
					}
				);	
			}

			//clear animation
			this.clear = function() {
				clearInterval(intervalId);
				$stripes.stop(true).css({"z-index":2, opacity:0});
			}

			//display content
			this.displayContent = function($img, effect) {
				setPieces($img, effect);
				animate($img, effect);
			}			
			
			//set image stripes
			var setPieces = function($img, effect) {
				switch (effect) {
					case EFFECTS["vert.tl"]:
					case EFFECTS["vert.tr"]:
						setVertPieces($img, -areaHeight, 1, stripeSize, false);		
						break;
					case EFFECTS["vert.bl"]:
					case EFFECTS["vert.br"]:
						setVertPieces($img, areaHeight, 1, stripeSize, false);
						break;
					case EFFECTS["alt.left"]:
					case EFFECTS["alt.right"]:
						setVertPieces($img, 0, 1, stripeSize, true);
						break;
					case EFFECTS["blinds.left"]:
					case EFFECTS["blinds.right"]:
						setVertPieces($img, 0, 1, 0, false);
						break;
					default:
						setVertPieces($img, 0, 0, stripeSize, false);
				}
			}
			
			//set vertical stripes
			var setVertPieces = function($img, topPos, opacity, width, alt) {
				var imgSrc = $img.attr("src");
				var tOffset = (areaHeight - $img.height())/2;
				var lOffset = (areaWidth - $img.width())/2;
				for (var i = 0; i < total; i++) {		
					var xPos =  ((-i * stripeSize) + lOffset);
					if (alt) {
						topPos = (i % 2) == 0 ? -areaHeight: areaHeight;
					}
					$($stripes.get(i)).css({background:bgColor + " url('"+ imgSrc +"') no-repeat", backgroundPosition:xPos + "px " + tOffset + "px",						   
											opacity:opacity, top:topPos, width:width, "z-index":3});						
				}
			}
			
			//animate stripes			
			var animate = function($img, effect) {
				var start, end, incr, limit;
				switch (effect) {
					case EFFECTS["vert.tl"]:   case EFFECTS["vert.bl"]: 
					case EFFECTS["fade.left"]: case EFFECTS["blinds.left"]: 
					case EFFECTS["alt.left"]:
						start = 0;
						end = total - 1;
						incr = 1;	
						break;
					default:
						start = total - 1;
						end = 0;
						incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$($stripes.get(start)).animate({top:0, opacity:1, width:stripeSize}, duration, rotator.easing(),
							function() {
								if ($(this).attr("id") == end) {
									rotator.setComplete($img);
								}
							}
						);
						if (start == end) {
							clearInterval(intervalId);
						}
						start += incr;
					}, delay);							
			}
			
			init();
		}
		
		//Horizontal Stripes
		function HorzStripes(rotator, areaWidth, areaHeight, stripeSize, bgColor, duration, delay) {
			var $stripes;
			var $arr;
			var total;
			var intervalId = null;
			
			//init stripes
			var init = function() {			
				total = Math.ceil(areaHeight/stripeSize);
				if (total > LIMIT) {
					stripeSize = Math.ceil(areaHeight/LIMIT);
					total = Math.ceil(areaHeight/stripeSize);
				}
				var divs = "";
				for (var j = 0; j < total; j++) {
					divs += "<div class='hpiece' id='" + j + "'><!-- --></div>";
				}				
				rotator.addToScreen(divs);
				
				$stripes = $("div.hpiece", rotator.$el);
				$arr = new Array(total);
				$stripes.each(
					function(n) {
						$(this).css({top:(n * stripeSize), width: areaWidth});
						$arr[n] = $(this);
					}							 
				);
			}

			//clear animation
			this.clear = function() {
				clearInterval(intervalId);
				$stripes.stop(true).css({"z-index":2, opacity:0});
			}

			//display content
			this.displayContent = function($img, effect) {
				setPieces($img, effect);
				animate($img, effect);
			}			
			
			//set image stripes
			var setPieces = function($img, effect) {
				switch (effect) {
					case EFFECTS["horz.tr"]:
					case EFFECTS["horz.br"]:
						setHorzPieces($img, areaWidth, 1, stripeSize, false);		
						break;
					case EFFECTS["horz.tl"]:
					case EFFECTS["horz.bl"]:
						setHorzPieces($img, -areaWidth, 1, stripeSize, false);
						break;
					case EFFECTS["alt.top"]:
					case EFFECTS["alt.bottom"]:
						setHorzPieces($img, 0, 1, stripeSize, true);
						break;
					case EFFECTS["blinds.top"]:
					case EFFECTS["blinds.bottom"]:
						setHorzPieces($img, 0, 1, 0, false);
						break;
					default:
						setHorzPieces($img, 0, 0, stripeSize, false);		
				}
			}
			
			//set horizontal stripes
			var setHorzPieces = function($img, leftPos, opacity, height, alt) {
				var imgSrc = $img.attr("src");
				var tOffset = (areaHeight - $img.height())/2;
				var lOffset = (areaWidth - $img.width())/2;
				for (var i = 0; i < total; i++) {			
					var yPos = ((-i * stripeSize) + tOffset);
					if (alt) {
						leftPos = (i % 2) == 0 ? -areaWidth: areaWidth;
					}
					$($stripes.get(i)).css({background:bgColor + " url('"+ imgSrc +"') no-repeat", backgroundPosition:lOffset + "px " + yPos + "px",
											opacity:opacity, left:leftPos, height:height, "z-index":3});			  
				}
			}
			
			//animate stripes			
			var animate = function($img, effect) {
				var start, end, incr;
				switch (effect) {
					case EFFECTS["horz.tl"]:  case EFFECTS["horz.tr"]: 
					case EFFECTS["fade.top"]: case EFFECTS["blinds.top"]: 
					case EFFECTS["alt.top"]:
						start = 0;
						end = total - 1;
						incr = 1;
						break;
					default:
						start = total - 1;
						end = 0;
						incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$($stripes.get(start)).animate({left:0, opacity:1, height:stripeSize}, duration, rotator.easing(),
							function() {
								if ($(this).attr("id") == end) {
									rotator.setComplete($img);
								}
							}
						);						
						if (start == end) {
							clearInterval(intervalId);
						}
						start += incr;
					}, delay);							
			}
			
			init();
		}
		
		//class Blocks
		function Blocks(rotator, areaWidth, areaHeight, blockSize, bgColor, duration, delay) {
			var $blockArr;
			var $blocks;
			var $arr;
			var numRows;
			var numCols;
			var total;
			var intervalId;
			
			//init blocks
			var init = function() {
				numRows = Math.ceil(areaHeight/blockSize);
				numCols = Math.ceil(areaWidth/blockSize);				
				total = numRows * numCols;
				if (total > LIMIT) {
					blockSize = Math.ceil(Math.sqrt((areaHeight * areaWidth)/LIMIT));
					numRows = Math.ceil(areaHeight/blockSize);
					numCols = Math.ceil(areaWidth/blockSize);				
					total = numRows * numCols;
				}
				var divs = "";								
				for (var i = 0; i < numRows; i++) {					
					for (var j = 0; j < numCols; j++) {
						divs += "<div class='block' id='" + i + "-" + j + "'/>";		
					}
				}
				rotator.addToScreen(divs);
				$blocks = $("div.block", rotator.$el);	
				$blocks.data({tlId:"0-0", trId:"0-"+(numCols - 1), blId:(numRows - 1)+"-0", brId:(numRows - 1)+"-"+(numCols - 1)});
				
				var k = 0;
				$arr = new Array(total);
				$blockArr = new Array(numRows);
				for (var i = 0; i < numRows; i++) {
					$blockArr[i] = new Array(numCols);
					for (var j = 0; j < numCols; j++) {
						$blockArr[i][j] = $arr[k++] = $blocks.filter("#" + (i + "-" + j)).data("top", i * blockSize);
					}
				}				
			}
			
			//clear blocks
			this.clear = function() {
				clearInterval(intervalId);
				$blocks.stop(true).css({"z-index":2, opacity:0});
			}
			
			//display content
			this.displayContent = function($img, effect) {
				switch (effect) {
					case EFFECTS["diag.fade"]:
						setBlocks($img, 0, blockSize, 0);
						diagAnimate($img, {opacity:1}, false);		
						break;
					case EFFECTS["diag.exp"]:
						setBlocks($img, 0, 0, 0);
						diagAnimate($img, {opacity:1, width:blockSize, height:blockSize}, false);
						break;
					case EFFECTS["rev.diag.fade"]:
						setBlocks($img, 0, blockSize, 0);
						diagAnimate($img, {opacity:1}, true);
						break;
					case EFFECTS["rev.diag.exp"]:
						setBlocks($img, 0, 0, 0);
						diagAnimate($img, {opacity:1, width:blockSize, height:blockSize}, true);
						break;
					case EFFECTS["block.fade"]:
						setBlocks($img, 0, blockSize, 0);
						randomAnimate($img);
						break;
					case EFFECTS["block.exp"]:
						setBlocks($img, 1, 0, 0);
						randomAnimate($img);
						break; 
					case EFFECTS["block.drop"]:
						setBlocks($img, 1, blockSize, -(numRows * blockSize));
						randomAnimate($img);
						break;
					case EFFECTS["block.top.zz"]: 
					case EFFECTS["block.bottom.zz"]:					
						setBlocks($img, 0, blockSize, 0);
						horzZigZag($img, effect);
						break;
					case EFFECTS["block.left.zz"]: 
					case EFFECTS["block.right.zz"]:
						setBlocks($img, 0, blockSize, 0);
						vertZigZag($img, effect);
						break;
					case EFFECTS["spiral.in"]:
						setBlocks($img, 0, blockSize, 0);
						spiral($img, false);
						break;
					case EFFECTS["spiral.out"]:
						setBlocks($img, 0, blockSize, 0);
						spiral($img, true);
						break;
					default:
						setBlocks($img, 1, 0, 0);
						dirAnimate($img, effect);					
				}
			}
			
			//set blocks 
			var setBlocks = function($img, opacity, size, tPos) {
				var tOffset = (areaHeight - $img.height())/2;
				var lOffset = (areaWidth - $img.width())/2;
				var imgSrc = $img.attr("src");
				for (var i = 0; i < numRows; i++) {							
					for (var j = 0; j < numCols; j++) {
						var tVal = ((-i * blockSize) + tOffset);
						var lVal = ((-j * blockSize) + lOffset);
						$blockArr[i][j].css({background:bgColor + " url('"+ imgSrc +"') no-repeat", backgroundPosition:lVal + "px " + tVal + "px",
											 opacity:opacity, top:(i * blockSize) + tPos, left:(j * blockSize), width:size, height:size, "z-index":3});
					}					
				}
			}
			
			//diagonal effect
			var diagAnimate = function($img, props, rev) {
				var $array = new Array(total);
				var start, end, incr, lastId;
				var diagSpan = (numRows - 1) + (numCols - 1);
				if (rev) {				
					start = diagSpan;
					end = -1;
					incr = -1;
					lastId = $blocks.data("tlId");
				}
				else {
					start = 0;
					end = diagSpan + 1;
					incr = 1;
					lastId = $blocks.data("brId");
				}
				
				var count = 0;
				while (start != end) {
					i = Math.min(numRows - 1, start);
					while(i >= 0) {			
						j = Math.abs(i - start);
						if (j >= numCols) {
							break;
						}
						$array[count++] = $blockArr[i][j];
						i--;
					}
					start+=incr;	
				}
				
				count = 0;
				intervalId = setInterval(
					function() {
						$array[count++].animate(props, duration, rotator.easing(),
								function() {
									if ($(this).attr("id") == lastId) {
										rotator.setComplete($img);
									}
								});							
						if (count == total) {
							clearInterval(intervalId);
						}			
					}, delay);				
			}

			//vertical zig zag effect
			var vertZigZag = function($img, effect) {
				var fwd = true;
				var i = 0, j, incr, lastId;
				if (effect == EFFECTS["block.left.zz"]) {
					lastId = (numCols%2 == 0) ? $blocks.data("trId") : $blocks.data("brId");
					j = 0;
					incr = 1;
				}
				else {
					lastId = (numCols%2 == 0) ? $blocks.data("tlId") : $blocks.data("blId");
					j = numCols - 1;
					incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$blockArr[i][j].animate({opacity:1}, duration, rotator.easing(),
								function() {
									if ($(this).attr("id") == lastId) {
										rotator.setComplete($img);
									}});
						
						if ($blockArr[i][j].attr("id") == lastId) {
							clearInterval(intervalId);
						}
						
						(fwd ? i++ : i--);
						if (i == numRows || i < 0) {
							fwd = !fwd;
							i = (fwd ? 0 : numRows - 1);
							j+=incr;
						}						
					}, delay);
			}
			
			//horizontal zig zag effect
			var horzZigZag = function($img, effect) {
				var fwd = true;
				var i, j = 0, incr, lastId;
				if (effect == EFFECTS["block.top.zz"]) {
					lastId = (numRows%2 == 0) ? $blocks.data("blId") : $blocks.data("brId");
					i = 0;
					incr = 1;
				}
				else {
					lastId = (numRows%2 == 0) ? $blocks.data("tlId") : $blocks.data("trId");
					i = numRows - 1;
					incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$blockArr[i][j].animate({opacity:1}, duration, rotator.easing(),
								function() {
									if ($(this).attr("id") == lastId) {
										rotator.setComplete($img);
									}});
						
						if ($blockArr[i][j].attr("id") == lastId) {
							clearInterval(intervalId);
						}
						
						(fwd ? j++ : j--);
						if (j == numCols || j < 0) {
							fwd = !fwd;
							j = (fwd ? 0 : numCols - 1);
							i+=incr;
						}						
					}, delay);
			}
			
			//vertical direction effect
			var dirAnimate = function($img, effect) {
				var $array = new Array(total);
				var lastId;
				var count = 0;
				switch (effect) {
					case EFFECTS["block.left"]:
						lastId = $blocks.data("brId");
						for (var j = 0; j < numCols; j++) {
							for (var i = 0; i < numRows; i++) {
								$array[count++] = $blockArr[i][j];			
							}
						}
						break;
					case EFFECTS["block.right"]:
						lastId = $blocks.data("blId");
						for (var j = numCols - 1; j >= 0; j--) {
							for (var i = 0; i < numRows; i++) {
								$array[count++] = $blockArr[i][j];			
							}
						}					
						break;
					case EFFECTS["block.top"]:
						lastId = $blocks.data("brId");
						for (var i = 0; i < numRows; i++) {
							for (var j = 0; j < numCols; j++) {
								$array[count++] = $blockArr[i][j];			
							}
						}					
						break;
					default:
						lastId = $blocks.data("trId");
						for (var i = numRows - 1; i >= 0; i--) {
							for (var j = 0; j < numCols; j++) {
								$array[count++] = $blockArr[i][j];			
							}
						}
				}
				count = 0;
				intervalId = setInterval(
					function() {
						$array[count++].animate({width:blockSize, height:blockSize}, duration, rotator.easing(),
								function() {
									if ($(this).attr("id") == lastId) {
										rotator.setComplete($img);
									}
								});	
						if (count == total) {
							clearInterval(intervalId);	
						}
					}, delay);
			}
			
			//random block effect
			var randomAnimate = function($img) {
				shuffleArray($arr);
				var i = 0;
				count = 0;
				intervalId = setInterval(
					function() {
						$arr[i].animate({top:$arr[i].data("top"), width:blockSize, height:blockSize, opacity:1}, duration, rotator.easing(),
								function() {
									if (++count == total) {
										rotator.setComplete($img);
									}
								});	
						i++;
						if (i == total) {
							clearInterval(intervalId);
						}
					}, delay);
			}
			
			//spiral effect
			var spiral = function($img, spiralOut) {			
				var i = 0, j = 0;
				var rowCount = numRows - 1;
				var colCount = numCols - 1;
				var dir = 0;
				var limit = colCount;
				var $array = new Array();
				while (rowCount >= 0 && colCount >=0) {
					var count = 0; 
					while(true) { 
						$array[$array.length] = $blockArr[i][j];
						if ((++count) > limit) {
							break;
						}
						switch(dir) {
							case 0:
								j++;
								break;
							case 1:
								i++;
								break;
							case 2:
								j--;
								break;
							case 3:
								i--;
						}
   					} 
					switch(dir) {
						case 0:
							dir = 1;
							limit = (--rowCount);
							i++;
							break;
						case 1:
							dir = 2;
							limit = (--colCount);
							j--;
							break;
						case 2:
							dir = 3;
							limit = (--rowCount);
							i--;
							break;
						case 3:
							dir = 0;
							limit = (--colCount);
							j++;
					}
				}
				if ($array.length > 0) {
					if (spiralOut) {
						$array.reverse();
					}
					var end = $array.length - 1;
					var lastId = $array[end].attr("id");
					var k = 0;				
					intervalId = setInterval(
						function() {
							$array[k].animate({opacity:1}, duration, rotator.easing(),
								function() {
									if ($(this).attr("id") == lastId) {
										rotator.setComplete($img);
									}
								});						
							if (k == end) {
								clearInterval(intervalId);	
							}	
							k++;
						}, delay);					
				}
			}
			
			init();
		}
		
		//class Rotator
		function ListRotator($obj, opts) {
			var screenWidth =  		getPosNumber(opts.screen_width, 600);
			var screenHeight = 		getPosNumber(opts.screen_height, 300);
			var itemWidth =			getPosNumber(opts.item_width, 250);
			var itemHeight =		getPosNumber(opts.item_height, 75);
			var numDisplay =		getPosNumber(opts.item_display, 4);
			var rotate = 			opts.auto_start;		
			var duration =   		getPosNumber(opts.transition_speed, DURATION);
			var defaultEffect = 	opts.transition.toLowerCase();
			var easing =			opts.easing;
			var scrollType = 		opts.scroll_type.toLowerCase();
			var displayArrow =  	opts.display_arrow;
			var displayThumbs =		opts.display_thumbs;
			var displayScrollbar =	opts.display_scrollbar;
			var displayPlayButton = opts.display_playbutton;
			var displayNumber = 	opts.display_number;
			var displayTimer =		opts.display_timer;
			var textEffect = 		opts.text_effect.toLowerCase();
			var textSync =			opts.text_sync;
			var playOnce =			opts.play_once;
			var listAlign = 		opts.list_align.toLowerCase();
			var moveBy1 = 			opts.move_one;
			var autoCenter =		opts.auto_center;
			var textMouseover = 	opts.text_mouseover;
			var pauseMouseover = 	opts.pause_mouseover;
			var cpMouseover = 		opts.cpanel_mouseover;
			
			var numItems;
			var currIndex;
			var prevIndex;
			var prevSlots;
			var nextSlots;
			var maxSlots;
			var pos;
			var delay;		
			var vStripes;
			var hStripes;
			var blocks;		
			var range;					
			var dest;
			var scrollSpeed;			
			var scrollId;
			var timerId;
			var blockEffect;
			var hStripeEffect;
			var vStripeEffect
			var dir;
			var $rotator;
			var $screen;
			var $strip;
			var $thumbPanel;
			var $list;	
			var $listItems;
			var $timer;
			var $mainLink;				
			var $textBox;
			var $innerText;
			var $preloader;
			var $cpanel;
			var $playButton;
			var $numInfo;
			var $arrow;			
			var $containers;
			var $upPane;
			var $downPane;			
			var $scrollbar;
			var $knob;
			this.$el = $obj;
			
			//init rotator
			this.init = function() {
				$rotator = 	  $(".l-rotator", $obj);
				$screen = 	  $rotator.find(".screen");
				$thumbPanel = $rotator.find(".thumbnails");
				$list =  	  $thumbPanel.find(">ul:first");	
				$listItems =  $list.find(">li");
				blockEffect = hStripeEffect = vStripeEffect = false;
				checkEffect(EFFECTS[defaultEffect]);
				scrollId = null;
				timerId = null;
			
				currIndex = 0;
				prevIndex = -1;
				numItems = $listItems.size();					
				pos = 0;		
				maxSlots = numItems - numDisplay;
				prevSlots = 0;
				nextSlots = maxSlots;
				
				initMainScreen();				
				initItems();				
				initThumbPanel();
				
				if (textMouseover) {
					$rotator.hover(displayText, hideText);
				}
				else {
					$rotator.bind(UPDATE_TEXT, updateText);
				}
				
				$rotator.css({width:screenWidth + itemWidth, height:$thumbPanel.height() > screenHeight ? $thumbPanel.height() : screenHeight});
				if (pauseMouseover) {
					$rotator.hover(stopRotate, startRotate);
				}
				
				var bgColor = $screen.css("background-color");
				if (vStripeEffect) {
					vStripes = new VertStripes(this, screenWidth, screenHeight, getPosNumber(opts.vert_size, STRIPE_SIZE), bgColor, duration, getPosNumber(opts.vstripe_delay, 90));
				}
				if (hStripeEffect) {
					hStripes = new HorzStripes(this, screenWidth, screenHeight, getPosNumber(opts.horz_size, STRIPE_SIZE), bgColor, duration, getPosNumber(opts.hstripe_delay, 180));
				}
				if (blockEffect) {
					blocks = new Blocks(this, screenWidth, screenHeight, getPosNumber(opts.block_size, BLOCK_SIZE), bgColor, duration, getPosNumber(opts.block_delay, 35));	
				}
				loadImg(0);
							
				loadContent(currIndex);
			}

			//set complete
			this.setComplete = function($img) {
				showContent($img);
			}
			
			//add to screen
			this.addToScreen = function(content) {
				$mainLink.append(content);
			}
			
			//get easing
			this.easing = function() {
				return easing;
			}
			
			//init main screen
			var initMainScreen = function() {
				var content =  "<a href='#'></a>\
							   	<div id='preloader'/>\
								<div id='timer'/>\
							   	<div class='textbox'>\
							   		<div class='inner-bg'/>\
									<div class='inner-text'/>\
							   	</div>\
							   	<div class='cpanel'>\
							   		<div id='play-btn'/>\
									<div id='num-info'/>\
								</div>";
				$screen.append(content).css({width:screenWidth, height:screenHeight});
				$mainLink 	= $screen.find(">a:first");				
				$preloader 	= $screen.find("#preloader");
				initTimerBar();
				$textBox 	= $screen.find(".textbox");
				$innerText =  $textBox.find(".inner-text");
				
				$strip = $("<div id='strip'/>");
				if (defaultEffect == "h.slide") {
					$mainLink.append($strip);
					$strip.css({width:2*screenWidth, height:screenHeight});
					$listItems.removeAttr("effect");
				}
				else if (defaultEffect == "v.slide"){
					$mainLink.append($strip);
					$strip.css({width:screenWidth, height:2*screenHeight});
					$listItems.removeAttr("effect");
				}
				
				initCPanel();				
			}

			//init timer bar
			var initTimerBar = function() {
				$timer = $screen.find("#timer").data("pct", 1);
				if (displayTimer) {
					$timer.css("top", opts.timer_align.toLowerCase() == "top" ? 0 : screenHeight - $timer.height()).css("visibility", "visible");
				}
				else {
					$timer.hide();
				}
			}
			
			//init cpanel
			var initCPanel = function() {
				$cpanel = $screen.find(".cpanel");
				if (!displayNumber && !displayPlayButton) {
					$cpanel.remove();
					return;
				}
				
				$numInfo = $cpanel.find("#num-info");
				if (displayNumber) {
					var digits = getNumDigits(numItems);
					var str = "";
					for (var i = 0; i < digits; i++) {
						str += "0";
					}
					str += " / " + str
					$numInfo.html(str).width($numInfo.width()).html("");
					$rotator.bind(UPDATE_NUMBER, function() {
													$numInfo.html((currIndex + 1) + " / " + numItems);
												 });
				}
				else {
					$numInfo.remove();
				}
				
				$playButton = $cpanel.find("#play-btn");
				if (displayPlayButton) {
					$playButton.click(togglePlay).toggleClass("pause", rotate);
				}
				else {
					$playButton.remove();
				}
				
				switch(ALIGN[opts.cpanel_align.toUpperCase()]) {
					case ALIGN["TL"]:
						$cpanel.css({top:0, left:0});					
						break;
					case ALIGN["TC"]:
						$cpanel.css({top:0, left:Math.floor((screenWidth - $cpanel.outerWidth(true))/2)});
						break;
					case ALIGN["TR"]:
						$cpanel.css({top:0, left:screenWidth - $cpanel.outerWidth(true)});
						break;
					case ALIGN["BL"]:
						$cpanel.css({top:screenHeight - $cpanel.outerHeight(true), left:0});
						break;
					case ALIGN["BC"]:
						$cpanel.css({top:screenHeight - $cpanel.outerHeight(true), left:Math.floor((screenWidth - $cpanel.outerWidth(true))/2)});
						break;
					default:
						$cpanel.css({top:screenHeight - $cpanel.outerHeight(true), left:screenWidth - $cpanel.outerWidth(true)});					
				}
				
				if (cpMouseover) {
					$cpanel.css("display","none");
					$rotator.hover(showCPanel, hideCPanel);
				}
				$cpanel.css("visibility", "visible");
			}
			
			var showCPanel = function() {
				$cpanel.stop(true,true).fadeIn(DEFAULT_SPEED);
			}
			
			var hideCPanel = function() {
				$cpanel.stop(true,true).fadeOut(DEFAULT_SPEED);
			}
			
			//init items
			var initItems = function() {
				var defaultDelay = 	getPosNumber(opts.delay, DEFAULT_DELAY);
				var padding = $innerText.outerHeight() - $innerText.height();
				$listItems.each(
					function(n) {
						var $imgLink = $(this).find(">a:first");
						var itemEffect = EFFECTS[$(this).attr("effect")];
						if (itemEffect == undefined || itemEffect ==  EFFECTS["h.slide"] || itemEffect ==  EFFECTS["v.slide"]) {
							itemEffect = EFFECTS[defaultEffect];
						}
						else {
							checkEffect(itemEffect);							
						}
						$(this).data({imgurl:$imgLink.attr("href"), delay:getPosNumber($(this).attr("delay"), defaultDelay), effect:itemEffect});
						initTextData($(this), padding);		
					}
				);
				$innerText.html("").css({width:"auto", height:"auto"});
				$textBox.css("visibility", "visible");
						
				if (opts.shuffle) {
					shuffleItems();
				}
				
				$listItems.hover(function() {
									if (currIndex != $(this).index()) {
										$(this).addClass("item-over");
									}
								 }, function() { $(this).removeClass("item-over"); });
				
				$containers = $listItems.find(">div.thumb");
				$containers.css(listAlign == LEFT ? {"float":"left", "border-right-width":1} : {"float":"right", "border-left-width":1});
				$containers.css({width:itemWidth - ($containers.outerWidth() - $containers.width()), height:itemHeight - ($containers.outerHeight() - $containers.height())})
						   .mousedown(preventDefault);
				
				if (!displayThumbs) {
					$containers.find(">img:first").hide();
				}		
			}	
			
			//init thumb panel
			var initThumbPanel = function() {
				var arrowWidth = 0;
				if (displayArrow) {
					$arrow = $("<div>&nbsp;&nbsp;&nbsp;</div>").attr("id", listAlign == RIGHT ? "left-arrow" : "right-arrow").height(itemHeight);				
					$($listItems.get(0)).append($arrow);
					arrowWidth = $arrow.width();
				}
				else {
					$listItems.addClass("square");
				}
				$listItems.css({width:itemWidth + arrowWidth, height:itemHeight});
				$list.height(numItems * $listItems.outerHeight());
				$thumbPanel.css({width:$listItems.width(), height:numDisplay * $listItems.outerHeight()}).click(selectItem);												
				range = $list.height() - $thumbPanel.height();
				
				if (listAlign == LEFT) {
					$thumbPanel.css("left", 0);
					$screen.css("left", itemWidth);
				}
				else {
					$screen.css("left", 0);
					$thumbPanel.css("left", screenWidth - arrowWidth);					
				}
				
				switch(scrollType) {
					case "mouse_click":
						initDButtons();
						$upPane.click(prevThumbs).find("#up-btn").css("cursor","pointer");
						$downPane.click(nextThumbs).find("#down-btn").css("cursor","pointer");
						break;
					case "mouse_over":
						initDButtons();
						$upPane.hover(scrollUp, stopThumbList);
						$downPane.hover(scrollDown, stopThumbList);
						break;
					case "mouse_move":
						$thumbPanel.mousemove(mousemoveScroll);
						break;
					default:
						moveBy1 = true;
						$listItems.bind("click", itemClick);
						
				}
				
				if (displayScrollbar && range > 0) {
					initScrollbar();
				}
				
				if (opts.auto_adjust) {
					$rotator.bind(AUTO_ADJUST, adjustThumbs);
					$thumbPanel.hover(function() { $rotator.unbind(AUTO_ADJUST); }, function() { $rotator.bind(AUTO_ADJUST, adjustThumbs); });
				}
			}
			
			var initScrollbar = function() {
				$thumbPanel.append("<div id='scrollbar'><div id='knob'/></div>");
				$scrollbar = $thumbPanel.find("#scrollbar");
				$knob = 	 $scrollbar.find("#knob");
				$scrollbar.css("left", listAlign == LEFT ? 0 : $thumbPanel.width() - $scrollbar.width());									
				$knob.height(Math.floor((numDisplay/numItems) * $scrollbar.height()));
				
				var scrollRange = $scrollbar.height() - $knob.height();
				var scrollRatio = scrollRange/range;
				$scrollbar.data({range:scrollRange, ratio:scrollRatio});
				
				$rotator.bind(SHOW_SCROLLBAR, function() { $scrollbar.stop(true,true).fadeIn(DEFAULT_SPEED); })
						.bind(HIDE_SCROLLBAR, function() { $scrollbar.stop(true,true).fadeOut(DEFAULT_SPEED); })
						.bind(MOVE_KNOB, function() { $knob.stop(true).animate({top:Math.round(-pos * scrollRatio)}, scrollSpeed); });
				$scrollbar.hide().css("visibility","visible");
			}
			
			//init directional buttons
			var initDButtons = function() {
				$thumbPanel.append("<div class='btn-pane'><div id='up-btn'/></div>\
								    <div class='btn-pane'><div id='down-btn'/></div>");
				var $dPane = $thumbPanel.find(".btn-pane");
				$dPane.css({opacity:0, width:itemWidth});
				$dPane.hover(showDPane, hideDPane);
					  
				if (displayArrow && listAlign == RIGHT) {
					$dPane.css("left", $arrow.width());
				}
				$upPane =   $dPane.has("#up-btn");
				$downPane = $dPane.has("#down-btn");
				$downPane.css("top", $thumbPanel.height() - $downPane.height());
				$dPane.css("visibility", "visible");
				$rotator.bind(UPDATE_BUTTONS, updateButtons).trigger(UPDATE_BUTTONS);
			}
			
			var showDPane = function() {
				$(this).stop(true, true).animate({opacity:1}, DEFAULT_SPEED);
			}
			
			var hideDPane = function() {
				$(this).stop(true, true).animate({opacity:0}, DEFAULT_SPEED);
			}
			
			//update control
			var updateButtons = function() {
				pos < 0 ? $upPane.stop(true,true).fadeIn(DEFAULT_SPEED): $upPane.stop(true,true).fadeOut(DEFAULT_SPEED);
				pos > -range ? $downPane.stop(true,true).fadeIn(DEFAULT_SPEED) : $downPane.stop(true,true).fadeOut(DEFAULT_SPEED);
			}
			
			//move to previous thumbs
			var prevThumbs = function() {
				if (nextSlots < maxSlots) {
					var slots = moveBy1 ? 1 : Math.min(maxSlots - nextSlots, numDisplay);
					nextSlots += slots;
					prevSlots -= slots;
					moveList();
				}				
				return false;
			}
			
			//move to next thumbs
			var nextThumbs = function() {
				if (prevSlots < maxSlots) {
					var slots = moveBy1 ? 1 : Math.min(maxSlots - prevSlots, numDisplay);
					prevSlots += slots;
					nextSlots -= slots;	
					moveList();
				}				
				return false;
			}
			
			//item click move
			var itemClick = function() {
				var index = ($(this).index() - prevSlots)%numDisplay
				if (index+1 == numDisplay) {
					nextThumbs();
				}
				else if (index == 0) {
					prevThumbs();
				}
			}
			
			//mouseover scroll up
			var scrollUp = function() {
				$downPane.stop(true,true).fadeIn(DEFAULT_SPEED);
				$rotator.trigger(SHOW_SCROLLBAR);
				
				scrollSpeed = -$list.stop(true).position().top * SCROLL_RATE;
				$list.animate({top:0}, scrollSpeed, 
										 	function() { 
												$upPane.stop(true,true).fadeOut(DEFAULT_SPEED); 
												$rotator.trigger(HIDE_SCROLLBAR);
											});
				$knob.stop(true).animate({top:0}, scrollSpeed);
			}
			
			//mouseover scroll down
			var scrollDown = function() {
				$upPane.stop(true,true).fadeIn(DEFAULT_SPEED);
				$rotator.trigger(SHOW_SCROLLBAR);
				
				scrollSpeed = (range + $list.stop(true).position().top) * SCROLL_RATE;
				$list.animate({top:-range}, scrollSpeed, 
										 	function() { 
												$downPane.stop(true,true).fadeOut(DEFAULT_SPEED);
												$rotator.trigger(HIDE_SCROLLBAR);
											});
				$knob.stop(true).animate({top:$scrollbar.data("range")}, scrollSpeed);
			}
			
			//stop list
			var stopThumbList = function() {
				$list.stop(true);						
				try { 
					$knob.stop(true);
				}
				catch (ex) {
					//no knob
				};
				$rotator.trigger(HIDE_SCROLLBAR);
			}
			
			//mouse move scroll
			var mousemoveScroll = function(e) {		
				var pct = Math.round(((e.pageY - $thumbPanel.offset().top)/$thumbPanel.height()) * 100)/100;
				dest = -Math.round(range * pct);
				if (scrollId == null && dest != $list.position().top) {
					stopThumbList();
					$rotator.trigger(SHOW_SCROLLBAR);
					scrollId = setInterval(scrollList, 30);
				}
			}
			
			//start scroll
			var scrollList = function() {
				var yPos = $list.stop(true).position().top;
				if (yPos == dest) {
					stopScrollTimer();
					$rotator.trigger(HIDE_SCROLLBAR);
				} 
				else {					
					var move = (dest - yPos) * SCROLL_DELAY;
					pos += move < 0 ? Math.min(-1, Math.round(move)) : Math.max(1, Math.round(move));
					$list.css("top", pos);
					try {
						$knob.css("top", Math.round(-pos * $scrollbar.data("ratio")));
					}
					catch (ex) {
						//no knob
					};
				}
			}

			//stop timer scroll
			var stopScrollTimer = function() {
				clearInterval(scrollId);
				scrollId = null;				
			}
			
			//adjust thumbs
			var adjustThumbs = function() {
				if (scrollId == null) {
					var slots = Math.min(currIndex, maxSlots);
					prevSlots = slots;
					nextSlots = maxSlots - prevSlots;				
					moveList();
				}
			}
			
			//move list
			var moveList = function() {
				pos = -prevSlots * $listItems.outerHeight();
				scrollSpeed = Math.min(MAX_SCROLL_SPEED, Math.abs($list.position().top - pos) * SCROLL_RATE);
				if (scrollSpeed > 0) {
					$rotator.trigger(SHOW_SCROLLBAR);
				}
				$list.stop(true).animate({top:pos}, scrollSpeed, 
										 	function() { 
												$rotator.trigger(UPDATE_BUTTONS); 
												$rotator.trigger(HIDE_SCROLLBAR);	
											});
				$rotator.trigger(MOVE_KNOB);
			}

			//init text data
			var initTextData = function($item, padding) {				
				var $p = $item.find(">div:hidden");				
				var textWidth =  getPosNumber(parseInt($p.css("width")) - padding, 300);				
				var textHeight = getPosNumber(parseInt($p.css("height")) - padding, 0);
				$innerText.width(textWidth).html($p.html());
				if (textHeight < $innerText.height()) {
					textHeight = $innerText.height();
				}
				$item.data("textbox", {x:$p.css("left"), y:$p.css("top"), w:textWidth + padding, h:textHeight + padding + 1, color:$p.css("color"), bgcolor:$p.css("background-color")});
			} 
			
			//select list item
			var selectItem = function(e) {
				var $item = $(e.target);
				if ($item[0].nodeName != "LI") {
					$item = $item.parents("li").eq(0);
				}
				var i = $item.index();
				if (i >= 0 && i != currIndex) {
					dir = i < currIndex ? PREV : NEXT; 
					resetTimer();
					prevIndex = currIndex;
					currIndex = i;
					loadContent(currIndex);
				}
				return false;
			}
		
			//rotate image
			var rotateImg = function() {
				resetTimer();
				dir = NEXT;
				prevIndex = currIndex;
				currIndex = currIndex < numItems - 1 ? currIndex + 1 : 0;
				loadContent(currIndex);
			}
			
			//play/pause
			var togglePlay = function() {
				rotate = !rotate;
				$(this).toggleClass("pause", rotate);					
				rotate ? startTimer() : pauseTimer();
				return false;
			}
			
			//pause on last item
			var pauseLast = function(i) {
				if (i == numItems - 1) {
					rotate = false;
					$playButton.toggleClass("pause", rotate);
				}
			}
			
			//start rotate
			var startRotate = function() {
				rotate = true;
				$playButton.toggleClass("pause", rotate);
				startTimer();
			}

			//stop rotate
			var stopRotate = function() {
				rotate = false;
				$playButton.toggleClass("pause", rotate);
				pauseTimer();
			}
			
			//update text box
			var updateText = function(e) {
				if (!$textBox.data("visible")) {
					$textBox.data("visible", true);
					var text = $($listItems.get(currIndex)).find(">div:hidden").html();
					if (text && text.length > 0) {			
						var data = $($listItems.get(currIndex)).data("textbox");
						$innerText.css("color",data.color);
						$textBox.find(".inner-bg").css({"background-color":data.bgcolor, height:data.h-1});
						switch(TEXT_EFFECTS[textEffect]) {
							case TEXT_EFFECTS["fade"]:
								fadeInText(text, data);
								break;
							case TEXT_EFFECTS["down"]:
								expandText(text, data, {width:data.w, height:0}, {height:data.h});
								break;
							case TEXT_EFFECTS["right"]:
								expandText(text, data, {width:0, height:data.h}, {width:data.w});
								break;
							case TEXT_EFFECTS["left"]:
								expandText(text, data, {"margin-left":data.w, width:0, height:data.h}, {width:data.w, "margin-left":0});
								break;
							case TEXT_EFFECTS["up"]:
								expandText(text, data, {"margin-top":data.h, height:0, width:data.w}, {height:data.h, "margin-top":0});
								break;		
							default:
								showText(text, data);
						}
					}					
				}
			}
			
			//reset text box
			var resetText = function() {
				$textBox.data("visible", false).stop(true, true);
				switch(TEXT_EFFECTS[textEffect]) {
					case TEXT_EFFECTS["fade"]:
						if (jQuery.browser.msie) {
							$innerText.css("opacity",0);
						}
						$textBox.fadeOut(TEXT_SPEED, function() { $(this).css("display", "none"); });
						break;
					case TEXT_EFFECTS["down"]:
						$innerText.html("");
						$textBox.animate({height:0, "margin-top":$textBox.outerHeight()}, TEXT_SPEED);
						break;
					case TEXT_EFFECTS["right"]:
						$innerText.html("");
						$textBox.animate({width:0, "margin-left":$textBox.outerWidth()}, TEXT_SPEED);
						break;
					case TEXT_EFFECTS["left"]:
						$innerText.html("");
						$textBox.animate({width:0}, TEXT_SPEED);
						break;
					case TEXT_EFFECTS["up"]:
						$innerText.html("");
						$textBox.animate({height:0}, TEXT_SPEED);
						break;			
					default:
						$textBox.css("display", "none");
				}
			}
			
			//fade in text effect
			var fadeInText = function(text, data) {
				$innerText.css("opacity",1).html(text);
				$textBox.css({top:data.y, left:data.x, width:data.w, height:data.h})
						.stop(true, true).fadeIn(TEXT_SPEED, function() {
																	if (jQuery.browser.msie) {
																		$innerText[0].style.removeAttribute('filter'); 
																	}
																});  
			}
			
			//expand text effect
			var expandText = function(text, data, props1, props2) {
				$innerText.html("");
				$textBox.stop(true).css({display:"block", top:data.y, left:data.x, "margin-top":0, "margin-left":0}).css(props1).animate(props2, TEXT_SPEED,  
					function () {  
						$innerText.html(text);
					});  
			}
			
			//show text effect
			var showText = function(text, data) {
				$textBox.stop(true).css({display:"block", top:data.y, left:data.x, width:data.w, height:data.h});  
				$innerText.html(text);
			}
			
			//display text panel on mouseover
			var displayText = function() {
				$rotator.unbind(UPDATE_TEXT).bind(UPDATE_TEXT, updateText).trigger(UPDATE_TEXT);
			}

			//hide text panel on mouseovers
			var hideText = function() {
				$rotator.unbind(UPDATE_TEXT);
				resetText();
			}
			
			//load current content
			var loadContent = function(i) {
				$rotator.trigger(AUTO_ADJUST).trigger(UPDATE_NUMBER);
				
				if (playOnce) {
					pauseLast(i);
				}
				
				//select thumb
				var $selectedItem = $($listItems.get(i));
				$listItems.filter(".selected").removeClass("selected");
				$selectedItem.removeClass("item-over").addClass("selected").append($arrow);
				
				//set delay
				delay =	$selectedItem.data("delay");
				
				//reset text
				resetText();
				if (!textSync) {
					$rotator.trigger(UPDATE_TEXT);
				}
				
				//set link
				var $currLink = $selectedItem.find(">a:last");
				var href = $currLink.attr("href");
				if (href) {					
					$mainLink.unbind("click", preventDefault).css("cursor","pointer").attr({href:href, target:$currLink.attr("target")});
				}
				else {
					$mainLink.click(preventDefault).css("cursor","default");
				}
				
				//load image
				if ($selectedItem.data("img")) {
					$preloader.hide();	
					displayContent($selectedItem.data("img"));
				}	
				else {	
					//load new image
					var $img = $("<img class='main-img'/>");
					$img.attr("src", $selectedItem.data("imgurl"));								
					if ($img[0].complete || $img[0].readyState == "complete") {
						$preloader.hide();
						storeImg($selectedItem, $img);
						displayContent($img);
					}
					else {
						$preloader.show();
						$img.load(
							function() {
								$preloader.hide();
								storeImg($selectedItem, $(this));
								displayContent($(this));
							}
						).error(
							function() {
								alert("Error loading image");
							}
						);
					}
				}	    
			}
			
			//display content
			var displayContent = function($img) {
				if (vStripeEffect) {
					vStripes.clear();
				}
				if (hStripeEffect) {
					hStripes.clear();
				}
				if (blockEffect) {
					blocks.clear();
				}
				setPrevious();
				
				var effect = $($listItems.get(currIndex)).data("effect");
				if (effect == EFFECTS["none"] || effect == undefined) {
					showContent($img);
					return;
				}
				else if (effect == EFFECTS["fade"]) {
					fadeInContent($img);
					return;
				}
				else if (effect == EFFECTS["h.slide"]) {
					slideContent($img, "left", screenWidth);
					return;
				}
				else if (effect == EFFECTS["v.slide"]) {
					slideContent($img, "top", screenHeight);
					return;
				}
				
				if (effect == EFFECTS["random"]) {
					effect = Math.floor(Math.random() * (ei - 5));
				}
				
				if (effect <= EFFECTS["spiral.out"]) {
					blocks.displayContent($img, effect);
				}
				else if (effect <= EFFECTS["blinds.right"]) {
					vStripes.displayContent($img, effect);
				}
				else {
					hStripes.displayContent($img, effect);					
				}
			}
			
			//set previous
			var setPrevious = function() {
				if (prevIndex >= 0) {
					var currSrc = $("img#curr-img").attr("src");
					var prevSrc = $($listItems.get(prevIndex)).data("imgurl");
					if (currSrc != prevSrc) {
						$("img.main-img", $mainLink).removeAttr("id").hide();
						var $img = $("img.main-img", $mainLink).filter(function() { return $(this).attr("src") == prevSrc; });
						$($img.get(0)).show();
					}
				}
			}
			
			//display content (no effect)
			var showContent = function($img) {
				if (textSync) {
					$rotator.trigger(UPDATE_TEXT);
				}
				$("img.main-img", $mainLink).removeAttr("id").hide();
				$img.attr("id", "curr-img").show();
				startTimer();
			}
			
			//display content (fade effect)
			var fadeInContent = function($img) {
				$("img#curr-img", $mainLink).stop(true, true);
				$("img.main-img", $mainLink).removeAttr("id").css("z-index", 0);
				$img.attr("id", "curr-img").stop(true, true).css({opacity:0,"z-index":1}).show().animate({opacity:1}, duration, easing,
					function() {
						$("img.main-img:not('#curr-img')", $mainLink).hide();
						if (textSync) {
							$rotator.trigger(UPDATE_TEXT);
						}
						startTimer();
					}
				);	
			}
			
			//slide content
			var slideContent = function($currImg, pos, moveby) {
				$strip.stop(true,true);
				var $prevImg = $("#curr-img", $strip);
				if ($prevImg.size() > 0) {
					$(".main-img", $strip).removeAttr("id").parent().css({top:0,left:0});
					$currImg.attr("id", "curr-img").parent().show();
					var $img, dest;
					if (dir == PREV) {
						$strip.css(pos, -moveby);
						$img = $prevImg;					
						dest = 0;
					}
					else {
						$img = $currImg;
						dest = -moveby;
					}
					$img.parent().css(pos,moveby);
					var prop = (pos == "top") ? {top:dest} : {left:dest};
					$strip.stop(true,true).animate(prop, duration, easing,
										function() {
											$(".main-img:not('#curr-img')", $strip).parent().hide();
											$img.parent().css({top:0,left:0});
											$strip.css({top:0,left:0});
											if (textSync) {
												$rotator.trigger(UPDATE_TEXT);
											}
											startTimer();
										});
				}
				else {
					$strip.css({top:0,left:0});
					$(".main-img", $strip).parent().hide().css({top:0,left:0});
					$currImg.attr("id", "curr-img").parent().show();
					if (textSync) {
						$rotator.trigger(UPDATE_TEXT);
					}
					startTimer();
				}
			}
			
			//load image
			var loadImg = function(loadIndex) {
				try {
					var $item = $($listItems.get(loadIndex));
					var $img = $("<img class='main-img'/>");
					$img.attr("src", $item.data("imgurl"));
					$img.load(function() {
								if (!$item.data("img")) {
									storeImg($item, $(this));
								}
								loadIndex++
								if (loadIndex < numItems) {
									loadImg(loadIndex);
								}
							})
						.error(function() {
								loadIndex++
								if (loadIndex < numItems) {
									loadImg(loadIndex);
								}
							});
				}
				catch(ex) {}
			}
			
			//process & store image
			var storeImg = function($item, $img) {
				if (defaultEffect == "h.slide" || defaultEffect == "v.slide") {
					$strip.append($img);
					var $div = $("<div class='content-box'/>").css({width:screenWidth, height:screenHeight});
					$img.wrap($div);
					$img.css("display","block");
				}
				else {
					$mainLink.append($img);
				}
				
				if (autoCenter && $img.width() > 0 && $img.height() > 0) {
					var tDiff = (screenHeight - $img.height())/2;
					var lDiff = (screenWidth  - $img.width())/2
					var top = 0, left = 0, vPad = 0, hPad = 0;
					if (tDiff > 0) {
						vPad = tDiff;
					}
					else if (tDiff < 0) {
						top = tDiff;
					}				
					if (lDiff > 0) {
						hPad = lDiff;
					}
					else if (lDiff < 0) {
						left = lDiff;
					}
					$img.css({top:top, left:left, "padding-top":vPad, "padding-bottom":vPad, "padding-left":hPad, "padding-right":hPad});
				}
				
				$item.data("img", $img);
			}
			
			//start timer
			var startTimer = function() {
				if (rotate && timerId == null) {
					var duration = Math.round($timer.data("pct") * delay);
					$timer.animate({width:screenWidth+1}, duration, "linear");
					timerId = setTimeout(rotateImg, duration);					
				}
			}
			
			//reset timer
			var resetTimer = function() {
				clearTimeout(timerId);
				timerId = null;
				$timer.stop(true).width(0).data("pct", 1);
			}
			
			//pause timer
			var pauseTimer = function() {
				clearTimeout(timerId);
				timerId = null;
				$timer.stop(true).data("pct", 1 - ($timer.width()/(screenWidth+1)));
			}
			
			//shuffle items
			var shuffleItems = function() {
				var $items = new Array(numItems);
				for (var i = 0; i < numItems; i++) {
					$items[i] = $($listItems.get(i)).clone(true);
				}
				
				for (var i = 0; i < numItems; i++) {
					var ri = Math.floor(Math.random() * numItems);
					var temp = $items[i];	
					$items[i] = $items[ri];
					$items[ri] = temp;				
				}
				
				for (var i = 0; i < numItems; i++) {
					$($listItems.get(i)).replaceWith($items[i]);
				}
				
				$listItems = $list.find(">li");
			}
			
			var checkEffect = function(num) {
				if (num == EFFECTS["random"]) {
					blockEffect = hStripeEffect = vStripeEffect = true;
				}
				else if (num <= EFFECTS["spiral.out"]) {
					blockEffect = true;
				}
				else if (num <= EFFECTS["blinds.right"]) {
					vStripeEffect = true;
				}
				else if (num <= EFFECTS["blinds.bottom"]) {
					hStripeEffect = true;
				}
			}
			
			//prevent default behavior
			var preventDefault = function() {
				return false;
			}
		}		
			
		//get positive number
		var getPosNumber = function(val, defaultVal) {
			if (!isNaN(val) && val > 0) {
				return val;
			}
			return defaultVal;
		}
		
		//get nonnegative number
		var getNonNegNumber = function(val, defaultVal) {
			if (!isNaN(val) && val >= 0) {
				return val;
			}
			return defaultVal;
		}
		
		//shuffle array
		var shuffleArray = function(arr) {
			var total =  arr.length;
			for (var i = 0; i < total; i++) {
				var ri = Math.floor(Math.random() * total);
				var temp = arr[i];
				arr[i] = arr[ri];
				arr[ri] = temp;	
			}	
		}
		
		//get number of digits
		var getNumDigits = function(num) {
			var count = 1;
			num = Math.abs(num);
			num = parseInt(num/10);
			while(num > 0) {
				count++;
				num = parseInt(num/10);
			}
			return count;
		}
			
		var defaults = {
			screen_width:600,
			screen_height:300,
			item_width:250,
			item_height:75,
			item_display:4,
			list_align:LEFT,
			scroll_type:"mouse_move",			
			auto_start:true,
			delay:DEFAULT_DELAY,
			transition:"fade",
			transition_speed:DURATION,
			easing:"",
			auto_center:true,
			display_playbutton:true,
			display_number:true,
			display_timer:true,
			display_arrow:true,
			display_thumbs:true,
			display_scrollbar:true,					
			pause_mouseover:false,
			cpanel_mouseover:true,					
			text_mouseover:false,
			text_effect:"down",
			text_sync:true,			
			cpanel_align:"TR",
			timer_align:"bottom",
			move_one:false,
			auto_adjust:true,
			shuffle:false,
			play_once:false,			
			block_size:BLOCK_SIZE,
			vert_size:STRIPE_SIZE,
			horz_size:STRIPE_SIZE,
			block_delay:35,
			vstripe_delay:90,
			hstripe_delay:180	
		};
		
		var opts = $.extend({}, defaults, params);		
		return this.each(
			function() {
				var rotator = new ListRotator($(this), opts);
				rotator.init();
			}
		);
	}
})(jQuery);