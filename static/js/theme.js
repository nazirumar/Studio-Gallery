var header = jQuery('.main_header'),
	header_h = header.height(),
	footer = jQuery('.main_footer'),
	main_wrapper = jQuery('.main_wrapper'),
	site_wrapper = jQuery('.site_wrapper'),
	nav = jQuery('nav.main_nav'),
	menu = nav.find('ul.menu'),
	html = jQuery('html'),
	body = jQuery('body'),
	myWindow = jQuery(window),
	is_masonry = jQuery('.is_masonry'),
	fl_container = jQuery('.fl-container'),
	socials_wrapper = jQuery('.socials_wrapper'),
	window_h = jQuery(window).height(),
	window_w = jQuery(window).width(),
	gt3_imgs2preload = [];

jQuery(document).ready(function($) {
	
	if (jQuery('.pp_block').size() > 0) {
		html.addClass('pp_page');
	}
	
	// Header
	var main_logo_tag = jQuery('.main_header .logo_sect');
	main_logo_tag.css({'height': main_logo_tag.attr('data-height') + 'px'});
	var logo_h = jQuery('.logo_sect').height();
	var header_holder = jQuery('.header_holder');
	var lang_selector = jQuery('.lang_selector');

	if (jQuery('.logo_sect span').length) {
		jQuery('.logo_sect').find('span').css({'height': logo_h + 'px'});
	}

	// Fullscreen Slider
	var rs_slider_html = jQuery('.first-module .rev_slider');
	if (rs_slider_html.hasClass("fullscreenbanner") || rs_slider_html.hasClass("fullwidthabanner")) {
		jQuery('body').addClass('has_fw_slider menu_on_slider');
	}

	header_holder.height(jQuery('.main_header').height());

	// Fixed & Transparent
	var body = jQuery('body');
	if (jQuery('.sticky_menu_enabled').size() > 0 && jQuery(window).width() > 900) {

		if (rs_slider_html.hasClass("fullscreenbanner") || rs_slider_html.hasClass("fullwidthabanner")) {
			var scrollset = jQuery('.first-module').height() + jQuery('.main_header').height();
		} else {
			var scrollset = 0;
			body.addClass('fixed_show');
		}

		header_holder.show();

		jQuery(window).on('scroll', function () {
			if (rs_slider_html.hasClass("fullscreenbanner") || rs_slider_html.hasClass("fullwidthabanner")) {
				if (jQuery(window).scrollTop() > jQuery('.main_header').height()) {
					jQuery('.header_parent_wrap').css({'opacity': 0});
					body.addClass('sticky_after_slider');
				} else {
					jQuery('.header_parent_wrap').css({'opacity': 1});
					body.removeClass('sticky_after_slider');
				}
			}
			if (jQuery(window).scrollTop() > scrollset) {
				if (rs_slider_html.hasClass("fullscreenbanner") || rs_slider_html.hasClass("fullwidthabanner")) {
					jQuery('.header_parent_wrap').css({'opacity': 1});
					body.addClass('fixed_show small_sticky');
					body.removeClass('menu_on_slider');
				} else {
					body.addClass('small_sticky');
				}
			} else {
				if (rs_slider_html.hasClass("fullscreenbanner") || rs_slider_html.hasClass("fullwidthabanner")) {
					body.removeClass('fixed_show small_sticky');
					body.addClass('menu_on_slider');
				} else {
					body.removeClass('small_sticky');
				}
			}
		});
	}

	// Video-image Background
	if (jQuery('.image_video_bg_block').size() > 0) {
		gt3_image_video_bg();
	}

	// Mobile Menu
	jQuery('.header_parent_wrap').append('<div class="mobile-navigation-toggle"><div class="toggle-box"><div class="toggle-inner"></div></div></div>');
	jQuery('.mobile_menu_wrapper').html(jQuery('.main_header nav').html());
	jQuery('.mobile-navigation-toggle').on("click", function() {
		jQuery('.mobile_menu_wrapper').slideToggle(300);
		jQuery(this).toggleClass("is-active");
	});
	jQuery('.mobile_menu_wrapper li').find('a').on("click", function() {
		jQuery(this).parent().toggleClass("showsub").children('.sub-nav').slideToggle();
	});

	// Top Search focus
	var top_search = jQuery('.top_search');
	if (top_search.size() > 0) {
		top_search.each(function () {
			var $ctsearch = jQuery(this),
				$ctsearchinput = $ctsearch.find('input.ct-search-input'),
				$menu_nav = jQuery(this).parents('header').find('nav'),
				$lang_selector_btn = jQuery(this).parents('header').find('.lang_selector'),
				$body = jQuery('html, body'),
				openSearch = function () {
					$ctsearch.data('open', true).addClass('ct-search-open');
					$menu_nav.hide();
					$lang_selector_btn.hide();
					$ctsearchinput.focus();
					return false;
				},
				closeSearch = function () {
					$ctsearch.data('open', false).removeClass('ct-search-open');
					$menu_nav.fadeIn();
					$lang_selector_btn.fadeIn();
				};
			$ctsearchinput.on('click', function (e) {
				e.stopPropagation();
				$ctsearch.data('open', true);
			});
			$ctsearch.on('click', function (e) {
				e.stopPropagation();
				if (!$ctsearch.data('open')) {
					openSearch();
					$body.on('click', function (e) {
						closeSearch();
					});
				}
				else {
					if ($ctsearchinput.val() === '') {
						closeSearch();
						return false;
					}
				}
			});
		});
		top_search.find('.s_submit').mouseenter(function(){
			top_search.addClass('ct-search-hover');
		}).mouseleave(function(){
			top_search.removeClass('ct-search-hover');
		});
	}

	// Language Selector
	jQuery('.lang_btn').on('click', function() {
		lang_selector.toggleClass('open');
		jQuery('.main_header header nav').toggleClass('hide_nav');
	});
	jQuery('.language_list li').on('click', function() {
		lang_selector.removeClass('open');
		jQuery('.main_header header nav').removeClass('hide_nav');
		jQuery('.current_language').text(jQuery(this).text());
	});
	jQuery("html, body").on('click', function(e) {
		if (jQuery(e.target).hasClass('lang_btn') || jQuery(e.target).hasClass('current_language') || jQuery(e.target).hasClass('language_list')) {
			return false;
		}
		lang_selector.removeClass("open");
		jQuery('.main_header header nav').removeClass('hide_nav');
	});
	
	gt3_content_update();
	
	//Flickr Widget
	if (jQuery('.flickr_widget_wrapper').size() > 0) {
		jQuery('.flickr_badge_image a').each(function() {
			jQuery(this).append('<div class="flickr_fadder"></div>');
		});
	}
	
	// Height 100 percent
	if (jQuery('.height_100percent').size() > 0) {
		gt3_height100_perc();
	}
	
	jQuery('.fw_block').not(".wall_wrap").wrapInner('<div class="fw_wrapinner"></div>');
	
	gt3_fw_block();

	//Grid Gallery
	var gallery_grid_module_tag = jQuery('.gallery_grid_module');
	if (gallery_grid_module_tag.size() >0) {
		var gt3_setPad = gallery_grid_module_tag.attr('data-setpad');
		gallery_grid_module_tag.css({'padding-top' : gt3_setPad, 'margin-left' : gt3_setPad});
		
		jQuery('.gallery_grid_content').each(function(){
			var gt3_setPad = jQuery(this).attr('data-setpad');
			jQuery(this).css({'padding-right' : gt3_setPad, 'margin-bottom' : gt3_setPad});
		});
		
		jQuery('.gallery_grid_item').each(function(){
			jQuery(this).css('width', jQuery(this).attr('data-item-width')+'%');
		});
	}

	//Pages BG
	var fw_image_bg_tag = jQuery('.fw_background.bg_image');
	if (fw_image_bg_tag.size() > 0) {
		fw_image_bg_tag.css('background-image', 'url('+ fw_image_bg_tag.attr('data-bg')+')');
	}
	var fw_color_bg_tag = jQuery('.fw_background.bg_color');
	if (fw_color_bg_tag.size() > 0) {
		fw_color_bg_tag.css('background-color', '#'+fw_color_bg_tag.attr('data-bgcolor'));
	}

	// Swipebox Popup
	var swipebox_class = jQuery('.swipebox');
	if(swipebox_class.size() > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		swipebox_class.swipebox();
	}

	var portfolio_block_tag = jQuery('.portfolio_block');
	if (portfolio_block_tag.hasClass("column1")) {
		portfolio_block_tag.removeClass('with_title_block');
	}

	// Item with Title Block Hover
	if (jQuery('.with_title_block').size() > 0 || jQuery('.blog_post_preview').size() > 0) {
		jQuery('.load_more_works').css({'margin-top': 54 + 'px', 'margin-bottom': 5 + 'px'});
	}

	// Video background
	var video_bg_tag = jQuery('.video_bg');
	if (video_bg_tag.size() > 0) {
		video_bg_tag.each(function () {
			if (jQuery(this).children().length == 0) {
				jQuery(this).parent().hide();
			}
		});
		jQuery('.play-video').on('click', function(ev) {

			video_bg_tag.each(function() {
				jQuery(this).find('.video_frame').attr('src', jQuery(this).find('.play-video').attr('data-video-url'));
			});
			video_bg_tag.removeClass('show_video_now');
			jQuery(this).parent().find(".video_frame")[0].src += "&autoplay=1";
			ev.preventDefault();
			gt3_video_background();
			jQuery(this).parent('.video_bg').addClass('show_video_now');

		});
	}

	// Grid Icon Boxes
	if (jQuery('.module_iconboxes').size() > 0) {
		gt3_grid_iconboxes();
	}

	//	Video iframe height
	gt3_video_size();

	// Testimonials
	if (jQuery('.testimonial_wrapper').size() > 0) {
		jQuery('.testimonials-info').slick({
			slidesToShow: 1,
			fade: true,
			arrows: true,
			dots: false,
			centerMode: true,
			centerPadding: 0,
			focusOnSelect: true,
			autoplay: true,
			autoplaySpeed: 4000,
			speed: 600,
			infinite: true,
			adaptiveHeight: true
		});
	}

	jQuery('a[href="#"]').on('click', function(e) {
		e.preventDefault();
	});

	// empty comments
	var comments_tag = jQuery('#comments');
	if (comments_tag.text() == '') {
		comments_tag.parent().hide();
	}

	var pp_wrapper_tag = jQuery('.pp_wrapper');
	var post_password_form_tag = jQuery('.post-password-form');
	if (pp_wrapper_tag.size() > 0 && post_password_form_tag.size() > 0) {
		post_password_form_tag.find('label').find('input').attr('placeholder', pp_wrapper_tag.attr('data-placeholder'));
	}

	jQuery('.blog_post_title').each(function() {
		var link_text = jQuery(this).find('h2').text();
		if (link_text == '') {
			jQuery(this).hide();
			jQuery(this).find('.blog_post_format_label').hide();
		}
	});

	// Sidebar hover
	var sidepanel_tag = jQuery('.sidepanel');
	if (sidepanel_tag.size() > 0) {
		sidepanel_tag.each(function () {
			jQuery(this).find('li > a').mouseenter(function(){
				jQuery(this).parent().addClass('active_list_item');
			}).mouseleave(function(){
				jQuery(this).parent().removeClass('active_list_item');
			});
		});
	}

	var portf_grid = jQuery('.portfolio_grid');
	var html_grid = jQuery('html');
	var portfolio_grid_wrapper_grid = jQuery('.portfolio_grid_wrapper');
	if (portf_grid.size() > 0) {
		html_grid.addClass('portfolio_grid_template');
		if (portfolio_grid_wrapper_grid.hasClass('fullscreen_style')) {
			html_grid.addClass('port_grid_fs');
			if (jQuery('.albums_grid_wrapper').size() < 1) {
				if (portfolio_grid_wrapper_grid.height() < jQuery('.wrapper').height()) {
					setTimeout("get_fs_port_works()",300);
				}
				jQuery(document).endlessScroll({
					bottomPixels: 500,
					fireDelay: 10,
					callback: function() {
						get_fs_port_works();
					}
				});
			}
		}
		if (!portfolio_grid_wrapper_grid.hasClass('one_col')) {
			var set_pad = portf_grid.attr('data-pad');
			portf_grid.css({
				'padding-left' : portf_grid.attr('data-pad'),
				'margin-top' : '-'+set_pad
			});
			if (jQuery('.pagerblock').size() < 1) {
				portf_grid.css('padding-bottom', set_pad);
			}
			portf_grid.find('.portfolio_grid_item').css({
				'padding-right' : set_pad,
				'padding-top' : set_pad			
			});
			if (jQuery('.albums_load_more').size() > 0 && set_pad == '0px') {
				jQuery('.albums_load_more').css('margin-top', '30px');
			}
		}
	}

	var image_post_format_tag = jQuery('.image-post-format');
	if (image_post_format_tag.size() > 0) {
		image_post_format_tag.each(function(){
			if (jQuery(this).find('.nivoSlider img').length <= 2) {
				jQuery(this).addClass('one-image-format');
			}
		});
	}

	if (jQuery('#sb_instagram').size() > 0) {
		sidepanel_tag.each(function(){
			if (jQuery(this).find('#sb_instagram').length) {
				jQuery(this).addClass('without_line');
			}
		});
	}

	if (jQuery('.strip-menu').size() > 0) {
		html_grid.addClass('strip-page');
		jQuery('.strip-item').each(function(){
			jQuery(this).css('background-image', 'url('+ jQuery(this).attr('data-src')+')');
		});
	}

	// Standard post with img
	jQuery('.standard-post-format').each(function(){
		if (jQuery(this).find('img.featured_image_standalone').size() > 0) {
			jQuery(this).addClass('standard-post-format_with-img');
		}
	});

	var portfolio_onecol_tag = jQuery('.portfolio_grid_wrapper.one_col');
	if (portfolio_onecol_tag.size() > 0 && jQuery('.pagerblock').length) {
		portfolio_onecol_tag.addClass('without_pager');
	}

	var page_title_tag = jQuery('.page_title');
	if (jQuery('.fullscreen_style').length && page_title_tag.length) {
		page_title_tag.hide();
	}
	if (jQuery('.gt3_preloader').size() > 0) {
		if (jQuery('.personal_preloader').size() > 0) {
			jQuery('.gt3_preloader').remove();
			personal_preloader_init();
		} else {
			if (jQuery('.bg_preloader').size() > 0) {
				setTimeout("gt3_preImg(gt3_bgs2preload)",500);
			} else {
				jQuery('img').each(function () {
					var this_src = jQuery(this).attr('src');
					if (this_src !== '' && ((this_src.indexOf('jpg') + 1) || (this_src.indexOf('png') + 1) || (this_src.indexOf('gif') + 1))) {
						if (this_src.substr(0,4) == "http") {
							gt3_imgs2preload.push(this_src);
						}
					}
				});
				setTimeout("gt3_preImg(gt3_imgs2preload)",500);
			}
		}		
	} else {
		if (jQuery('.personal_preloader').size() > 0) {
			personal_preloader_init();
		}
	}
	
	if (jQuery('.nivoSlider').size() > 0) {
		jQuery('.nivoSlider').each(function() {

			var obg_this = jQuery(this);
			function gt3_nivo_update(obg_this) {
				var nivo_slider_counts = obg_this.parent().find('.nivo-control').length;

				var nivo_current_slide_prev = obg_this.parent().find('.nivo-control.active').index();
				var nivo_current_slide_next = obg_this.parent().find('.nivo-control.active').index() + 2;

				if (nivo_current_slide_prev == '0') {
					nivo_current_slide_prev = nivo_slider_counts;
				}

				if (nivo_current_slide_next > nivo_slider_counts) {
					nivo_current_slide_next = '1';
				}

				obg_this.parent().find('.nivo-prevNav').attr('data-count', nivo_current_slide_prev+'/'+nivo_slider_counts);
				obg_this.parent().find('.nivo-nextNav').attr('data-count', nivo_current_slide_next+'/'+nivo_slider_counts);

				if (nivo_slider_counts == '1') {
					jQuery('.nivo-prevNav, .nivo-nextNav').hide();
				}

				if (nivo_slider_counts == '2') {
					jQuery('.nivo-prevNav, .nivo-nextNav').addClass('hide_text');
				}
			}

			jQuery(this).nivoSlider({
				directionNav: true,
				controlNav: true,
				effect:'fade',
				pauseTime:4000,
				slices: 1,
				beforeChange: function(){
					setTimeout(function () {gt3_nivo_update(obg_this);}, 250);
				},
				afterLoad: function(){
					gt3_nivo_update(obg_this);
				}
			});
		});
	}
	
	/* RS arrows text */
	if (jQuery('.rev_slider').size() > 0) {
		jQuery('.rev_slider').each(function() {
			var id = jQuery(this).attr('id'),
			api = eval('revapi' + id.split('rev_slider_')[1].split('_')[0]);

			api.bind("revolution.slide.onchange",function (e,data) {
				var slider_counts = jQuery(this).find('.tp-revslider-slidesli').length;
				var current_slide_prev = data.slideLIIndex;
				var current_slide_next = data.slideLIIndex + 2;

				if (current_slide_prev == '0') {
					current_slide_prev = slider_counts;
				}

				if (current_slide_next > slider_counts) {
					current_slide_next = '1';
				}

				jQuery(this).find('.tp-leftarrow.custom').attr('data-count', current_slide_prev+'/'+slider_counts);
				jQuery(this).find('.tp-rightarrow.custom').attr('data-count', current_slide_next+'/'+slider_counts);

				if (slider_counts == '1') {
					jQuery(this).find('.tp-leftarrow.custom').hide();
					jQuery(this).find('.tp-rightarrow.custom').hide();
				}

				if (slider_counts == '2') {
					jQuery(this).find('.tp-leftarrow.custom').addClass('hide_text');
					jQuery(this).find('.tp-rightarrow.custom').addClass('hide_text');
				}
			});

		});
	}
	/* RS arrows text */

	// Back to Top
	jQuery(window).on('scroll', function () {
		if (jQuery(window).scrollTop() > 0) {
			jQuery('.back2top').fadeIn();
		} else {
			jQuery('.back2top').fadeOut();
		}
		var bottom_pad = parseInt(jQuery('.footer_wrapper').height())+parseInt(jQuery('.footer_wrapper').attr('data-pad-top'))+parseInt(jQuery('.footer_wrapper').attr('data-pad-bottom')) + 30;
		if (jQuery(window).scrollTop() > jQuery(document).height() - jQuery(window).height() - bottom_pad) {
			jQuery('.back2top').css({'bottom': bottom_pad+'px'});
		} else {
			jQuery('.back2top').css({'bottom': '30px'});
		}
	});
	jQuery('.back2top').on("click", function () {
		jQuery('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
	
	gt3_content_mobile_update();
	
	gt3_packery_update();
	
	// Countdown
	if (jQuery('#countdown').size() > 0) {
		jQuery(function() {
			var austDay = new Date();
			austDay = new Date(2017, 08 - 1, 30);
			jQuery('#countdown').countdown({
					until: austDay,
					padZeroes: true,
					labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
					labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second']
			});
		});
	}
	
	// Accordion & Toggle
	if (jQuery('.module_accordion').size() > 0 || jQuery('.module_toggle').size() > 0) {
		jQuery('.shortcode_accordion_item_title').on('click', function() {
			if (!jQuery(this).hasClass('state-active')) {
				jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp(300);
				jQuery(this).next().slideToggle(300);
				jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
				jQuery(this).addClass('state-active');
			}
		});
		jQuery('.shortcode_toggles_item_title').on('click', function() {
			jQuery(this).next().slideToggle(300);
			jQuery(this).toggleClass('state-active');
		});

		jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function(index) {
			jQuery(this).next().slideDown(300);
			jQuery(this).addClass('state-active');
		});
	}
	
	// Counter
	var counter_module = jQuery('.shortcode_counter');
	if (counter_module.size() > 0) {
			if (jQuery(window).width() > 760) {
					counter_module.each(function() {
							if (jQuery(this).offset().top < jQuery(window).height()) {
									if (!jQuery(this).hasClass('done')) {
											var set_count = jQuery(this).find('.stat_count').attr('data-count');
											jQuery(this).find('.stat_temp').stop().animate({
													width: set_count
											}, {
													duration: 3000,
													step: function(now) {
															var data = Math.floor(now);
															jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
													}
											});
											jQuery(this).addClass('done');
											jQuery(this).find('.stat_count');
									}
							} else {
									jQuery(this).waypoint(function() {
											if (!jQuery(this).hasClass('done')) {
													var set_count = jQuery(this).find('.stat_count').attr('data-count');
													jQuery(this).find('.stat_temp').stop().animate({
															width: set_count
													}, {
															duration: 3000,
															step: function(now) {
																	var data = Math.floor(now);
																	jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
															}
													});
													jQuery(this).addClass('done');
													jQuery(this).find('.stat_count');
											}
									}, {
											offset: 'bottom-in-view'
									});
							}
					});
			} else {
					counter_module.each(function() {
							var set_count = jQuery(this).find('.stat_count').attr('data-count');
							jQuery(this).find('.stat_temp').animate({
									width: set_count
							}, {
									duration: 3000,
									step: function(now) {
											var data = Math.floor(now);
											jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
									}
							});
							jQuery(this).find('.stat_count');
					}, {
							offset: 'bottom-in-view'
					});
			}

			jQuery('.module_counter').each(function() {
					var counter_icon_color = jQuery(this).find('.counter_content').attr('data-icon-color');
					if (counter_icon_color !== '' && counter_icon_color !== undefined) {
							jQuery(this).find('.counter_ico span').css({
									'color': counter_icon_color
							});
					}
			});

		}
	
	// Iconboxes_container
	jQuery('.iconboxes_container').each(function() {
		var divider_color = jQuery(this).attr('data-dividercolor');
		var heading_color = jQuery(this).attr('data-headingcolor');
		var description_color = jQuery(this).attr('data-descriptioncolor');
		var icon_color = jQuery(this).attr('data-iconcolor');
		
		// Divider
		if (jQuery(this).hasClass('type1 divider_enabled')) {
			if (divider_color !== '' && divider_color !== undefined) {
				jQuery(this).find('.shortcode_iconbox').css({
					'border-color': divider_color
				});
			}
		}
		if (jQuery(this).hasClass('type2 divider_enabled')) {
			if (divider_color !== '' && divider_color !== undefined) {
				jQuery(this).find('.icon_box_divider').css({
					'background-color': divider_color
				});
			}
		}
		
		// Heading Color						
		if (heading_color !== '' && heading_color !== undefined) {
			jQuery(this).find('.iconbox_title').css({
				'color': heading_color
			});
		}
		
		// Description Color						
		if (description_color !== '' && description_color !== undefined) {
			jQuery(this).find('.iconbox_body p').css({
				'color': description_color
			});
		}
		
		// Icon Color						
		if (icon_color !== '' && icon_color !== undefined) {
			jQuery(this).find('span.ico').css({
				'color': icon_color
			});
		}

		// Icon Type
		if (jQuery(this).hasClass('icon-type_image')) {
			jQuery(this).find('.iconbox_icon-icon').hide();
		} else if (jQuery(this).hasClass('icon-type_icon')) {
			jQuery(this).find('.iconbox_icon-image').hide();
		}
	});
	if (jQuery('.iconboxes_container').hasClass('type2')) {
		jQuery('.type2 .shortcode_iconbox').each(function() {
			var section_bg_color = jQuery(this).attr('data-section-bg');
			if (section_bg_color !== '' && section_bg_color !== undefined) {
				jQuery(this).css({
					'background-color': section_bg_color
				});
			}
		});
	}
	
	// Skills
	if (jQuery('.shortcode_skills').size() > 0) {
		if (jQuery(window).width() > 760) {
			jQuery('.module_skills').waypoint(function () {
				jQuery('.skill_div').each(function () {
					var set_width = jQuery(this).attr('data-percent');									
					jQuery(this).stop().animate({'width': set_width}, 1500);
				});
			}, {offset: 'bottom-in-view'});
		} else {
			jQuery('.skill_div').each(function () {
				jQuery('.skill_div').each(function () {
					var set_width = jQuery(this).attr('data-percent');									
					jQuery(this).stop().animate({'width': set_width}, 1000);
				});
			});
		}
	}
	
	// Shortcode tabs
	var tabs_module = jQuery('.shortcode_tabs');
	if (tabs_module.size() > 0) {
		tabs_module.each(function(index) {
			var i = '';
			// GET ALL HEADERS
			i = 1;
			jQuery(this).find('.shortcode_tab_item_title').each(function(index) {
				jQuery(this).addClass('it' + i);
				jQuery(this).attr('whatopen', 'body' + i);
				jQuery(this).addClass('head' + i);
				jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
				i++;
			});
			
			// GET ALL BODY
			i = 1;
			jQuery(this).find('.shortcode_tab_item_body').each(function(index) {
				jQuery(this).addClass('body' + i);
				jQuery(this).addClass('it' + i);
				jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
				i++;
			});

			// OPEN ON START
			jQuery(this).find('.expand_yes').addClass('active');
			var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
			jQuery(this).find('.' + whatopenOnStart).show();
			jQuery(this).find('.' + whatopenOnStart).addClass('active');
		});
		
		jQuery(document).on('click', '.shortcode_tab_item_title', function() {
			jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
			jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
			var whatopen = jQuery(this).attr('whatopen');
			jQuery(this).parents('div.shortcode_tabs').find('.shortcode_tab_item_body').hide();
			jQuery(this).parents('.shortcode_tabs').find('.' + whatopen).show();
			jQuery(this).parents('.shortcode_tabs').find('.' + whatopen).addClass('active');
			jQuery(this).addClass('active');
		});
	};
	
	// Woocommerce Price Filter
	if (jQuery('.price_slider_wrapper').size() > 0) {
		setInterval(function woopricefilter() {
			
			var price_from = jQuery('.price_slider_amount').find('span.from').text();
			var price_to = jQuery('.price_slider_amount').find('span.to').text();
			
			jQuery('.price_slider').find('.ui-slider-handle').first().attr('data-width', price_from);
			jQuery('.price_slider').find('.ui-slider-handle').last().attr('data-width-r', price_to);
			
		}, 100);
	}
	
	// Page Title
	if (jQuery('.woocommerce_container').length && jQuery('.page_title').length) {
		var p_title = jQuery('.woocommerce_container').find('h1.page-title').html();
		if (jQuery('.summary').size() > 0) {
			jQuery('.page_title').hide();
		} else {
			jQuery('.page_title').empty().append('<h1>'+p_title+'</h1>');
		}
	}		
	
	// Thumbs Hover	
	jQuery('.woocommerce ul.products li.product, .woocommerce .images .woocommerce-main-image').each(function(){								
		jQuery(this).find("img").wrapAll('<div class="woo_hover_img"></div>');
		jQuery(this).find('.woo_hover_img').append('<span class="featured_items_ico"></span>');								
	});
	if (jQuery('.woocommerce_fullscreen').length) {
		var woo_fullscreen_h = jQuery('.wrapper').height() - jQuery('.fullscreen_shop_title').height();
		jQuery('.woocommerce_fullscreen').css({'min-height': woo_fullscreen_h + 'px'});
	}
	
	// Woocommerce ordering
	jQuery(function(a) {
		a(".woocommerce-ordering").on("change", "select.orderby", function() {
			a(this).closest("form").submit()
		}), a("input.qty:not(.product-quantity input.qty)").each(function() {
			var b = parseFloat(a(this).attr("min"));
			b >= 0 && parseFloat(a(this).val()) < b && a(this).val(b)
		})
	});
	
	// PrettyPhoto init
	if (jQuery('a.zoom').size() > 0) {
		(function(a) {
			a(function() {
				a("a.zoom").prettyPhoto({
					hook: "data-rel",
					social_tools: !1,
					theme: "pp_woocommerce",
					horizontal_padding: 20,
					opacity: .8,
					deeplinking: !1
				}), a("a[data-rel^='prettyPhoto']").prettyPhoto({
					hook: "data-rel",
					social_tools: !1,
					theme: "pp_woocommerce",
					horizontal_padding: 20,
					opacity: .8,
					deeplinking: !1
				})
			})
		})(jQuery);
	}
	
	// Contact form
	if (jQuery('.contact_form').size() > 0) {
		jQuery("#ajax-contact-form").on('submit', function() {
			var str = $(this).serialize();		
			$.ajax({
				type: "POST",
				url: "contact_form/contact_process.php",
				data: str,
				success: function(msg) {
					// Message Sent - Show the 'Thank You' message and hide the form
					if(msg == 'OK') {
						var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
						jQuery("#fields").hide();
					} else {
						var result = msg;
					}
					jQuery('#note').html(result);
				}
			});
			return false;
		});
	}
	
});

function gt3_preImg(imgArray) {
	if (imgArray.length > 0) {
			var perStep = 100 / imgArray.length,
					percent = 0,
		cur_step = 1,
		opacity  = 1;
			for (var i = 0; i < imgArray.length; i++) {			
					(function (img, src) {
			img.src = src;
							img.onload = function () {
									percent = cur_step * perStep;
									if (percent >= 100) {
											remove_gt3_Preloader();
									}
				cur_step ++;
							};                
					}(new Image(), imgArray[i]));
			}
	} else {
	setTimeout("remove_gt3_Preloader()", 500);
	}
}
function remove_gt3_Preloader() {
setTimeout("jQuery('.gt3_preloader').addClass('removePreloader')", 500);
setTimeout("jQuery('.gt3_preloader').remove()", 1500);
}
var portfolio_grid_tag = jQuery('.portfolio_grid');
if (portfolio_grid_tag.size() > 0) {
	var posts_already_showed = parseInt(portfolio_grid_tag.attr('data-perload'));
}
function get_fs_port_works() {
	var portfolio_grid_tag = jQuery('.portfolio_grid');
	if (!portfolio_grid_tag.hasClass('now_loading')) {
		portfolio_grid_tag.addClass('now_loading');
		var demoserver = portfolio_grid_tag.attr('data-demoserver'),
			post_per_load = parseInt(portfolio_grid_tag.attr('data-perload')),
			set_pad = portfolio_grid_tag.attr('data-pad'),
			ptf = portfolio_grid_tag.attr('data-ptf'),
			categories = portfolio_grid_tag.attr('data-categs'),
			showlikes = portfolio_grid_tag.attr('data-showlikes'),
			showshare = portfolio_grid_tag.attr('data-showshare');
		if (demoserver == "true") {
			if (posts_already_showed > 15) {
				posts_already_showed = 0;
			}
		}
		posts_already_showed = posts_already_showed + post_per_load;
	}
}
function animateList() {
	jQuery('.loading:first').removeClass('anim_el').removeClass('loading').animate({'z-index': '15'}, 200, function () {
			animateList();
			if (is_masonry.size() > 0) {
					is_masonry.masonry();
			}
	});
}

jQuery(document).on("mouseenter mouseleave", ".portfolio_item_wrapper", function(event) {
	jQuery(this).find(".img_block").parent().toggleClass("active_hover");
});

jQuery(document).on("mouseenter mouseleave", ".blog_post_image", function(event) {
	jQuery(this).parent().toggleClass("active_hover");
});

jQuery(document).on("mouseenter mouseleave", ".with_title_block .item_padding", function(event) {
	jQuery(this).find(".img_block").parent().toggleClass("active_hover");
});

jQuery(document).on("click", "#swipebox-container .slide.current img", function (e) {
	jQuery('#swipebox-next').trigger('click');
	e.stopPropagation();
});

jQuery(document).on("click", "#swipebox-container", function (e) {
	jQuery('#swipebox-close').trigger('click');
});

jQuery(window).resize(function() {
	gt3_content_update();
	// Height 100 percent
	if (jQuery('.height_100percent').size() > 0) {
		gt3_height100_perc();
	}
	gt3_fw_block();

	// Video background
	gt3_video_background();

	setTimeout("gt3_fw_block();",1000);

	setTimeout("gt3_video_background();",1000);

	//	Video iframe height
	gt3_video_size();

	// Video-image Background
	if (jQuery('.image_video_bg_block').size() > 0) {
		gt3_image_video_bg();
	}

	// Grid Icon Boxes
	if (jQuery('.module_iconboxes').size() > 0) {
		gt3_grid_iconboxes();
	}

	gt3_content_mobile_update();

	gt3_packery_update();
	setTimeout("gt3_packery_update()", 500);

});

jQuery(window).load(function() {
	gt3_content_update();
	// Height 100 percent
	if (jQuery('.height_100percent').size() > 0) {
		gt3_height100_perc();
	}
	gt3_fw_block();

	// Grid Icon Boxes
	if (jQuery('.module_iconboxes').size() > 0) {
		gt3_grid_iconboxes();
	}
	
	gt3_content_mobile_update();
	gt3_packery_update();
	
	// Woocommerce
	jQuery(".woocommerce-page .widget_price_filter .price_slider").wrap("<div class='price_filter_wrap'></div>");	
	jQuery("#tab-additional_information .shop_attributes").wrap("<div class='additional_info'></div>");	
	jQuery(".shop_table.cart").wrap("<div class='woo_shop_cart'></div>");	
	
});

function gt3_content_update() {
	if (jQuery('.page-template-page-fullscreen-slider').size() > 0 || jQuery('.single-gallery').size() > 0) {
		if (myWindow.width() > 900) {
			jQuery('.wrapper').css({'min-height': jQuery(window).height() - jQuery('#wpadminbar').height() + 'px'});
		} else {
			jQuery('.wrapper').css({'min-height': jQuery(window).height() - jQuery('.footer').height() - jQuery('.main_header').height() - jQuery('#wpadminbar').height() + 'px'});
		}
	} else {
		// Scroll Pane
		var scroll_pane_wrap = jQuery('.scroll_pane_wrap');
		if ((jQuery('.page-template-page-with-slider').length || jQuery('.page-template-page-contacts').length) && jQuery('.pre_footer').length) {
			var prefooter_height = jQuery('.pre_footer').height() + 93;
		} else {
			var prefooter_height = 0;
		}
		if (myWindow.width() > 900) {
			var wpadminbar = jQuery('#wpadminbar');
			if (wpadminbar.size() > 0) {
				if (jQuery('.pp_block').size() > 0) {
					var set_min_height = jQuery(window).height() - wpadminbar.height();
				} else {
					if (prefooter_height !== 0) {
						var set_min_height = jQuery(window).height() - wpadminbar.height();
					} else {
						var set_min_height = jQuery(window).height() - jQuery('.footer').height() - wpadminbar.height();
					}
				}
			} else {
				if (jQuery('.pp_block').size() > 0) {
					var set_min_height = jQuery(window).height();
				} else {
					if (prefooter_height !== 0) {
						var set_min_height = jQuery(window).height();
					} else {
						var set_min_height = jQuery(window).height() - jQuery('.footer').height();
					}
				}
			}
			jQuery('.wrapper').css({'min-height': set_min_height + 'px', 'padding-top': jQuery('.logo_sect').attr('data-height')*1 + 58 + 'px'});
			
			if (scroll_pane_wrap.size() > 0) {
				if (prefooter_height !== 0) {
					scroll_pane_wrap.css({'height': jQuery(window).height() - jQuery('.main_header').height() + 'px'});
				} else {
					scroll_pane_wrap.css({'height': jQuery(window).height() - jQuery('.main_header').height() - jQuery('.footer').height() - 70  + 'px'});
				}
				scroll_pane_wrap.jScrollPane({
					autoReinitialise: true
				});
			}
		} else {
			if (prefooter_height !== 0) {
				jQuery('.wrapper').css({'min-height': jQuery(window).height() - jQuery('.main_header').height() + 'px', 'padding-top': 0 + 'px'});
			} else {
				jQuery('.wrapper').css({'min-height': jQuery(window).height() - jQuery('.footer').height() - jQuery('.main_header').height() + 'px', 'padding-top': 0 + 'px'});
			}
			scroll_pane_wrap.css({'height': 'auto'});
			if (jQuery('.jspPane').size() > 0) {
				scroll_pane_wrap.jScrollPane().data('jsp').destroy();
			}
		}
	}

	if (myWindow.width() > 760) {
		if (body.hasClass('admin-bar')) {}
	}
	var frame16_9_tag = jQuery('.frame16x9');
	if (frame16_9_tag.size() > 0) {
		gt3_iframe16x9(frame16_9_tag);
	}
	var strip_menu_tag = jQuery('.strip-menu');
	if (strip_menu_tag.size() > 0) {
		if (myWindow.width() > 760) {			
			var strip_width = myWindow.width()/strip_menu_tag.attr('data-count'),
				strip_height = myWindow.height();
			jQuery('.strip-item').each(function(){
				jQuery(this).width(strip_width).height(strip_height);
			});
		} else {
			var strip_height = myWindow.height()/strip_menu_tag.attr('data-count')*2,
				strip_width = myWindow.width();
			jQuery('.strip-item').each(function(){
				jQuery(this).width(strip_width).height(strip_height);
			});
		}
	}
}

// Height 100 percent
function gt3_height100_perc() {
	if (jQuery(window).width() < 900) {
		jQuery('.height_100percent').css({'min-height': jQuery(window).height() - jQuery('.main_header').height() - jQuery('.footer').height() - jQuery('#wpadminbar').height() + 'px'});
	} else {
		jQuery('.height_100percent').css({'min-height': jQuery(window).height() - jQuery('.footer').height() - jQuery('#wpadminbar').height() + 'px'});
	}
}

function gt3_fw_block() {
	var div_tag = jQuery('div');
	if (div_tag.hasClass('right-sidebar') || div_tag.hasClass('left-sidebar')) {
	} else {
		var fw_block = jQuery('.fw_block');
		var fw_block_parent = fw_block.parent().width();
		var fw_site_width = fw_block.parents('.wrapper').width();
		var fw_contentarea_site_width_diff = fw_site_width - fw_block_parent;

		fw_block.css('margin-left', '-' + fw_contentarea_site_width_diff / 2 + 'px').css('width', fw_site_width + 'px').children('.fw_wrapinner').css('padding-left', fw_contentarea_site_width_diff / 2 + 'px').css('padding-right', fw_contentarea_site_width_diff / 2 + 'px');
		jQuery('.wall_wrap .fw_wrapinner').css('padding-left', '0px').css('padding-right', '0px');
	}
}

function gt3_get_isotope_posts(post_type, posts_count, posts_already_showed, template_name, content_insert_class, categories, set_pad, post_type_field, portf_image_width, portf_image_height) {
	jQuery.post(gt3_ajaxurl, {
		action: "get_portfolio_works",
		post_type: post_type,
		posts_count: posts_count,
		posts_already_showed: posts_already_showed,
		template_name: template_name,
		content_insert_class: content_insert_class,
		categories: categories,
		set_pad: set_pad,
		post_type_field: post_type_field,
		portf_image_width: portf_image_width,
		portf_image_height: portf_image_height
	}).done(function(data) {
		if (data.length < 1) {
			jQuery(".load_more_works").slideUp(300);
		}
		var $newItems = jQuery(data);
		jQuery(content_insert_class).isotope('insert', $newItems, function() {
			jQuery(content_insert_class).ready(function() {
				jQuery(content_insert_class).isotope('reLayout');
			});
			if (jQuery('.fs-port-cont').size() > 0) {
				setTimeout('jQuery(".fs_grid_portfolio").isotope("reLayout");', 1500);
			}
		});
		jQuery('.newLoaded').each(function() {
			jQuery('.fs_port_loadmore').on('click', function() {
				get_works();
			});
			jQuery(this).removeClass('newLoaded');
		});
		setTimeout("gt3_animateList()", 500);
	});
}

//	Video iframe height
function gt3_video_size() {
	jQuery('.blog_post_video, .video_module').each(function () {
		jQuery(this).find('iframe').css({'height': jQuery(this).width() * 9 / 16 + 'px'});
	});
}

//	Video background
function gt3_video_background() {
	jQuery('.video_bg').each(function () {
		jQuery(this).find('iframe').css({'height': jQuery(this).height() + 'px'});
	});
}

function gt3_animateList() {
	jQuery('.loading:first').removeClass('loading').animate({
		'z-index': '15'
	}, 200, function() {
		gt3_animateList();
		if (is_masonry.size() > 0) {
			is_masonry.masonry();
		}
	});
}

function gt3_iframe16x9(frame_class) {
	frame_class.each(function() {
		jQuery(this).height((jQuery(this).width() / 16) * 9);
	});
}

// Video-image Background
function gt3_image_video_bg() {
	var myWindow = jQuery(window),
		window_h = jQuery(window).height(),
		window_w = jQuery(window).width();

	if (jQuery(window).width() < 900) {
		jQuery('.fw_background').height(jQuery(window).height() - jQuery('.main_header').height() - jQuery('.footer').height() - jQuery('#wpadminbar').height()).width(window_w);
	} else {
		jQuery('.fw_background').height(jQuery(window).height() - jQuery('.footer').height() - jQuery('#wpadminbar').height()).width(window_w);
	}

	if (myWindow.width() > 1024) {
		if (jQuery('.bg_video').size() > 0) {
			if (((myWindow.height() + 150) / 9) * 16 > myWindow.width()) {
				jQuery('iframe').height(myWindow.height() + 150).width(((myWindow.height() + 150) / 9) * 16);
			} else {
				jQuery('iframe').width(myWindow.width()).height(((myWindow.width()) / 16) * 9);
			}
		}
	} else if (myWindow.width() < 760) {
		jQuery('.bg_video').height(window_h - header.height() - jQuery('.footer').height() - jQuery('#wpadminbar').height()).width(window_w);
		jQuery('iframe').height(window_h - header.height()).width(window_w);
	} else {
		jQuery('.bg_video').height(window_h).width(window_w);
		jQuery('iframe').height(window_h).width(window_w);
	}
}

// Grid Icon Boxes
function gt3_grid_iconboxes() {
	var maxHeight = 0;
	var all_iconboxes = jQuery(".module_iconboxes .shortcode_iconbox");
	all_iconboxes.css({'height': 'auto'});
	all_iconboxes.each(function () {
		if (jQuery(this).height() > maxHeight) {
			maxHeight = jQuery(this).height();
		}
		jQuery(this).height(maxHeight);
	});
}

//Personal Preloader
function personal_preloader_init() {
	if (jQuery('.fs_gallery_trigger').size() > 0) {
		//FS Slider Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 100, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').attr('data-src')));
		}
		
		if ((!jQuery('.fs_slide1').hasClass('slide_image') || jQuery('.fs_slide1').hasClass('block_loaded')) && !fs_slider.hasClass('started')) {
			run_fs_slider();
		}
	}
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		//Ribbon Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 200, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').find('img').attr('src')));
		}
		if (!ribbon_slider.hasClass('started')) {
			run_ribbon_slider();
		}
	}
	if (jQuery('.albums_circles_slider').size() > 0) {
		//Flow Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 200, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').find('img').attr('src')));
		} else {
			circles_slider.removeClass('wait4load');
		}
		if (!circles_slider.hasClass('started')) {
			run_circle_slider();
		}
	}
	if (jQuery('.flow_gallery_trigger').size() > 0) {
		//Flow Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 200, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').find('img').attr('src')));
		} else {
			flow_slider.removeClass('wait4load');
			setTimeout("flow_slider.removeClass('wait4load2')",500);
		}
		if (!flow_slider.hasClass('started')) {
			run_flow_slider();
		}
	}
	if (jQuery('.shift_gallery_trigger').size() > 0) {
		//Shift Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 100, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').attr('data-src')));
		} else {
			shift_gallery.removeClass('wait4load');
		}
		
		if ((jQuery('.odd_slide1').hasClass('block_loaded') && jQuery('.even_slide1').hasClass('block_loaded')) && !shift_gallery.hasClass('started')) {
			run_shift_slider();
		}
	}
	if (jQuery('.albums_stripe_slider').size() > 0) {
		//FS Slider Preloader
		if (jQuery('.block2preload:first').size() > 0) {
			(function (img, src) {
				img.src = src;
				img.onload = function () {
					jQuery('.block2preload:first').removeClass('block2preload').addClass('block_loaded').animate({
						'z-index': '15'
					}, 100, function() {					
						personal_preloader_init();
					});
				};                
			}(new Image(), jQuery('.block2preload:first').find('.album_slide_image').attr('data-src')));
		}
		
		if (jQuery('.album_slide1').hasClass('block_loaded') && !albums_stripe_slider.hasClass('started')) {
			run_albums_slider();
		}
	}
}

