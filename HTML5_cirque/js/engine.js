var win_width=$(window).width();
var win_height=$(window).height();
var scale_width=win_width/740;
var scale_height=win_height/487;

var page = 1;
var nSlidePage = 0;
var flgArrow = false;
var axesPrev = [];

var bTilt = false;

$(document).ready(function(){
//	$("#bg_main").mousedown(function(e) {
//		startPos = e.pageX;
//	}).mouseup(function(e) {
//		if ( startPos > e.pageX )
//		{
//			next();
//		} else {
//			prev();
//		}
//	});
	
	/*device tilt event*/
	var tilt = function(axes) {
		if (axesPrev) {
			for ( var i = 0; i < axes.length; i++) {
				var delta = axes[i] - axesPrev[i];
				if(bTilt){
					if (delta > 0.7) {
						next();
					}else if(delta<-0.7) prev();
				}
			}
		}
		axesPrev = axes;
	};
	
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', function(event) {
			tilt([ event.beta, event.gamma ]);
		}, true);
	} else if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', function(event) {
			tilt([ event.acceleration.x * 2, event.acceleration.y * 2 ]);
		}, true);
	} else {
		window.addEventListener('MozOrientation', function(orientation) {
			tilt([ orientation.x * 50, orientation.y * 50 ]);
		}, true);
	}
	
	
	
	/**/	
	
	setTimeout("animation()",100);
	$('#wrap').css('width', win_width+'px');
	$('#wrap').css('height', win_height+'px');
	
	$('#arrows').css('top', scale_height*243+'px');
	$('#arrows').css('display', 'none');
	
	$('#black_bar').css('top', scale_height*399+'px');
	
	$('#bg_1').css('width', scale_width*744+'px');
	$('#bg_1').css('height', scale_height*487+'px');
	
	$('#black_bar').css('width', scale_width*744+'px');
	$('#black_bar').css('height', scale_height*516+'px');
//	$('#black_bar').css('left', scale_width*(-127)+'px');
	$('#black_bar').css('top', scale_height*399+'px');
	
	$('#main_girl').css('width', scale_width*279+'px');
	$('#main_girl').css('height', scale_height*246+'px');
	$('#main_girl').css('left', scale_width*259+'px');
	$('#main_girl').css('top', scale_height*127+'px');
	
	$('#bg_main').css('width', scale_width*5631+'px');
	$('#bg_main').css('height', scale_height*487+'px');
//	$('#bg_main').css('left', scale_width*(-127)+'px');
//	$('#background_div').css('top', scale_height*346+'px');
	
	$('#background_div').css('width', scale_width*5631+'px');
	$('#background_div').css('height', scale_height*487+'px');
	$('#background_div').css('left', '0px');
