/* Shift Slider 1.6.10.04 */
var	html = jQuery('html'),
	shift_gallery_wrapper = jQuery('.shift_gallery_wrapper'),
	shift_gallery = jQuery('.shift_gallery'),
	shift_slide = jQuery('.shift_slide'),
	even_max_slide = jQuery('.even_slide').size(),
	odd_max_slide = jQuery('.odd_slide').size();

var lastChange = +new Date();
	
if (jQuery('.shift_gallery_wrapper').size() > 0) {
	jQuery(document.documentElement).keyup(function (event) {
		if ((event.keyCode == 40)) {
			shift_prevSlide();				
		}
		if ((event.keyCode == 38)) {
			shift_nextSlide();
		}
		if ((event.keyCode == 37)) {
			if (!shift_gallery_wrapper.hasClass('fullview')) {
				jQuery('.shift_odd_current').addClass('slide_fullview');
				shift_gallery_wrapper.addClass('fullview');
			} else {
				jQuery('.shift_even_current').removeClass('slide_fullview');
				jQuery('.shift_odd_current').removeClass('slide_fullview');
				shift_gallery_wrapper.removeClass('fullview');
			}
		}
		if ((event.keyCode == 39)) {
			if (!shift_gallery_wrapper.hasClass('fullview')) {
				jQuery('.shift_even_current').addClass('slide_fullview');
				shift_gallery_wrapper.addClass('fullview');
			} else {
				jQuery('.shift_even_current').removeClass('slide_fullview');
				jQuery('.shift_odd_current').removeClass('slide_fullview');
				shift_gallery_wrapper.removeClass('fullview');
			}
		}
	});
}
	
jQuery(document).ready(function ($) {
	jQuery('.main_wrapper').addClass('like_fullscreen_type');
	html.addClass('shift_gallery_page');
	setup_shift_gallery();
	
	jQuery('.shift_btn_prev').on('click', function () {
		shift_prevSlide();		
	});
	jQuery('.shift_btn_next').on('click', function () {
		shift_nextSlide();
	});

	//Touch Events
	shift_gallery.on("swipeleft", function () {
		if (!shift_gallery_wrapper.hasClass('fullview')) {
			jQuery('.shift_even_current').addClass('slide_fullview');
			shift_gallery_wrapper.addClass('fullview');
		} else {
			jQuery('.shift_even_current').removeClass('slide_fullview');
			jQuery('.shift_odd_current').removeClass('slide_fullview');
			shift_gallery_wrapper.removeClass('fullview');
		}
	});
	shift_gallery.on("swiperight", function () {
		if (!shift_gallery_wrapper.hasClass('fullview')) {
			jQuery('.shift_odd_current').addClass('slide_fullview');
			shift_gallery_wrapper.addClass('fullview');
		} else {
			jQuery('.shift_even_current').removeClass('slide_fullview');
			jQuery('.shift_odd_current').removeClass('slide_fullview');
			shift_gallery_wrapper.removeClass('fullview');
		}
	});
	shift_gallery.on("swipeup", function () {
		shift_nextSlide();
	});
	shift_gallery.on("swipedown", function () {
		shift_prevSlide();
	});

	shift_gallery.on('mousewheel', function(event) {
	    if(+new Date() - lastChange > 100){
			console.log(event.deltaY);
			var half_screen = jQuery(window).width()/2;
			if (event.deltaY < 0) {
				if (event.pageX <= half_screen) {
					shift_nextSlide();
				} else {
					shift_prevSlide();
				}
			}
			if (event.deltaY > 0) {
				if (event.pageX <= half_screen) {
					shift_prevSlide();
				} else {
					shift_nextSlide();
				}
			}
			lastChange = +new Date();
		} else {
			lastChange = +new Date();
		}
	});	
});

jQuery(window).resize(function () {
	setup_shift_gallery();
});

jQuery(document).on("click", ".shift_slide", function() {
	jQuery(this).toggleClass('slide_fullview');
	shift_gallery_wrapper.toggleClass('fullview');
});

function shift_prevSlide() {
	if (!shift_gallery_wrapper.hasClass('fullview') && !shift_gallery.hasClass('now_animate')) {
		if (even_max_slide < 5 && odd_max_slide < 5) {
			shift_gallery.addClass('prev_power');
		}
		cur_slide_even = parseInt(jQuery('.shift_even_current').attr('data-count'));
		cur_slide_odd = parseInt(jQuery('.shift_odd_current').attr('data-count'));
	
		cur_slide_even--;
		cur_slide_odd--;
		
		even_max_slide = jQuery('.even_slide').size(),
		odd_max_slide = jQuery('.odd_slide').size();
	
		if (cur_slide_even > even_max_slide) cur_slide_even = 1;
		if (cur_slide_even < 1) cur_slide_even = even_max_slide;
	
		if (cur_slide_odd > odd_max_slide) cur_slide_odd = 1;
		if (cur_slide_odd < 1) cur_slide_odd = odd_max_slide;
	
		set_shift_Slide(cur_slide_even,cur_slide_odd);
	}
}