// Content Mobile Update
function gt3_content_mobile_update() {
	if (jQuery(window).width() < 768) {
		if (jQuery('.page-template-page-kenburns').size() > 0 || jQuery('.page-template-page-fullscreen-slider').size() > 0 || jQuery('.page-template-page-background').size() > 0) {
			jQuery('.height_100percent, .wrapper, .image_video_bg_block').css({'min-height': jQuery(window).height() + 'px'});
			jQuery('.mobile_menu_wrapper').css({'top': jQuery('.main_header').height() + 'px'});
		}
	}
}

function gt3_packery_update() {
	// Packery
	var portfolio_packery_tag = jQuery('.portfolio_packery');
	if (portfolio_packery_tag.length) {
		portfolio_packery_tag.each(function() {
			var packery_w = Math.floor(jQuery(this).parent().width()/4)* 4;
			jQuery(this).width(packery_w);
		});
		jQuery('.packery_item').each(function() {
			var item_img_url = jQuery(this).find('.packery_img_block img').attr('src'),
				packery_item_w = jQuery(this).width(),
				packery_item_h = Math.ceil(packery_item_w*0.964);

			if (jQuery(this).parents().hasClass('type_grid6') || jQuery(this).parents().hasClass('packery_grid6')) {
				packery_item_h = Math.ceil(packery_item_w*0.776);
			}

			if (jQuery(this).hasClass('grid_item_width2_height1')) {
				packery_item_h = packery_item_h/2;
			} else if (jQuery(this).hasClass('grid_item_width2')) {
				packery_item_h = Math.ceil(packery_item_w*0.576);
			}

			jQuery(this).find('.packery_img_block').css({'background-image': 'url("'+item_img_url+'")', 'height': packery_item_h + 'px'});
		});
	}
}

