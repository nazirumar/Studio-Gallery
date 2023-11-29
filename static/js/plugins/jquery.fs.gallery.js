/* FS Slider 1.6.11.14m JB */
var	html = jQuery('html'),
	fs_slider = jQuery('.fs_slider'),
	fs_title_wrapper = jQuery('.fs_title_wrapper'),
	fs_title = jQuery('.fs_title'),
	fs_descr = jQuery('.fs_descr'),
	fs_btn_prev = jQuery('.fs_slider_prev'),
	fs_btn_next = jQuery('.fs_slider_next'),
	fs_controls = jQuery('.fs_controls'),
	max_slide = fs_slider.find('.fs_slide').size(),
	fs_overlay = jQuery('.fs_overlay'),
	fs_thmb_viewport = jQuery('.fs_thmb_viewport'),
	fs_thumbs = jQuery('.fs_thumbs'),
	set_video_controls = fs_slider.attr('data-video'),
	fs_thumb_slide = jQuery('.thmb_slide');

/* YouTube API */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

html.addClass('fs_gallery_page');

/* Start FS Gallery */
if (jQuery('.fs_gallery_trigger').size() > 0) {
	jQuery(document.documentElement).keyup(function (event) {
		if ((event.keyCode == 37)) {
			fs_prevSlide();
		} else if ((event.keyCode == 39)) {
			fs_nextSlide();
		}
	});
}
if (fs_slider.hasClass('controls_off')) {
	html.addClass('hide_fs_controls');
}
var fs_interval = setInterval('fs_nextSlide()', fs_slider.attr('data-interval'));
clearInterval(fs_interval);
jQuery('.fs_play_pause').removeClass('fs_state_play');

