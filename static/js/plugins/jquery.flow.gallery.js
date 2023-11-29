//	Flow Gallery Script. Ver. 1.0  //

var	flow_controls = jQuery('.fs_controls_append'),
	fs_title_wrapper = jQuery('.fs_title_wrapper'),
	mirror_container = jQuery('.mirror_container'),
	tpb = jQuery('.top_padding_block'),
	img_ration = 650/600,
	side_off1_p = 0.3754, //244*100/650
	side_off2_p = 0.7031, //457*100/650
	scale1 = 0.83333333,
	scale2 = 0.7,
	flow_imgs = [];

jQuery.fn.flow_gallery = function (flow_options) {	
	jQuery('html').addClass('flow_gallery');
	jQuery('.flow_reflection').each(function(){
		jQuery(this).css('background-image', 'url('+jQuery(this).attr('data-src')+')');
	});
	var flow_container = this,
		$fs_title = jQuery('.fs_title'),
		$fs_descr = jQuery('.fs_descr'),
		$fs_title_wrapper = jQuery('.fs_title_wrapper'),
		maxSlide  = flow_container.find('li').size(),
		items_count = flow_container.find('li').size();

	nextStep = function () {
        clearInterval(flow_interval);
		cur_slide = parseInt(jQuery('.currentStep').attr('data-count'));
		cur_slide++;
		if (cur_slide > maxSlide) cur_slide = 1;
		if (cur_slide < 1) cur_slide = maxSlide;

		if (flow_container.hasClass('type3')) {
			setSlide(cur_slide);
		} else {
			setSlide(cur_slide);
		}

        if (!flow_container.hasClass('paused')) {
            flow_interval = setInterval('nextStep()', flow_options.slide_time);
        }
    } //EOF

    /* P R E V I O U S   S L I D E */
    prevStep = function () {
        clearInterval(flow_interval);

		cur_slide = parseInt(jQuery('.currentStep').attr('data-count'));
		cur_slide--;
		if (cur_slide > maxSlide) cur_slide = 1;
		if (cur_slide < 1) cur_slide = maxSlide;

		if (flow_container.hasClass('type3')) {
			setSlide(cur_slide);
		} else {
			setSlide(cur_slide);
		}

        if (!flow_container.hasClass('paused')) {
            flow_interval = setInterval('nextStep()', flow_options.slide_time);
        }		
    }

    /* S E T   S L I D E */
    setSlide = function (slideNum) {	
		jQuery('.prevStep2').removeClass('prevStep2');
		jQuery('.prevStep').removeClass('prevStep');
		jQuery('.currentStep').removeClass('currentStep');
		jQuery('.nextStep').removeClass('nextStep');
		jQuery('.nextStep2').removeClass('nextStep2');
		jQuery('.flow_item').css({'left' : '50%', 'transform' : 'scale(0,0)'}); 
		
		curSlide = jQuery('#flow_item'+slideNum);
		curSlide.addClass('currentStep');
		
		if((parseInt(slideNum)+1) > maxSlide) {
			nextSlide = jQuery('#flow_item1');
			nextSlide2 = jQuery('#flow_item2');
		} else if ((parseInt(slideNum)+1) == maxSlide){
			nextSlide = jQuery('#flow_item'+maxSlide);
			nextSlide2 = jQuery('#flow_item1');
		} else {
			nextSlide = jQuery('#flow_item'+(parseInt(slideNum)+1));
			nextSlide2 = jQuery('#flow_item'+(parseInt(slideNum)+2));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			prevSlide = jQuery('#flow_item'+maxSlide);
			prevSlide2 = jQuery('#flow_item'+(maxSlide-1));
		} else if ((slideNum-1) == 1){
			prevSlide = jQuery('#flow_item1');
			prevSlide2 = jQuery('#flow_item'+maxSlide);
		} else {
			prevSlide = jQuery('#flow_item'+(parseInt(slideNum)-1));
			prevSlide2 = jQuery('#flow_item'+(parseInt(slideNum)-2));
		}
	
		prevSlide2.addClass('prevStep2');
		prevSlide.addClass('prevStep');
		curSlide.addClass('currentStep');
		nextSlide.addClass('nextStep');
		nextSlide2.addClass('nextStep2');

        $fs_title.fadeOut(300);
        $fs_descr.fadeOut(300, function () {
            $fs_title.html(curSlide.attr('data-title'));
            $fs_descr.html(curSlide.attr('data-caption'));
			if (curSlide.attr('data-caption') == '') {
				$fs_title.addClass('only_title');
			} else {
				$fs_title.removeClass('only_title');
			}		
			if (curSlide.attr('data-title') == '') {
				$fs_title.addClass('only_caption');
			} else {
				$fs_title.removeClass('only_caption');
			}
			
			if (curSlide.attr('data-caption') == '' && curSlide.attr('data-title') == '') {
				$fs_title_wrapper.addClass('empty_block');
			} else {
				$fs_title_wrapper.removeClass('empty_block');
			}
				
            $fs_title.fadeIn(400);
            $fs_descr.fadeIn(400);
        });		
	
		if (myWindow.width() > 0) {
			if (html.hasClass('gallery_fullscreen')) {
				setHeight = myWindow.height() - tpb.height() - fs_title_wrapper.height();
				setTop = tpb.height();
			} else {
				if (jQuery('#wpadminbar').size() > 0) {
					setHeight = myWindow.height() - $fs_title_wrapper.height() - jQuery('#wpadminbar').height() - flow_controls.height() - header.height() - tpb.height();
				} else {
					setHeight = myWindow.height() - $fs_title_wrapper.height() - flow_controls.height() - header.height() - tpb.height();
				}
				setTop = header.height() + tpb.height();
			}
			setImgHeight = setHeight - mirror_container.height();
			setImgWidth = img_ration*setImgHeight;
			flow_container.height(setHeight).css('top', setTop+'px');
			flow_container.find('li').width(setImgWidth).height(setHeight);
			flow_container.find('img').height(setImgHeight).width(setImgWidth);
		}

		mainOffSet = (myWindow.width() - setImgWidth) /2;
		prevOffset = mainOffSet - setImgWidth*side_off1_p;
		prevOffset2 = mainOffSet - setImgWidth*side_off2_p;
		nextOffset = mainOffSet + setImgWidth*side_off1_p;
		nextOffset2 = mainOffSet + setImgWidth*side_off2_p;
		
		curSlide.css({'left' : mainOffSet, 'transform' : 'scale(1,1)'}); 
		prevSlide.css({'left' : prevOffset, 'transform' : 'scale('+ scale1 +', '+ scale1 +')'});
		prevSlide2.css({'left' : prevOffset2, 'transform' : 'scale('+ scale2 +','+ scale2 +')' });
		nextSlide.css({'left' : nextOffset, 'transform' : 'scale('+ scale1 +','+ scale1 +')'});
		nextSlide2.css({'left' : nextOffset2, 'transform' : 'scale('+ scale2 +','+ scale2 +')'});
   } //EOF	
		
	if (items_count > 1) {
		var flow_interval = setInterval('nextStep()', flow_options.slide_time);    
	}
    if (flow_options.autoplay == 0) {
		clearInterval(flow_interval);
        playpause = "sprite_play";
    } else {
        playpause = "sprite_pause";
    }
    if (flow_options.show_controls == 0) {
		jQuery('html').addClass('gallery_fullscreen');
    }
	
    if (items_count > 1) {
        flow_controls.append('<a href="javascript:void(0)" class="sprite_prev type_grey sprite_element fs_slider_prev"></a><a href="javascript:void(0)" id="fs_play-pause" class="sprite_element type_grey '+playpause+'"></a><a href="javascript:void(0)" class="sprite_next type_grey sprite_element fs_slider_next"></a><a href="javascript:void(0)" class="sprite_fullsize type_grey sprite_element fs_controls_toggler"></a>');
    }
    if (flow_options.autoplay == 0) {
        flow_container.addClass('paused');
    }
	if (items_count > 4) {
		flow_container.addClass('type5');
	} else if (items_count > 2) {
		flow_container.addClass('type3');
	}
		  
   setSlide(1);
   
   if (flow_options.autoplay !== 0 && items_count > 1) {
		
   }
	if (items_count > 1) {		
		jQuery('.fs_slider_prev').on('click', function () {
			prevStep();
		});
		jQuery('.fs_slider_next').on('click', function () {
			nextStep();
		});
		jQuery('.flow_item').on('click',function(){
			setSlide(jQuery(this).attr('data-count'));
		});
		jQuery(document.documentElement).keyup(function (event) {
			if ((event.keyCode == 37)) {
				prevStep();
			} else if ((event.keyCode == 39)) {
				nextStep();
			}
		});
	
		jQuery('#fs_play-pause').on('click', function () {
			if (jQuery(this).hasClass('sprite_pause')) {
				flow_container.addClass('paused');
				jQuery(this).removeClass('sprite_pause').addClass('sprite_play');
				clearInterval(flow_interval);
			} else {
				flow_container.removeClass('paused');
				jQuery(this).removeClass('sprite_play').addClass('sprite_pause');
				flow_interval = setInterval('nextStep()', flow_options.slide_time);
			}
		});
	
		flow_container.on('touchstart', function(event) {
			clearInterval(flow_interval);
			touch = event.originalEvent.touches[0];
			startAt = touch.pageX;
			html.addClass('touched');
		});		
		
		flow_container.on('touchmove', function(event) {			
			touch = event.originalEvent.touches[0];
			movePath = -1* (startAt - touch.pageX)/2;
			movePercent = (movePath*100)/myWindow.width();
		});
		flow_container.on('touchend', function(event) {
			html.removeClass('touched');
			touch = event.originalEvent.changedTouches[0];
			if (touch.pageX < startAt) {
				nextStep();
			}
			if (touch.pageX > startAt) {
				prevStep();
			}
		});
	} //EOF   
} //EOS