//	$('#background_div').css('top', scale_height*346+'px');
	$('#background_div').css('z-index', '1');
	
	$('#blue_couple').css('width', scale_width*365/2+'px');
	$('#blue_couple').css('height', scale_height*298/2+'px');
	$('#blue_couple').css('left', scale_width*1435+'px');
	$('#blue_couple').css('top', scale_height*(-298/2)+'px');
	
	$('#spotlight_1').css('width', scale_width*163/2+'px');
	$('#spotlight_1').css('height', scale_height*1800/2+'px');
	$('#spotlight_1').css('left', scale_width*1200+'px');
	$('#spotlight_1').css('top', scale_height*(-500)+'px');
	
	$('#spotlight_2').css('width', scale_width*163/2+'px');
	$('#spotlight_2').css('height', scale_height*1800/2+'px');
	$('#spotlight_2').css('left', scale_width*2524+'px');
	$('#spotlight_2').css('top', scale_height*(-500)+'px');

	$('#spotlight_3').css('width', scale_width*163/2+'px');
	$('#spotlight_3').css('height', scale_height*1800/2+'px');
	$('#spotlight_3').css('left', scale_width*4670+'px');
	$('#spotlight_3').css('top', scale_height*(-500)+'px');
	
	$('#piano').css('width', scale_width*338+'px');
	$('#piano').css('height', scale_height*204+'px');
	$('#piano').css('left', win_width+'px');
	$('#piano').css('top', scale_height*169+'px');
	$('#piano').css('display', 'none');
	
	$('#umbrella_red_girl').css('width', scale_width*156+'px');
	$('#umbrella_red_girl').css('height', scale_height*253+'px');
	$('#umbrella_red_girl').css('left', win_width/3+'px');
	$('#umbrella_red_girl').css('top', scale_height*80+'px');
	$('#umbrella_red_girl').css('opacity', '0');
	
	$('#flower_drift').css('width', scale_width*948+'px');
	$('#flower_drift').css('height', scale_height*665+'px');
	$('#flower_drift').css('left', scale_width*2766+'px');
	$('#flower_drift').css('top', scale_height*(-325)+'px');
	
	$('#bg_girl').css('width', scale_width*706+'px');
	$('#bg_girl').css('height', scale_height*432+'px');
	$('#bg_girl').css('left', scale_width*52+'px');
	$('#bg_girl').css('top', scale_height*0+'px');
	$('#bg_girl').css('opacity', '0');
	
	$('#blue_man').css('width', scale_width*188+'px');
	$('#blue_man').css('height', scale_height*170+'px');
	$('#blue_man').css('left', scale_width*26+'px');
	$('#blue_man').css('top', scale_height*22+'px');
	$('#blue_man').css('opacity', '0');
	
	$('#thumbnails').css('width', scale_width*314+'px');
	$('#thumbnails').css('height', scale_height*184+'px');
	$('#thumbnails').css('left', scale_width*52+'px');
	$('#thumbnails').css('top', scale_height*226+'px');
	$('#thumbnails').css('opacity', '0');
	
	$('#yellow_couple').css('width', scale_width*397/1.8+'px');
	$('#yellow_couple').css('height', scale_height*718/1.8+'px');
	$('#yellow_couple').css('left', scale_width*50+'px');
	$('#yellow_couple').css('top', scale_height*0+'px');
	$('#yellow_couple').css('opacity', '0');
	
	spotlight_rotate_1();
});
	

function animation(){
	
	if( flgArrow == true ){
		for( i=1; i<17; i++ ){
			if(page==i){
				$('#page_'+i).animate({left:'0px'}, 300).show();
			}else if(page<i){
				$('#page_'+i).animate({left:win_width+'px'}, 300).hide();
			}else{
				$('#page_'+i).animate({left:'-'+win_width+'px'}, 300).hide();
			}
		}
	}
	flgArrow = false;
//	console.log(nSlidePage, page);
	switch( page ){
		case 1:
			$("#bg_1").animate({opacity:"0"}, 3000, function(){
				page++;
				animation();
				$('#arrows').css('display','block');
				bTilt=true;
//				nSlidePage = 1;
			});
			
			break;
		case 2:
			
			
			if(nSlidePage==2)animation_blue_couple();
			
			if(nSlidePage==3){
//				setTimeout('transition_1', 5000);
				$('#main_girl').animate({opacity:1}, 1000, function(){
					page++;
					
					$('#main_girl').animate({opacity:0}, 3000, function(){
						next();
					});
					animation();
				});
			}
			
			
			break;
		case 3:
			$('#arrows').css('display','none');
			bTilt=false;
			
			break;
		case 4:
//			console.log(page, nSlidePage);
			if(nSlidePage==5)$('#main_girl').animate({opacity:1}, 2000);
			if(nSlidePage==7)$('#main_girl').animate({opacity:0.5}, 2000,function(){
				$('#main_girl').animate({opacity:0}, 2000);
				$('#background_div').animate({opacity:0},2000);
				page++;
				animation();
			});
			break;
		case 5:
//			console.log(page,nSlidePage);
//			alert(page);
			$('#bg_girl').animate({opacity:1}, 3500);
			$('#blue_man').animate({opacity:0}, 1000).animate({opacity:1},3000);
			$('#thumbnails').animate({opacity:0}, 2000).animate({opacity:1},3000).animate({opacity:1},2000,function(){
				$('#bg_girl').animate({opacity:0}, 2000);
				$('#blue_man').animate({opacity:0}, 2000);
				$('#thumbnails').animate({opacity:0}, 2000,function(){
					$('#yellow_couple').animate({opacity:1}, 2000, function(){
//						$('#yellow_couple').animate({opacity:0},4000);
						$('#yellow_couple').animate({left:win_width*3/5,width:scale_width*397/3,height:scale_height*718/3},4000).animate({opacity:0},2000);
						
					});
				});
				
			});
			break;
		case 6:
			
			break;
	}
}