jQuery(document).ready(function ($) {
	if (jQuery('.fs_gallery_trigger').size() > 0) {
		jQuery('.main_wrapper').addClass('like_fullscreen_type');
		html.addClass('fullscreen_slider');
	
		jQuery('.fs_slider_prev').on('click', function () {
			fs_prevSlide();
		});
		jQuery('.fs_slider_next').on('click', function () {
			fs_nextSlide();
		});
		jQuery('.fs_controls_toggler').on('click', function () {
			html.toggleClass('hide_fs_controls');
		});
		jQuery('.info_btn').on('click', function () {
			html.toggleClass('hide_title');
		});
		
		jQuery('.fs_play_pause').on('click', function(){
			if (jQuery(this).hasClass('fs_state_play')) {
				clearInterval(fs_interval);
			} else {
				if (!jQuery('.fs_play_pause').hasClass('paused_by_video')) {
					fs_interval = setInterval('fs_nextSlide()', fs_slider.attr('data-interval'));
				}
			}
			jQuery('.fs_play_pause').toggleClass('fs_state_play');
		});

		//Touch Events
		if (fs_overlay.size() > 0) {
			var touch_container = fs_overlay;
		} else {
			var touch_container = fs_slider;
		}
		touch_container.on('touchstart', function(event) {
			clearInterval(fs_interval);
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
			test_path = startAt - touch.pageX;
			console.log(test_path);
			if (test_path > 100 ) {
				fs_nextSlide();
			}
			if (test_path < -100 ) {
				fs_prevSlide();
			}
		});			
		set_step = 0;
	
		if (jQuery('.fs_thumbs').size() > 0) {
			fs_thumbs_setup();
		}
		fs_thumb_slide.on('click', function(){
			var setThmb = jQuery(this).attr('data-count');
			setSlide(setThmb);
		});
		
		set_step = 0;
		max_right = myWindow.width() - fs_thumbs.width();
		
		if ((myWindow.width() > 1024) && (fs_thumbs.width() > myWindow.width())) {
			fs_thumbs.on('mouseenter',function(e){
				fs_thumbs.addClass('hovered');
				fs_title_wrapper.addClass('hovered');
				move_thumbs = setInterval(function () {
					curstep = parseInt(fs_thumbs.css('left'));
					setstep = curstep + set_step;
					max_right = myWindow.width() - fs_thumbs.width();
					
					if (setstep > 0) {
						setstep = 0;
					} else if (setstep < max_right) {
						setstep = max_right;
					}
					
					fs_thumbs.css('left', setstep+'px');
				}, 100);
				
			});
			fs_thumbs.on('mousemove',function(e){
				cursorX = e.clientX;
				left_zone = myWindow.width()/3;
				right_zone = myWindow.width() - left_zone;
	
				if (cursorX < left_zone) {
					cur_pos = left_zone - cursorX;
					set_step = Math.floor(cur_pos/15);
				} else if (cursorX > right_zone) {
					cur_pos = cursorX - right_zone;
					curent_step = parseInt(fs_thumbs.css('left'));
					set_step = -1*Math.floor(cur_pos/15);
				} else {
					set_step = 0;
				}
				
			});
			fs_thumbs.on('mouseleave', function () {
				fs_thumbs.removeClass('hovered');
				fs_title_wrapper.removeClass('hovered');
				slideNum = jQuery('.current-thmb').attr('data-count');
				
				thmbs_on_screen = Math.ceil(myWindow.width()/fs_thumb_slide.width()/2);
				set_thmb_left = -1 * fs_thumb_slide.width() * (slideNum-thmbs_on_screen);
				max_right = myWindow.width() - fs_thumbs.width();
	
				if (slideNum > thmbs_on_screen);
				if (set_thmb_left < max_right) {
					set_thmb_left = max_right;
				}
				if (set_thmb_left > 0) {
					set_thmb_left = 0;
				}
				if (!fs_thumbs.hasClass('hovered')) {
					fs_thumbs.css('left', set_thmb_left+'px');
				}
				clearInterval(move_thumbs);
			});
		}
		if (fs_thumbs.width() < myWindow.width()) {
			fs_thumbs.addClass('centered_thumbs');
		} else {
			fs_thumbs.removeClass('centered_thumbs');
		}		
		jQuery('.fs_slider_share').on('click', function(){
			html.addClass('show_share');
		});
		jQuery('.fs_share_fadder').on('click', function(){
			html.removeClass('show_share');
		});
		fs_thmb_viewport.on('mouseenter',function(e){
			html.addClass('thmbs_showed');
		});
		fs_thmb_viewport.on('mouseleave',function(e){
			html.removeClass('thmbs_showed');
		});
	}
});

jQuery(window).resize(function () {
	if (jQuery('.fs_gallery_trigger').size() > 0) {
		setGalleryContainer(jQuery('.fs_gallery_container'));
		setVideoFrame();
	}
});