var wc_single_product_params = {
	"i18n_required_rating_text": "Please select a rating",
	"review_rating_required": "yes"
};

if (jQuery('.gt3pg_sorting_block').size() > 0) {
	/* SORTING */
	jQuery(function () {
		var $container = jQuery('.gt3pg_sorting_block');

		$container.isotope({
			itemSelector: '.gt3pg_element'
		});

		var $optionSets = jQuery('.optionset'),
			$optionLinks = $optionSets.find('a');

		$optionLinks.on("click", function () {
			var $this = jQuery(this);
			// don't proceed if already selected
			if ($this.parent('li').hasClass('selected')) {
				return false;
			}
			var $optionSet = $this.parents('.optionset');
			$optionSet.find('.selected').removeClass('selected');
			$optionSet.find('.fltr_before').removeClass('fltr_before');
			$optionSet.find('.fltr_after').removeClass('fltr_after');
			$this.parent('li').addClass('selected');
			$this.parent('li').next('li').addClass('fltr_after');
			$this.parent('li').prev('li').addClass('fltr_before');

			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[key] = value;
			if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
				// changes in layout modes need extra logic
				changeLayoutMode($this, options)
			} else {
				// otherwise, apply new options
				$container.isotope(options);
				var sortingtimer = setTimeout(function () {
					jQuery('.gt3pg_sorting_block').isotope('layout');
					clearTimeout(sortingtimer);
				}, 500);
			}
			return false;
		});

		$container.find('img').load(function () {
			$container.isotope('layout');
		});
	});

	jQuery(window).load(function () {
		jQuery('.gt3pg_sorting_block').isotope('layout');
		var sortingtimer = setTimeout(function () {
			jQuery('.gt3pg_sorting_block').isotope('layout');
			clearTimeout(sortingtimer);
		}, 500);
	});
	jQuery(window).resize(function () {
		jQuery('.gt3pg_sorting_block').isotope('layout');
	});
}

