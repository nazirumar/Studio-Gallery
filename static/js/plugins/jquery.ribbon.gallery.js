/* FS Slider 1.6.6.29 */
var	html = jQuery('html'),
	ribbon_slider_wrapper = jQuery('.ribbon_slider_wrapper'),
	ribbon_slider = jQuery('.ribbon_slider'),
	ribbon_slide = jQuery('.ribbon_slider li'),
	fs_play_pause = jQuery('.fs_play_pause'),
	ribbon_controls = jQuery('.ribbon_controls'),
	ribbon_title = jQuery('.ribbon_title'),
	r_max_slide = ribbon_slider.find('.ribbon_slide').size(),
	ribbon_imgs = [];

	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		jQuery(document.documentElement).keyup(function (event) {
			if ((event.keyCode == 37)) {
				ribbon_prevSlide();
			} else if ((event.keyCode == 39)) {
				ribbon_nextSlide();
			}
		});
	}
	var ribbon_interval = setInterval('ribbon_nextSlide()', 3000);
	if (ribbon_slider.attr('data-autoplay') == 'autoplay') {
		if (jQuery('.preloader').size() > 0) {
			clearInterval(ribbon_interval);
			fs_play_pause.removeClass('ribbon_state_play');
		} else {
			fs_play_pause.addClass('ribbon_state_play');
		}
	} else {
		clearInterval(ribbon_interval);
	}

jQuery(document).ready(function ($) {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		jQuery('.main_wrapper').addClass('like_fullscreen_type');
		html.addClass('ribbon_slider_page');
		setup_ribbon();
		if (!header.hasClass('fixed')) {
			header.addClass('fixed');
			if (jQuery('.header_holder').size() < 1) {
				header.after('<div class="header_holder"></div>');
			}
			jQuery('.header_holder').height(header.height());
		}

		jQuery('.ribbon_prevSlide').on('click', function () {
			ribbon_prevSlide();
		});
		jQuery('.ribbon_nextSlide').on('click', function () {
			ribbon_nextSlide();
		});
		jQuery('.ribbon_play').on('click', function(){
			ribbon_interval = setInterval('ribbon_nextSlide()', ribbon_slider.attr('data-interval'));
			fs_play_pause.toggleClass('ribbon_state_play');
		});

		jQuery('.ribbon_pause').on('click', function(){
			clearInterval(ribbon_interval);
			fs_play_pause.toggleClass('ribbon_state_play');
		});

		set_ribbon_Slide(1);

		//Touch Events
		var touch_container = ribbon_slider;
		touch_container.on('touchstart', function(event) {
			clearInterval(ribbon_interval);
			touch = event.originalEvent.touches[0];
			startAt = touch.pageX;
			html.addClass('touched');
		});

		touch_container.on('touchmove', function(event) {
			touch = event.originalEvent.touches[0];
			movePath = -1* (startAt - touch.pageX)/2;
			movePercent = (movePath*100)/myWindow.width();
		});
		touch_container.on('touchend', function(event) {
			html.removeClass('touched');
			touch = event.originalEvent.changedTouches[0];
			if (touch.pageX < startAt) {
				ribbon_nextSlide();
			}
			if (touch.pageX > startAt) {
				ribbon_prevSlide();
			}
		});
	}
});


jQuery(window).resize(function () {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		setup_ribbon();
		setup_ribbon_video();
	}
});

jQuery(window).load(function () {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		setup_ribbon();
		setup_ribbon_video();
		setTimeout(setup_ribbon, 300); 
	}
});