function fs_prevSlide() {
	cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
	cur_slide--;
	max_slide = fs_slider.find('.fs_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;	
	setSlide(cur_slide);
}

function fs_nextSlide() {
	cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
	cur_slide++;
	max_slide = fs_slider.find('.fs_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;
	setSlide(cur_slide);
}

function setSlide(slideNum) {
	clearInterval(fs_interval);
	slideNum = parseInt(slideNum);

	fs_thumbs.removeClass('current-thmb');
	jQuery('.current-thmb').removeClass('current-thmb');
	
	jQuery('.prev-slide').removeClass('prev-slide');
	jQuery('.current-slide').removeClass('current-slide');
	jQuery('.next-slide').removeClass('next-slide');

	if((parseInt(slideNum)+1) > max_slide) {
		nextSlide = jQuery('.fs_slide1');
	} else if ((parseInt(slideNum)+1) == max_slide){
		nextSlide = jQuery('.fs_slide'+max_slide);
	} else {
		nextSlide = jQuery('.fs_slide'+(parseInt(slideNum)+1));
	}
	
	if((parseInt(slideNum)-1) < 1) {
		prevSlide = jQuery('.fs_slide'+max_slide);
	} else if ((slideNum-1) == 1){
		prevSlide = jQuery('.fs_slide1');
	} else {
		prevSlide = jQuery('.fs_slide'+(parseInt(slideNum)-1));
	}

	prevSlide.addClass('prev-slide');
	var curSlide = jQuery('.fs_slide'+slideNum);
	
	curSlide.addClass('current-slide');
	nextSlide.addClass('next-slide');

	fs_thumbs.find('.thmb_slide'+slideNum).addClass('current-thmb');
	
	if (prevSlide.find('iframe').size() > 0) {
		prevSlide.find('iframe').remove();
	}
	if (nextSlide.find('iframe').size() > 0) {
		nextSlide.find('iframe').remove();
	}
	if (prevSlide.find('div').size() > 0) {
		prevSlide.find('div').remove();
	}
	if (nextSlide.find('div').size() > 0) {
		nextSlide.find('div').remove();
	}
	fs_descr.fadeOut(500, function () {
		if (!html.hasClass('gallery_started')) html.addClass('gallery_started');
		setTimeout("fs_descr.html(jQuery('.current-slide').attr('data-descr'))",100);
		setTimeout("fs_descr.fadeIn(500)",200);
	});
	fs_title.fadeOut(500, function () {
		setTimeout("fs_title.html(jQuery('.current-slide').attr('data-title'))",100);
		setTimeout("fs_title.fadeIn(500)",200);
	});
	fs_btn_prev.attr('data-count', prevSlide.attr('data-count') + '/' + max_slide);
	fs_btn_next.attr('data-count', nextSlide.attr('data-count') + '/' + max_slide);
	
	if (curSlide.attr('data-type') == 'image' && !curSlide.hasClass('block_loaded'))  {
		curSlide.attr('style', 'background:none');
		slide_not_loaded(curSlide.attr('data-count'));
	} else {
		jQuery('.paused_by_video').removeClass('paused_by_video');	
		if (nextSlide.attr('data-type') == 'image') {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-src') + ') no-repeat;');
		} else if (nextSlide.attr('data-type') == 'youtube') {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-bg') + ') no-repeat;');		
		} else {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-bg') + ') no-repeat;');
		}
	
		if (prevSlide.attr('data-type') == 'image') {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-src') + ') no-repeat;');
		} else if (prevSlide.attr('data-type') == 'youtube') {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-bg') + ') no-repeat;');
		} else {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-bg') + ') no-repeat;');
		}
		
		if (curSlide.attr('data-type') == 'image') {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-src') + ') no-repeat;');		
		} else if (curSlide.attr('data-type') == 'youtube') {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-bg') + ') no-repeat;');
			add_YT_video();
			jQuery('.fs_play_pause').addClass('paused_by_video');
		} else {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-bg') + ') no-repeat;');
			jQuery('.fs_play_pause').addClass('paused_by_video');
			add_vimeo_video();
		}
			
		if (!prevSlide.hasClass('was_showed')) {
			prevSlide.addClass('was_showed');
		}
		if (!curSlide.hasClass('was_showed')) {
			curSlide.addClass('was_showed');
		}
		if (!nextSlide.hasClass('was_showed')) {
			nextSlide.addClass('was_showed');
		}
		
		setVideoFrame();
		if (jQuery('.fs_play_pause').hasClass('fs_state_play') && !jQuery('.fs_play_pause').hasClass('paused_by_video')) {
			fs_interval = setInterval('fs_nextSlide()', fs_slider.attr('data-interval'));
		}		
	}
}
function setGalleryContainer() {	
	if (jQuery('#wpadminbar').size() > 0) {
		setHeight = myWindow.height() - jQuery('#wpadminbar').height();
		fs_slider.height(setHeight).css('top', jQuery('#wpadminbar').height() + 'px');	
	} else {
		setHeight = myWindow.height();
		fs_slider.height(setHeight).css('top', '0px');	
	}
	if (jQuery(window).width() < 760 && jQuery('.fs_gallery_container').length) {
		jQuery('.fs_gallery_container').height(jQuery('.wrapper').height());
	}
	fs_thumbs_setup();
}

function onPlayerReady(event) {
        event.target.playVideo();
      }
