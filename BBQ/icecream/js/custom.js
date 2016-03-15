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
		
	
	$(window).load(function() {
		
		var $container = $('.dt-sc-menuitems-carousel');
		if( $container.length) {
			
			var $width = 16;

			$(window).smartresize(function(){
				$container.css({overflow:'hidden'}).isotope({itemSelector : '.catelog-menu',masonry: { gutterWidth: $width } });
			});
			
			$container.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
			
		}

		if($("div.dt-sc-sorting-container").length){
			$("div.dt-sc-sorting-container a").click(function(){
				var $width = 16;				
				$("div.dt-sc-sorting-container a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$container.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
			return false;	
			});
		}

	});
	  
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
	
	/* Sticky Header */
	$("#header").sticky({ topSpacing: 0 });
	
	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 60
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
		$('html,body').animate({scrollTop: ($(id).offset().top-58)},3000);
		$(this).parents('.meanmenu-list').stop(true, true).slideUp(500);
		$(this).parents('.meanmenu-reveal').find('a.meanmenu-icon').html('<span></span><span></span><span></span>');
		$(this).parents('.meanmenu-reveal').find('a.meanmenu-icon').addClass('open-nav');
	});
	
	//UI TO TOP PLUGIN...
	$().UItoTop({ easingType: 'easeOutQuart' });
	
   //PARALLAX SECTIONS...
	$('.parallax').bind('inview', function (event, visible) {
		if(visible == true) {
			$(this).parallax("50%", 0.3);
		} else {
			$(this).css('background-position', '');
		}
	});
		
	//PRETTYPHOTO...
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	if($pphoto.length){
		//PRETTYPHOTO...
		$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({ 
			overlay_gallery: false, 
			social_tools: false,
			deeplinking: false
		});
	}
		
		
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