jQuery(document).ready(function ($) {
	jQuery('.flow_container').flow_gallery({
		fx: 'fade', /*fade, slip*/
		fit: 'no_fit',
		slide_time: 3000, /*This time must be < then time in css*/
		autoplay: 0,
		show_controls: 0
	});
	setGalleryContainer(jQuery('.fs_gallery_container'));

});

jQuery(window).resize(function () {
	setGalleryContainer(jQuery('.fs_gallery_container'));
	if (jQuery('.fs_gallery_container').hasClass('type3')) {
		updateSlide3();
	} else {
		updateSlide();
	}
});

jQuery(window).load(function () {
	setGalleryContainer(jQuery('.fs_gallery_container'));
	if (jQuery('.fs_gallery_container').hasClass('type3')) {
		updateSlide3();
	} else {
		updateSlide();
	}
});

function updateSlide() {
	slideNum = parseInt(jQuery('.currentStep').attr('data-count'));
	flow_container = jQuery('.flow_container');
	
	prevSlide2 = jQuery('.prevStep2');
	prevSlide = jQuery('.prevStep');
	curSlide = jQuery('.currentStep');
	nextSlide = jQuery('.nextStep');
	nextSlide2 = jQuery('.nextStep2');

	if (myWindow.width() > 760) {
		if (html.hasClass('gallery_fullscreen')) {
			setHeight = myWindow.height() - tpb.height() - fs_title_wrapper.height();
			setTop = tpb.height();
		} else {
			if (jQuery('#wpadminbar').size() > 0) {
				setHeight = myWindow.height() - fs_title_wrapper.height() - jQuery('#wpadminbar').height() - flow_controls.height() - header.height() - tpb.height();
			} else {
				setHeight = myWindow.height() - fs_title_wrapper.height() - flow_controls.height() - header.height() - tpb.height();
			}
			setTop = header.height() + tpb.height();
		}
		setImgHeight = setHeight - mirror_container.height();
		setImgWidth = img_ration*setImgHeight;
		flow_container.height(setHeight).css('top', setTop+'px');
		flow_container.find('li').width(setImgWidth).height(setHeight);
		flow_container.find('img').height(setImgHeight).width(setImgWidth);
	}
	
	mainOffSet = (myWindow.width() - setImgWidth) /2;
	prevOffset = mainOffSet - setImgWidth*side_off1_p;
	prevOffset2 = mainOffSet - setImgWidth*side_off2_p;
	nextOffset = mainOffSet + setImgWidth*side_off1_p;
	nextOffset2 = mainOffSet + setImgWidth*side_off2_p;
	
	curSlide.css({'left' : mainOffSet, 'transform' : 'scale(1,1)'}); 
	prevSlide.css({'left' : prevOffset, 'transform' : 'scale('+ scale1 +', '+ scale1 +')'});
	prevSlide2.css({'left' : prevOffset2, 'transform' : 'scale('+ scale2 +','+ scale2 +')' });
	nextSlide.css({'left' : nextOffset, 'transform' : 'scale('+ scale1 +','+ scale1 +')'});
	nextSlide2.css({'left' : nextOffset2, 'transform' : 'scale('+ scale2 +','+ scale2 +')'});	
}
function show_hide_controls() {
	if (html.hasClass('gallery_fullscreen')) {
		html.removeClass('gallery_fullscreen');
	} else {
		html.addClass('gallery_fullscreen');
	}	
	updateSlide();
	//setTimeout("updateSlide()", 500);
}
function setGalleryContainer(contClass) {
	if (!html.hasClass('gallery_fullscreen')) {
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = myWindow.height() - header.height() - jQuery('#wpadminbar').height() - flow_controls.height();
		} else {
			setHeight = myWindow.height() - header.height() - flow_controls.height();
		}
		contClass.height(setHeight).css('top', header.height() + 'px');	
	} else {
		setHeight = myWindow.height();
		jQuery('.fs_gallery_container').height(setHeight).css('top', '0px');	
	}
}