function onPlayerStateChange(event) {
	var yt_cut_state = event.data;
	if (yt_cut_state == 0) {
		if (jQuery('.fs_play_pause').hasClass('fs_state_play')) {
			cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
			cur_slide++;
			max_slide = fs_slider.find('.fs_slide').size();
			if (cur_slide > max_slide) cur_slide = 1;
			if (cur_slide < 1) cur_slide = max_slide;
			setSlide(cur_slide);
		}
	}
	if (yt_cut_state == 1) {
		//console.log('Playing Video');
	}
}
function stopVideo() {
	player.stopVideo();
}
function onYouTubeIframeAPIReady() {
	fs_slider.addClass('yt_ready');
}
function add_YT_video() {
	curSlide = jQuery('.fs_slide.current-slide');
	curSlide.append('<div id="player"></div>')
	var player;
	if (fs_slider.hasClass('yt_ready')){
		player = new YT.Player('player', {
			height: '100%',
			width: '100%',
			playerVars: { 'rel': 0, 'disablekb': 1 },
			videoId: curSlide.attr('data-src'),
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		setVideoFrame();
	} else {
		console.log('Waiting for YT');
		setTimeout("add_YT_video()",500);
	}	
}
function add_vimeo_video() {
	curSlide = jQuery('.fs_slide.current-slide');
	curSlide.append('<div id="vimeo_player"></div>')
    var options = {
        id: curSlide.attr('data-src'),
        width: '100%',
        loop: false,
		autoplay: true
    };
	var v_player = new Vimeo.Player('vimeo_player', options);
	setVideoFrame();
	v_player.on('play', function() {
        //console.log('played the video!');
    });
	v_player.on('ended', function() {
		if (jQuery('.fs_play_pause').hasClass('fs_state_play')) {
			cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
			cur_slide++;
			max_slide = fs_slider.find('.fs_slide').size();
			if (cur_slide > max_slide) cur_slide = 1;
			if (cur_slide < 1) cur_slide = max_slide;
			setSlide(cur_slide);		
		}
    });
	v_player.on('loaded', function() {
        setVideoFrame();
    });
}

function setVideoFrame() {
	if (!fs_slider.hasClass('video_fit')) {
		if (myWindow.width() > 1024) {
			if (jQuery('iframe').size() > 0) {
				if (((fs_slider.height() + 150) / 9) * 16 > fs_slider.width()) {
					jQuery('iframe').height(fs_slider.height() + 150).width(((fs_slider.height() + 150) / 9) * 16);
					jQuery('iframe').css({
						'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
						'top': "-75px",
						'margin-top': '0px'
					});
				} else {
					jQuery('iframe').width(fs_slider.width()).height(((fs_slider.width()) / 16) * 9);
					jQuery('iframe').css({
						'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
						'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
						'top': '50%'
					});
				}
			}
		} else {
			jQuery('iframe').height(myWindow.height()).width(myWindow.width()).css({
				'top': '0px',
				'margin-left' : '0px',
				'left' : '0px',
				'margin-top': '0px'
			});			
		}
	}
}

function run_fs_slider() {
	fs_slider.addClass('started');
	if (fs_slider.hasClass('autoplay')) {
		jQuery('.fs_play_pause').addClass('fs_state_play');
		clearInterval(fs_interval);
		fs_interval = setInterval('fs_nextSlide()', fs_slider.attr('data-interval'));
	}
	fs_thumbs_setup();
	setSlide(1);
}

function slide_not_loaded(slide_num) {
	slide_num = parseInt(slide_num);
	var curSlide = jQuery('.fs_slide'+slide_num);
	if (curSlide.attr('data-type') == 'image' && !curSlide.hasClass('block_loaded'))  {
		curSlide.attr('style', 'background:none');
		setTimeout("slide_not_loaded(jQuery('.current-slide').attr('data-count'))",500);	
	} else {
		setSlide(slide_num);
	}
}

function fs_thumbs_setup() {
	fs_thumbs.width(fs_thumbs.find('li').width()*fs_thumbs.find('li').size());
}