function shift_nextSlide() {	
	if (!shift_gallery_wrapper.hasClass('fullview') && !shift_gallery.hasClass('now_animate')) {
		if (even_max_slide < 5 && odd_max_slide < 5) {
			shift_gallery.addClass('next_power');
		}
		cur_slide_even = parseInt(jQuery('.shift_even_current').attr('data-count'));
		cur_slide_odd = parseInt(jQuery('.shift_odd_current').attr('data-count'));
	
		cur_slide_even++;
		cur_slide_odd++;
		
		even_max_slide = jQuery('.even_slide').size(),
		odd_max_slide = jQuery('.odd_slide').size();
	
		if (cur_slide_even > even_max_slide) cur_slide_even = 1;
		if (cur_slide_even < 1) cur_slide_even = even_max_slide;
	
		if (cur_slide_odd > odd_max_slide) cur_slide_odd = 1;
		if (cur_slide_odd < 1) cur_slide_odd = odd_max_slide;
	
		set_shift_Slide(cur_slide_even,cur_slide_odd);
	}
}

function set_shift_Slide(slideNumEven,slideNumOdd) {
	shift_gallery.addClass('now_animate');
	slideNumEven = parseInt(slideNumEven);
	slideNumOdd = parseInt(slideNumOdd);
	if (even_max_slide < 5 && odd_max_slide < 5) {
		jQuery('.shift_even_prev').removeClass('shift_even_prev');
		jQuery('.shift_even_current').removeClass('shift_even_current');
		jQuery('.shift_even_next').removeClass('shift_even_next');

		jQuery('.shift_odd_prev').removeClass('shift_odd_prev');
		jQuery('.shift_odd_current').removeClass('shift_odd_current');
		jQuery('.shift_odd_next').removeClass('shift_odd_next');
		
		var curSlideEven = jQuery('.even_slide'+slideNumEven);
		var curSlideOdd = jQuery('.odd_slide'+slideNumOdd);
		curSlideEven.addClass('shift_even_current');
		curSlideOdd.addClass('shift_odd_current');

		//EVEN
		if((parseInt(slideNumEven)+1) > even_max_slide) {
			var nextSlideEven = jQuery('.even_slide1');
		} else if ((parseInt(slideNumEven)+1) == even_max_slide){
			var nextSlideEven = jQuery('.even_slide'+even_max_slide);
		} else {
			var nextSlideEven = jQuery('.even_slide'+(parseInt(slideNumEven)+1));
		}
		
		if((parseInt(slideNumEven)-1) < 1) {
			var prevSlideEven = jQuery('.even_slide'+even_max_slide);
		} else if ((slideNumEven-1) == 1){
			var prevSlideEven = jQuery('.even_slide1');
		} else {
			var prevSlideEven = jQuery('.even_slide'+(parseInt(slideNumEven)-1));
		}

		prevSlideEven.addClass('shift_even_prev');
		nextSlideEven.addClass('shift_even_next');
		
		//ODD
		if((parseInt(slideNumOdd)+1) > odd_max_slide) {
			var nextSlideOdd = jQuery('.odd_slide1');
		} else if ((parseInt(slideNumOdd)+1) == odd_max_slide){
			var nextSlideOdd = jQuery('.odd_slide'+odd_max_slide);
		} else {
			var nextSlideOdd = jQuery('.odd_slide'+(parseInt(slideNumOdd)+1));
		}
		
		if((parseInt(slideNumOdd)-1) < 1) {
			var prevSlideOdd = jQuery('.odd_slide'+odd_max_slide);
		} else if ((slideNumOdd-1) == 1){
			var prevSlideOdd = jQuery('.odd_slide1');
		} else {
			var prevSlideOdd = jQuery('.odd_slide'+(parseInt(slideNumOdd)-1));
		}

		prevSlideOdd.addClass('shift_odd_prev');
		nextSlideOdd.addClass('shift_odd_next');
		
		setTimeout("shift_gallery.removeClass('prev_power')",500);
		setTimeout("shift_gallery.removeClass('next_power')",500);
		
	} else {
		jQuery('.shift_even_prev2').removeClass('shift_even_prev2');
		jQuery('.shift_even_prev').removeClass('shift_even_prev');
		jQuery('.shift_even_current').removeClass('shift_even_current');
		jQuery('.shift_even_next').removeClass('shift_even_next');
		jQuery('.shift_even_next2').removeClass('shift_even_next2');

		jQuery('.shift_odd_prev2').removeClass('shift_odd_prev2');
		jQuery('.shift_odd_prev').removeClass('shift_odd_prev');
		jQuery('.shift_odd_current').removeClass('shift_odd_current');
		jQuery('.shift_odd_next').removeClass('shift_odd_next');
		jQuery('.shift_odd_next2').removeClass('shift_odd_next2');
		
		var curSlideEven = jQuery('.even_slide'+slideNumEven);
		var curSlideOdd = jQuery('.odd_slide'+slideNumOdd);
		curSlideEven.addClass('shift_even_current');
		curSlideOdd.addClass('shift_odd_current');

		//EVEN
		if((parseInt(slideNumEven)+1) > even_max_slide) {
			var nextSlideEven = jQuery('.even_slide1');
			var nextSlideEven2 = jQuery('.even_slide2');
		} else if ((parseInt(slideNumEven)+1) == even_max_slide){
			var nextSlideEven = jQuery('.even_slide'+even_max_slide);
			var nextSlideEven2 = jQuery('.even_slide1');
		} else {
			var nextSlideEven = jQuery('.even_slide'+(parseInt(slideNumEven)+1));
			var nextSlideEven2 = jQuery('.even_slide'+(parseInt(slideNumEven)+2));
		}
		
		if((parseInt(slideNumEven)-1) < 1) {
			var prevSlideEven = jQuery('.even_slide'+even_max_slide);
			var prevSlideEven2 = jQuery('.even_slide'+(even_max_slide-1));
		} else if ((slideNumEven-1) == 1){
			var prevSlideEven = jQuery('.even_slide1');
			var prevSlideEven2 = jQuery('.even_slide'+even_max_slide);
		} else {
			var prevSlideEven = jQuery('.even_slide'+(parseInt(slideNumEven)-1));
			var prevSlideEven2 = jQuery('.even_slide'+(parseInt(slideNumEven)-2));
		}

		prevSlideEven2.addClass('shift_even_prev2');
		prevSlideEven.addClass('shift_even_prev');
		nextSlideEven.addClass('shift_even_next');
		nextSlideEven2.addClass('shift_even_next2');
		
		//ODD
		if((parseInt(slideNumOdd)+1) > odd_max_slide) {
			var nextSlideOdd = jQuery('.odd_slide1');
			var nextSlideOdd2 = jQuery('.odd_slide2');
		} else if ((parseInt(slideNumOdd)+1) == odd_max_slide){
			var nextSlideOdd = jQuery('.odd_slide'+odd_max_slide);
			var nextSlideOdd2 = jQuery('.odd_slide1');
		} else {
			var nextSlideOdd = jQuery('.odd_slide'+(parseInt(slideNumOdd)+1));
			var nextSlideOdd2 = jQuery('.odd_slide'+(parseInt(slideNumOdd)+2));
		}
		
		if((parseInt(slideNumOdd)-1) < 1) {
			var prevSlideOdd = jQuery('.odd_slide'+odd_max_slide);
			var prevSlideOdd2 = jQuery('.odd_slide'+(odd_max_slide-1));
		} else if ((slideNumOdd-1) == 1){
			var prevSlideOdd = jQuery('.odd_slide1');
			var prevSlideOdd2 = jQuery('.odd_slide'+odd_max_slide);
		} else {
			var prevSlideOdd = jQuery('.odd_slide'+(parseInt(slideNumOdd)-1));
			var prevSlideOdd2 = jQuery('.odd_slide'+(parseInt(slideNumOdd)-2));
		}

		prevSlideOdd2.addClass('shift_odd_prev2');
		prevSlideOdd.addClass('shift_odd_prev');
		nextSlideOdd.addClass('shift_odd_next');
		nextSlideOdd2.addClass('shift_odd_next2');		
	}
	setTimeout("shift_gallery.removeClass('now_animate')",300);
}
function setup_shift_gallery() {
	if (jQuery('.even_slide').size() == 1) {
		shift_gallery_wrapper.addClass('even_alone');
	}	 
	if (jQuery('.odd_slide').size() == 1) {
		shift_gallery_wrapper.addClass('odd_alone');
	}	 
	if (jQuery('#wpadminbar').size() > 0) {
		var set_height = myWindow.height() - jQuery('#wpadminbar').height() - jQuery('.footer').height(),
			set_top = jQuery('#wpadminbar').height();
	} else {
		var set_height = myWindow.height() - jQuery('.footer').height(),
			set_top = 0;
	}	
	shift_slide.each(function(){
		jQuery(this).attr('style', 'background:url(' + jQuery(this).attr('data-bg') + ') no-repeat center;');
	});
	shift_gallery_wrapper.css('top', set_top+'px').height(set_height);
	shift_gallery.height(set_height).css('top', set_top+'px');	
	shift_slide.height(set_height);
	set_shift_Slide(1,1);
	if (jQuery('.shift_even_current').size() > 0 && jQuery('.shift_odd_current').size() > 0) {
		cur_slide_even = parseInt(jQuery('.shift_even_current').attr('data-count'));
		cur_slide_odd = parseInt(jQuery('.shift_odd_current').attr('data-count'));
		set_shift_Slide(cur_slide_even,cur_slide_odd);
	} else {
		set_shift_Slide(1,1);		
	}
}