jQuery(function(a) {
	return "undefined" != typeof wc_single_product_params && (a("body").on("init", ".wc-tabs-wrapper, .woocommerce-tabs", function() {
			a(".wc-tab, .woocommerce-tabs .panel:not(.panel .panel)").hide();
			var b = window.location.hash,
					c = window.location.href,
					d = a(this).find(".wc-tabs, ul.tabs").first();
			b.toLowerCase().indexOf("comment-") >= 0 || "#reviews" === b || "#tab-reviews" === b ? d.find("li.reviews_tab a").click() : c.indexOf("comment-page-") > 0 || c.indexOf("cpage=") > 0 ? d.find("li.reviews_tab a").click() : d.find("li:first a").click()
	}).on("click", ".wc-tabs li a, ul.tabs li a", function(b) {
			b.preventDefault();
			var c = a(this),
					d = c.closest(".wc-tabs-wrapper, .woocommerce-tabs"),
					e = d.find(".wc-tabs, ul.tabs");
			e.find("li").removeClass("active"), d.find(".wc-tab, .panel:not(.panel .panel)").hide(), c.closest("li").addClass("active"), d.find(c.attr("href")).show()
	}).on("click", "a.woocommerce-review-link", function() {
			return a(".reviews_tab a").click(), !0
	}).on("init", "#rating", function() {
			a("#rating").hide().before('<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>')
	}).on("click", "#respond p.stars a", function() {
			var b = a(this),
					c = a(this).closest("#respond").find("#rating"),
					d = a(this).closest(".stars");
			return c.val(b.text()), b.siblings("a").removeClass("active"), b.addClass("active"), d.addClass("selected"), !1
	}).on("click", "#respond #submit", function() {
			var b = a(this).closest("#respond").find("#rating"),
					c = b.val();
			if (b.length > 0 && !c && "yes" === wc_single_product_params.review_rating_required) return window.alert(wc_single_product_params.i18n_required_rating_text), !1
	}), void a(".wc-tabs-wrapper, .woocommerce-tabs, #rating").trigger("init"))
});