function prev(){
	if(nSlidePage>0){
		$('#arrows').css('display', 'none');
		bTilt=false;
	}
	if(page==2){
		
		if(parseInt($('#background_div').css('left'))<0){
			if(Math.abs(parseInt($('#background_div').css('left')))>win_width){
				$('#background_div').animate({left: '+='+win_width+'px'}, /*{queue:false, duration:2000, easing:'easeOutExpo'}*/ 2000,function(){
					
					$('#arrows').css('display', 'block');
					bTilt=true;
				});
				
			}else{
				$('#background_div').animate({left: '0px'}, /*{queue:false, duration:2000, easing:'easeOutExpo'}*/ 2000,function(){
					
					$('#arrows').css('display', 'block');
					bTilt=true;
				});
				
			}
			
		}
		
	}
	if(page==4){
		if(nSlidePage==5){
			$('#arrows').css('display', 'block');
			bTilt=true;
		}else{
			$('#background_div').animate({left: '+='+win_width+'px'}, /*{queue:false, duration:2000, easing:'easeOutExpo'}*/ 2000,function(){
				
				$('#arrows').css('display', 'block');
				bTilt=true;
			});
		}
	}
	
	
	if(nSlidePage>0&&nSlidePage!=5)nSlidePage--;
	
//	if( page > 2 ){
//		page--;
//		flgArrow = true;
//	}
	
	animation();
}

function next(){
	nSlidePage++;
	$('#arrows').css('display', 'none');
	bTilt=false;
//	if(page==2||page==3){
//		if(parseInt($('#background_div').css('width'))-Math.abs(parseInt($('#background_div').css('left')))-win_width>win_width){
			$('#background_div').animate({left: '-='+win_width+'px'}, /*{queue:false, duration:2000, easing:'easeOutExpo'}*/ 2000,function(){
				if(nSlidePage<3||nSlidePage>4){
					$('#arrows').css('display', 'block');
					bTilt=true;
					
				}
				
				if(nSlidePage==4){
					$('#piano').css('display','block');
					
					$('#piano').animate({left:win_width/2+'px'}, 2000).animate({left:win_width/2+'px'}, 1000, function(){
//						$('#umbrella_red_girl').animate({opacity:1},1000).animate({top:scale_height*(-253)+'px', left:scale_width/4+'px'}, {queue:false, duration:4000, easing:'easeOutQuint'} );
						var arc_params = {
							    center: [win_width/3,scale_height*(-253)],  
							    radius: 335*scale_height,    
							    start: 0,
							    end: -90,
							    dir: -1
							};
						
						$('#umbrella_red_girl').animate({opacity:1},1000).animate({path : new $.path.arc(arc_params)}, 3000);


						$('#piano').animate({left:win_width/2+'px'}, 4000).animate({left:win_width+'px'}, 2000, function(){
							$('#piano').css('display','none');
							$('#umbrella_red_girl').css('display','none');
							
							page++;
							next();
						});
					});
				}
				
				if(nSlidePage==6){
					$('#arrows').css('display','none');
					bTilt=false;
					
					$('#main_girl').animate({opacity:0},2000, function(){
						next();
					});
				}
				if(nSlidePage==7){
					$('#arrows').css('display','none');
					bTilt=false;
				}
			});
			
//		}
//	}
	
	animation();
}

function animation_blue_couple(){
	$('#blue_couple').animate({top:'50px'}, 1000)/*.animate({top:'1px'}, 1000)*/;
//	setTimeout('animation_blue_couple()',1000);
}

function spotlight_rotate_1(){
	$("#spotlight_1").rotate({ angle:-40,animateTo:40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_2 });
	$("#spotlight_2").rotate({ angle:-40,animateTo:40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_2 });
	$("#spotlight_3").rotate({ angle:-40,animateTo:40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_2 });
	
}

function spotlight_rotate_2(){
	$("#spotlight_1").rotate({ angle:40,animateTo:-40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_1 });
	$("#spotlight_2").rotate({ angle:40,animateTo:-40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_1 });
	$("#spotlight_3").rotate({ angle:40,animateTo:-40,duration:5000, easing: $.easing.easeInOutExpo, callback: spotlight_rotate_1 });
	
}