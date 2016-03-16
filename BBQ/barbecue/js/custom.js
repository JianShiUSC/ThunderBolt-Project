// JavaScript Document
jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
 	
	Pace.on("done", function(){
		$(".cover").fadeOut(500);
		$(".pace").remove();
	});

	$("#datepicker-cancel").click(function(e){
		$("#datetimepicker").val('');
	});

	$('#datetimepicker').datetimepicker({
		dayOfWeekStart : 1,
		lang:'en',
		startDate:	'2015/01/01'
	});
	
	$("div.sb-slidebar").animate( { right: -761 } );
	$("a.order-now").click(function(e){
		if($("div.sb-slidebar").hasClass('active')){
			$("div.sb-slidebar").animate({width: "toggle",right: -761}, 600, function(){ $("div.sb-slidebar").removeClass('active');});
		}else{
			$('#reservation_form')[0].reset();
			$('#reservation_form').find('input, textarea').removeClass('error');
			$('#ajax_reservation_msg').html('');
			$("div.sb-slidebar").animate({width: "toggle",right: 0}, 600, function(){ $("div.sb-slidebar").addClass('active'); });
		}
		e.preventDefault();
	});
	
	$(document).click(function(e){  
		if( $(e.target).closest("a.order-now").length > 0 || $(e.target).closest("td").length > 0 || $(e.target).closest(".timelist_item").length > 0 ) {
			return false;
		} else if($(e.target).closest("div.sb-slidebar").length > 0) {
			
		} else {
			if($("div.sb-slidebar").hasClass('active')){
				$('div.datepicker').hide();
				$("div.sb-slidebar").animate({width: "toggle",right: -761}, 600, function(){ $("div.sb-slidebar").removeClass('active');});
				e.preventDefault();
			}
		}
	});
	
	if($().validate) {
		
		$('form[name="reservation_form"]').submit(function () {
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_reservation_msg').html(response);
						$('#ajax_reservation_msg').slideDown('slow');
					 }
				});
			}
			return false;
		});
		
		$('form[name="reservation_form"]').validate({
			rules: { 
				datetimepicker: { required: true },
				txtname: { required: true },
				txtemail: { required: true, email: true },
				txtmessage: { required: true }
			},
			errorPlacement: function(error, element) { }
		});	
	
	}
	
	$(window).load(function() {

		//ISOTOPE CATEGORY...
		var $container = $('.dt-sc-portfolio-container');	
		var $gw = 16;
		
		$('.dt-sc-sorting-container a').click(function(){ 
			$('.dt-sc-sorting-container').find('a').removeClass('active-sort');
			$(this).addClass('active-sort');
			
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				},
				masonry: {
					columnWidth: $('.dt-sc-portfolio-container .portfolio').width(),
					gutterWidth: $gw
				}
			});
			return false;
		});
		
		
		//ISOTOPE...
		if($container.length){
			$container.isotope({ 
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				},
				masonry: {
					columnWidth: $('.dt-sc-portfolio-container .portfolio').width(),
					gutterWidth: $gw
				}
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
				  prev:prev,
				  next:next,
					swipe: {
						onTouch: true,
						onMouse: true,
						fx: 'directscroll',
						easing: 'swing',
						duration: 1200
					}
			});

		});
	}//Service-carousel End 

	
	//menuitems-carousel-wrapper
	if( jQuery('.dt-sc-menuitems-carousel').length) {
		
		var $tt = ["Appetizers","Breakfast","Dessert","Supper"];
		
		jQuery('.dt-sc-menuitems-carousel').each(function(){
			  var pagger = jQuery(this).parents(".dt-sc-menuitems-carousel-wrapper").find("div.carousel-arrows"),
			      next = pagger.find("a.next-arrow"),
				  prev = pagger.find("a.prev-arrow");

			jQuery(this).carouFredSel({
				  responsive:true,
				  auto:false,
				  width:'100%',
				  height: 832,
				  scroll: {
					items:1,
				  },
				  items:{
				  	height: 'variable',
				  	visible: {min: 1,max: 1} 
				  },
					pagination: {
						container: "#carouselnav",
						anchorBuilder: function(nr) {
								var tooltip = $tt;
								return '<li><a href="#'+nr+'" title="'+tooltip[nr-1]+'" class="carouselnav-pager dt-sc-tooltip-left"><span class="'+tooltip[nr-1].toLowerCase()+'"></span></a></li>';
							},
					},
				swipe: {
					onTouch: true,
					onMouse: true,
					fx: 'cover-fade',
					easing: 'elastic',
					duration: 1200,
				}
			});

		});
		
		  if(jQuery(".carouselnav-pager.dt-sc-tooltip-left").length){
			jQuery(".carouselnav-pager.dt-sc-tooltip-left").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
		  }
		
	}//menuitems-carousel-wrapper End
	
	// Clients-testimonial Carousel
	if( jQuery('.dt-sc-partner-carousel').length) {
		jQuery('.dt-sc-partner-carousel').each(function(){
			  var pagger = jQuery(this).parents(".dt-sc-partner-carousel-wrapper").find("div.carousel-arrows"),
			      next = pagger.find("a.carousel-next"),
				  prev = pagger.find("a.carousel-prev");

			jQuery(this).carouFredSel({
				  responsive:true,
				  auto:false,
				  width:'100%',
				  height: 225,
				  scroll:1,
				  items:{
				  	height: 'variable',
				  	visible: {min: 1,max: 3} 
				  },
				  prev:prev,
				  next:next
			});

		});
	}// Clients Carousel End
	
	// portfolio Carousel
	if( jQuery('.portfolio-carousel').length) {
		jQuery('.portfolio-carousel').each(function(){
			  var pagger = jQuery(this).parents(".dt-sc-portfolio-carousel-wrapper").find("div.carousel-arrows"),
			      next = pagger.find("a.next-arrow"),
				  prev = pagger.find("a.prev-arrow");

			jQuery(this).carouFredSel({
				  responsive:true,
				  auto:false,
				  width:'100%',
				  height: 420,
				  scroll:1,
				  items:{
				  	height: 'variable',
				  	visible: {min: 1,max: 3} 
				  },
				  prev:prev,
				  next:next,
					swipe: {
						onTouch: true,
						onMouse: true,
						fx: 'uncover-fade',
						easing: 'swing',
						duration: 1200
					}
			});

		});
	}// portfolio Carousel End
	

	//Recipe ajax load...	
	$("a[data-gal^='prettyPhoto[pp_receipe]']").prettyPhoto({ 
		theme: 'dark_rounded',
		overlay_gallery: false, 
		social_tools: false,
		deeplinking: false,
	});
		
	//Scroll Down...
	$('#home #scrolldown a').click(function(){
		   $.scrollTo('#receipes', 1400, { offset: { top: -65 }});
		   return false;
    });

	/* Sticky Header */
	$("#header").sticky({ topSpacing: 0 });
	
	//ONE PAGE NAV...
	$('#main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 64
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
		$('html,body').animate({scrollTop: ($(id).offset().top-64)},3000);
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
	
	//Portfolio isotope
	var $container = $('.portfolio-container');
	if( $container.length) {
		
		$width = $container.hasClass("no-space") ? 0 : 0;

		$(window).smartresize(function(){
			$container.css({overflow:'hidden'}).isotope({itemSelector : '.column', masonry: { gutterWidth: $width } });
		});
		
		$container.isotope({
		  filter: '*',
		  masonry: { gutterWidth: $width },
		  animationOptions: { duration: 750, easing: 'linear', queue: false  }
		});
		
	}
	
	if($("div.sorting-container").length){
		$("div.sorting-container a").click(function(){
			$width = $container.hasClass("no-space") ? 0 : 0;				
			$("div.sorting-container a").removeClass("active-all");
			var selector = $(this).attr('data-filter');
			$(this).addClass("active-all");
			$container.isotope({
				filter: selector,
				masonry: { gutterWidth: $width },
				animationOptions: { duration:750, easing: 'linear',  queue: false }
			});
		return false;	
		});
	}
	//Portfolio isotope End
	
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
		
		
		/* Portfolio Lightbox */
	if($(".gallery").length) {
		$(".gallery a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});		
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
		
	// Recipes load more
	var item_loaded = 0;
	$('.dt-load-more').click(function(e){
	
		if(item_loaded == 0) 
		{
			$.ajax({
				type: "POST",
				url: "receipe-content.html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.load-more').html('Loading...');
				},
				success: function(msg){
					$('.dt-sc-portfolio-container').append( $(msg) ).isotope( 'appended', $(msg) );
					$('.dt-sc-portfolio-container').isotope( 'reloadItems' ).isotope();
					$("a[data-gal^='prettyPhoto[gallery]']").prettyPhoto({
						show_title: false,
						social_tools: false,
						deeplinking: false
					});
					
					$(".animate").each(function () {
						var $delay = "";
						var $this = $(this),
							$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
							$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 100;
			
						setTimeout(function () {
							$this.addClass($animation);
						}, $delay);
					});
					if(jQuery(".carouselnav-pager.dt-sc-tooltip-left").length){
						jQuery(".carouselnav-pager.dt-sc-tooltip-left").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
					}
					$("a[data-gal^='prettyPhoto[pp_receipe]']").prettyPhoto({ 
						theme: 'dark_rounded',
						overlay_gallery: false, 
						social_tools: false,
						deeplinking: false
					});
					$("a.order-now").click(function(e){
						if($("div.sb-slidebar").hasClass('active')){
							$("div.sb-slidebar").animate({width: "toggle",right: -761}, 600, function(){ $("div.sb-slidebar").removeClass('active');});
						}else{
							$("div.sb-slidebar").animate({width: "toggle",right: 0}, 600, function(){ $("div.sb-slidebar").addClass('active'); });
						}
						e.preventDefault();
					});
				  	$(window).trigger( 'resize' );
				},
				complete: function(){
					$('.dt-load-more').text('No more posts to load!').css({"cursor":"default"});
					$('.dt-load-more').addClass('nopost');
					item_loaded++;
				} 
			});
		}
		
		e.preventDefault();
		
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
			
		//NEWSLETTER AJAX SUBMIT...
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