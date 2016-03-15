// JavaScript Document
jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	
	var isSafari = navigator.userAgent.match(/Safari/i) ? true : false;
	var isChrome = navigator.userAgent.match(/Chrome/i) ? true : false;
	
	if (!isSafari || isChrome) {
		$.getScript("js/greensock.js");
		$.getScript("js/ScrollToPlugin.min.js");
		$.getScript("js/smoothPageScroll.js");
	}
 
	Pace.on("done", function(){
		$(".cover").fadeOut(500);
		$(".pace").remove();
	});

	$(".menu-details").niceScroll({cursorborder:"1px solid #705755", cursorwidth:"2px"});

	//TABS...
	if($('ul.tabs-frame').length > 0) {
		$('ul.tabs-frame').tabs('> .tabs-frame-content', { effect: 'slide' });
	}
	
	if($('.team-tab ul.tabs-frame').length > 0) {
		$('ul.tabs-frame').tabs('> .tabs-frame-content', { effect: 'fade' });
	}

	 /*Toggle shortcode*/
	jQuery('.dt-sc-toggle').toggle(function(){ jQuery(this).addClass('active'); },function(){ jQuery(this).removeClass('active'); });
	jQuery('.dt-sc-toggle').click(function(){ jQuery(this).next('.dt-sc-toggle-content').slideToggle(); });
	jQuery('.dt-sc-toggle-frame-set').each(function(){
		var $this = jQuery(this),
		$toggle = $this.find('.dt-sc-toggle-accordion');
		$toggle.click(function(){
			if( jQuery(this).next().is(':hidden') ) {
				$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
				jQuery(this).toggleClass('active').next().slideDown();
			}
		return false;
	});
	//Activate First Item always
	$this.find('.dt-sc-toggle-accordion:first').addClass("active");
	$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
	});/* Toggle Shortcode end*/ 
		
	
  	//Service-carousel
	if( jQuery('.dt-sc-service-carousel').length) {
		jQuery('.dt-sc-service-carousel').each(function(){
			  var pagger = jQuery(this).parents(".dt-sc-service-carousel-wrapper").find("div.carousel-arrows"),
			      next = pagger.find("a.next-arrow"),
				  prev = pagger.find("a.prev-arrow");

			jQuery(this).carouFredSel({
				  responsive:true,
				  auto:false,
				  width:'100%',
				  height: 'auto',
				  scroll:1,
				  items:{
				  	height: 'variable',
				  	visible: {min: 1,max: 3} 
				  },
					swipe: {
						onTouch: true,
						onMouse: true,
						fx: 'directscroll',
						easing: 'swing',
						duration: 1200,
					},
				  prev:prev,
				  next:next
			});

		});
	}//Service-carousel End 
		
  	//Beer-carousel
	if( jQuery('.dt-sc-beer-carousel').length) {
		jQuery('.dt-sc-beer-carousel').each(function(){
			  var pagger = jQuery(this).parents(".dt-sc-beer-carousel-wrapper").find("div.carousel-arrows"),
			      next = pagger.find("a.next-arrow"),
				  prev = pagger.find("a.prev-arrow");

			jQuery(this).carouFredSel({
				  responsive:true,
				  auto: {
					play: true,
					timeoutDuration: 5000,
				  },
				  width:'100%',
				  height: 'variable',
				  scroll: {
					items: 1,
					onAfter: function(data) {
						var clsname = data.items.visible[0].className;
						clsname = clsname.replace('dt-sc-one-fourth column ', '');
						clsname = clsname.replace('first', '');
						jQuery('#receipies .tabs-frame-content').hide();
						jQuery('#receipies .'+clsname).fadeIn(1200);
						jQuery(".dt-sc-beer-carousel li a").removeAttr('class');
						jQuery(".dt-sc-beer-carousel li:first a").attr('class', 'current');
					}
				  },
				  items:{
				  	height: 'variable',
				  	visible: {min: 1,max: 4} 
				  },
					swipe: {
						onTouch: true,
						onMouse: true,
						fx: 'scroll',
						easing: 'quadratic',
						duration: 1200,
					},
				  prev:prev,
				  next:next
			});

		});
	}//Beer-carousel End 
		
	jQuery(".dt-sc-beer-carousel li").click(function(e){
		var clsname = jQuery(this).attr('class');
		clsname = clsname.replace('dt-sc-one-fourth column ', '');
		clsname = clsname.replace('first', '');
		jQuery('#receipies .tabs-frame-content').hide();
		jQuery('#receipies .'+clsname).fadeIn(1200);
		e.preventDefault();
	});
			
	/* Sticky Header */
	$("#header").sticky({ topSpacing: 0 });
	
	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 62
	});
	
	 $(".responsive-nav a.meanmenu-icon").click(function(e){
		if($(this).hasClass('open-nav')) {
			$(this).next('ul.meanmenu-list').stop(true, true).slideDown(500);
			$(this).removeClass('open-nav').addClass('close-nav');
			$(this).html('X');
		} else {
			$(this).next('ul.meanmenu-list').stop(true, true).slideUp(500);
			$(this).removeClass('close-nav').addClass('open-nav');
			$(this).html('<span></span><span></span><span></span>');
		}
	 });
	 	
	$(".responsive-nav ul.meanmenu-list li a").click(function(e){
		var id = $(this).attr('href');
		$('html,body').animate({scrollTop: ($(id).offset().top-60)},3000);
		$(this).parents('.meanmenu-list').stop(true, true).slideUp(500);
		$(this).parents('.meanmenu-reveal').find('a.meanmenu-icon').html('<span></span><span></span><span></span>');
		$(this).parents('.meanmenu-reveal').find('a.meanmenu-icon').addClass('open-nav');
	});
	

	//UI TO TOP PLUGIN...
	$().UItoTop({ easingType: 'easeOutQuart' });
	

	//PARALLAX SECTIONS...
	$('.parallax').bind('inview', function (event, visible) {
		if(visible == true) {
			$(this).parallax("50%", 0.5);
		} else {
			$(this).css('background-position', '');
		}
	});
	
	//GOOGLE MAPS...
	var $map = $('#map');
	if( $map.length ) {
		$map.gMap({ 
			controls: false,
			scrollwheel: false,
			markers: [{ 
					  address : 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  html: 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  icon: { 
							image: "js/images/mapicon.png",
							iconsize: [61, 89],
						} 
					}],
			zoom: 16 
		});
	}
		
	$("#radio-button").click(function( event ){
		$(".view-map").toggleClass('map-active');
		$(this).toggleClass('active');
		event.preventDefault();
	});	
	
	/* Tweets */
	if( $('.tweetbox').length ){
		$(".tweetbox").tweet({
			modpath: 'js/twitter/',
			username: "envato",
			count: 2,
			loading_text: "loading tweets...",
			template: "{text} {time}"
		});
	}
	
	if($('form[name="frmcontact"]').length) {
			
		//Contact AJAX SUBMIT...
		$('form[name="frmcontact"]').submit(function () {
			
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
	
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('Something went wrong!');
					   },
					  success: function (response) {
						$('#ajax_contact_msg').html(response);
						$('#ajax_contact_msg').slideDown('slow');
					 }
				});
			}
			return false;
			
		});
		$('form[name="frmcontact"]').validate({
			rules: { 
				txtname: { required: true },
				txtemail: { required: true, email: true },
				txtmessage: { required: true }
			},
			errorPlacement: function(error, element) { }
		});
		
	}

	
});
	

// ANIMATE CSS + JQUERY INVIEW CONFIGURATION
(function ($) {
    "use strict";
    $(".animate").each(function () {
        $(this).one('inview', function (event, visible) {
            var $delay = "";
            var $this = $(this),
                $animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
            $delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;

            if (visible === true) {
                setTimeout(function () {
                    $this.addClass($animation);
                }, $delay);
            } else {
                setTimeout(function () {
                    $this.removeClass($animation);
                }, $delay);
            }
        });
    });
})(jQuery);