// Google maps
if (jQuery('#map-canvas').size() > 0) {

function initialize() {
	var styleArray = [{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [{
			"saturation": 36
		}, {
			"color": "#000000"
		}, {
			"lightness": 40
		}]
	}, {
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": [{
			"visibility": "on"
		}, {
			"color": "#000000"
		}, {
			"lightness": 16
		}]
	}, {
		"featureType": "all",
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [{
			"color": "#35383d"
		}, {
			"lightness": "0"
		}]
	}, {
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#000000"
		}, {
			"lightness": 17
		}, {
			"weight": 1.2
		}]
	}, {
		"featureType": "administrative",
		"elementType": "labels",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "administrative.country",
		"elementType": "all",
		"stylers": [{
			"visibility": "simplified"
		}]
	}, {
		"featureType": "administrative.country",
		"elementType": "geometry",
		"stylers": [{
			"visibility": "simplified"
		}]
	}, {
		"featureType": "administrative.country",
		"elementType": "labels.text",
		"stylers": [{
			"visibility": "simplified"
		}]
		}, {
			"featureType": "administrative.province",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "administrative.locality",
			"elementType": "all",
			"stylers": [{
				"visibility": "simplified"
			}, {
				"saturation": "-100"
			}, {
				"lightness": "30"
			}]
		}, {
			"featureType": "administrative.neighborhood",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "administrative.land_parcel",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [{
				"visibility": "simplified"
			}, {
				"gamma": "0.00"
			}, {
				"lightness": "74"
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 20
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#35383d"
			}]
		}, {
			"featureType": "landscape.man_made",
			"elementType": "all",
			"stylers": [{
				"lightness": "3"
			}]
		}, {
			"featureType": "poi",
			"elementType": "all",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 21
			}]
		}, {
			"featureType": "poi.government",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ff0000"
			}]
		}, {
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [{
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#2a2d32"
			}, {
				"lightness": "0"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 29
			}, {
				"weight": 0.2
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 18
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#2a2d32"
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 16
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#2a2d32"
			}]
		}, {
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 19
			}]
		}, {
			"featureType": "transit",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#35383d"
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}, {
				"lightness": 17
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#272a2f"
			}]
		}];
		var myLatlng = new google.maps.LatLng(40.714353, -74.005973);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: styleArray
		};
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'New York!',
			icon: 'img/johnblack.png'
		});
}
google.maps.event.addDomListener(window, 'load', initialize);


}