function ribbon_prevSlide() {
	cur_slide = parseInt(jQuery('.ribbon_current').attr('data-count'));
	cur_slide--;
	r_max_slide = ribbon_slider.find('.ribbon_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;
	set_ribbon_Slide(cur_slide);
}

function ribbon_nextSlide() {
	cur_slide = parseInt(jQuery('.ribbon_current').attr('data-count'));
	cur_slide++;
	r_max_slide = ribbon_slider.find('.ribbon_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;
	set_ribbon_Slide(cur_slide);
}

function set_ribbon_Slide(slideNum) {
	slideNum = parseInt(slideNum);
	clearInterval(ribbon_interval);
	if (r_max_slide < 5) {
		jQuery('.ribbon_prev').removeClass('ribbon_prev');
		jQuery('.ribbon_current').removeClass('ribbon_current');
		jQuery('.ribbon_next').removeClass('ribbon_next');

		var curSlide = jQuery('.ribbon_slide'+slideNum);
		curSlide.addClass('ribbon_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = jQuery('.ribbon_slide1');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = jQuery('.ribbon_slide'+r_max_slide);
		} else {
			var nextSlide = jQuery('.ribbon_slide'+(parseInt(slideNum)+1));
		}

		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = jQuery('.ribbon_slide'+r_max_slide);
		} else if ((slideNum-1) == 1){
			var prevSlide = jQuery('.ribbon_slide1');
		} else {
			var prevSlide = jQuery('.ribbon_slide'+(parseInt(slideNum)-1));
		}

		prevSlide.addClass('ribbon_prev');
		curSlide.addClass('ribbon_current');
		nextSlide.addClass('ribbon_next');

		mainOffSet = (myWindow.width() - curSlide.width()) /2 - parseInt(ribbon_slider_wrapper.css('left'));
		nextOffset = curSlide.width() + mainOffSet;
		prevOffset = mainOffSet - prevSlide.width();

		curSlide.css('transform' , 'translateX('+mainOffSet+'px)');
		nextSlide.css('transform' , 'translateX('+nextOffset+'px)');
		prevSlide.css('transform' , 'translateX('+prevOffset+'px)');

		ribbon_title.fadeOut(300, function () {
			setTimeout("ribbon_title.html(jQuery('.ribbon_current').attr('data-title'))",100);
			setTimeout("ribbon_title.fadeIn(500)",200);
		});
	} else {
		jQuery('.ribbon_prev2').removeClass('ribbon_prev2');
		jQuery('.ribbon_prev').removeClass('ribbon_prev');
		jQuery('.ribbon_current').removeClass('ribbon_current');
		jQuery('.ribbon_next').removeClass('ribbon_next');
		jQuery('.ribbon_next2').removeClass('ribbon_next2');

		var curSlide = jQuery('.ribbon_slide'+slideNum);
		curSlide.addClass('ribbon_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = jQuery('.ribbon_slide1');
			var nextSlide2 = jQuery('.ribbon_slide2');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = jQuery('.ribbon_slide'+r_max_slide);
			var nextSlide2 = jQuery('.ribbon_slide1');
		} else {
			var nextSlide = jQuery('.ribbon_slide'+(parseInt(slideNum)+1));
			var nextSlide2 = jQuery('.ribbon_slide'+(parseInt(slideNum)+2));
		}

		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = jQuery('.ribbon_slide'+r_max_slide);
			var prevSlide2 = jQuery('.ribbon_slide'+(r_max_slide-1));
		} else if ((slideNum-1) == 1){
			var prevSlide = jQuery('.ribbon_slide1');
			var prevSlide2 = jQuery('.ribbon_slide'+r_max_slide);
		} else {
			var prevSlide = jQuery('.ribbon_slide'+(parseInt(slideNum)-1));
			var prevSlide2 = jQuery('.ribbon_slide'+(parseInt(slideNum)-2));
		}

		prevSlide2.addClass('ribbon_prev2');
		prevSlide.addClass('ribbon_prev');
		curSlide.addClass('ribbon_current');
		nextSlide.addClass('ribbon_next');
		nextSlide2.addClass('ribbon_next2');

		mainOffSet = (myWindow.width() - curSlide.width()) /2 - parseInt(ribbon_slider_wrapper.css('left'));
		nextOffset = curSlide.width() + mainOffSet;
		prevOffset = mainOffSet - prevSlide.width();
		nextOffset2 = nextSlide.width() + nextOffset;
		prevOffset2 = prevOffset - prevSlide2.width();

		curSlide.css('transform' , 'translateX('+mainOffSet+'px)');
		nextSlide.css('transform' , 'translateX('+nextOffset+'px)');
		nextSlide2.css('transform' , 'translateX('+nextOffset2+'px)');
		prevSlide.css('transform' , 'translateX('+prevOffset+'px)');
		prevSlide2.css('transform' , 'translateX('+prevOffset2+'px)');

		ribbon_title.fadeOut(300, function () {
			setTimeout("ribbon_title.html(jQuery('.ribbon_current').attr('data-title'))",100);
			setTimeout("ribbon_title.fadeIn(500)",200);
		});
	}

	setup_ribbon_video();

	if (fs_play_pause.hasClass('ribbon_state_play')) {
		ribbon_interval = setInterval('ribbon_nextSlide()', ribbon_slider.attr('data-interval'));
	}
}
function setup_ribbon_video() {
	ribbon_slider.find('iframe').each(function(){
		var video_height = jQuery(this).height(),
			video_width = (video_height/9)*16;
		if (video_width > myWindow.width()) {
			video_width = myWindow.width() - parseInt(jQuery(this).css('margin-left')) - parseInt(jQuery(this).css('margin-right'));
		}
		jQuery(this).width(video_width);
	});
}
function setup_ribbon() {
	if (jQuery('#wpadminbar').size() > 0) {
		var set_height = myWindow.height() - jQuery('#wpadminbar').height() - jQuery('.footer').height(),
			set_top = jQuery('#wpadminbar').height();
	} else {
		var set_height = myWindow.height() - jQuery('.footer').height(),
			set_top = 0;
	}

	var ribbon_slide_html = jQuery('.ribbon_slide');
	ribbon_slide_html.each(function () {
		if (ribbon_slide_html.width() < ribbon_slide_html.height()) {
			var this_img = jQuery(this).find('img').attr('src');
			jQuery(this).css({'background-image': 'url('+this_img+')', 'background-size': 'cover'});
			jQuery(this).find('img').css({'opacity': 0});
		} else {
			jQuery(this).css({'background-image': ''});
			jQuery(this).find('img').css({'opacity': 1});
		}
	});


	ribbon_slider_wrapper.css('top', set_top+'px').height(set_height);
	ribbon_slider.height(set_height);
	ribbon_slide.height(set_height);
	cur_slide = parseInt(jQuery('.ribbon_current').attr('data-count'));
	set_ribbon_Slide(cur_slide);
}