// Kenburns slider
if (jQuery('#kenburns').size() > 0) {
	gallery_set = ['img/img7.jpg', 'img/img5.jpg', 'img/img4.jpg', 'img/img3.jpg', 'img/coming_soon.jpg', 'img/img1.jpg', ]
	 jQuery(document).ready(function() {
		jQuery('#kenburns').attr('width', myWindow.width());
		jQuery('#kenburns').attr('height', myWindow.height());
		jQuery('#kenburns').css('top', '0px');
		jQuery('#kenburns').remove();
		setTimeout('kenburns_resize()', 150);
	});

	function kenburns_resize() {
		if (jQuery('.gallery_kenburns').find('#kenburns').size() > 0) {
			jQuery('.gallery_kenburns').find('#kenburns').remove();
		}
		jQuery('.gallery_kenburns').append('<canvas id="kenburns"><p>Your browser does not support canvas!</p></canvas>');
		jQuery('#kenburns').attr('width', myWindow.width());
		jQuery('#kenburns').attr('height', myWindow.height());
		jQuery('#kenburns').kenburns({
			images: gallery_set,
			frames_per_second: 30,
			display_time: 5000,
			fade_time: 1000,
			zoom: 1.2,
			background_color: '#000000'
		});
		jQuery('#kenburns').css('top', '0px');
	}
	jQuery(window).resize(function() {
		jQuery('#kenburns').remove();
		setTimeout('kenburns_resize()', 300);
	});
}