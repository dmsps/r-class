$(document).ready(() => {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true
    } else {
      return false
    }
  }

  if ( msieversion() ){
    $('body').addClass('is-ie');
  }

  // BREAKPOINT SETTINGS
  var bp = {
    mobileS: 375,
    mobile: 568,
    tablet: 768,
    desktop: 1024,
    wide: 1336,
    hd: 1440
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wWidth = _window.width();

    var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";

    $('.page').append(content);
    setTimeout(function(){
      $('.dev-bp-debug').fadeOut();
    },1000);
    setTimeout(function(){
      $('.dev-bp-debug').remove();
    },1500)
  }

  _window.on('resize', debounce(setBreakpoint, 200))

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    initPopups();
    initSliders();
    runScrollMonitor();

    initMasks();

    // temp - developer
    _window.on('resize', debounce(setBreakpoint, 200))
  }

  pageReady();


  //////////
  // COMMON
  //////////

  // svg support for laggy browsers
  //svg4everybody();

  // Viewport units buggyfill
  window.viewportUnitsBuggyfill.init({
    force: true,
    hacks: window.viewportUnitsBuggyfillHacks,
    refreshDebounceWait: 250,
    appendToBody: true
  });


 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smooth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  // if ( $('.header-static').length == 0 ){
  //   _window.on('scroll', throttle(function() {
  //     var vScroll = _window.scrollTop();
  //     var header = $('.header').not('.header--static');
  //     var headerHeight = header.height();
  //     var heroHeight = $('.hero').outerHeight() - headerHeight;

  //     if ( vScroll > headerHeight ){
  //       header.addClass('header--transformed');
  //     } else {
  //       header.removeClass('header--transformed');
  //     }

  //     if ( vScroll > heroHeight ){
  //       header.addClass('header--fixed');
  //     } else {
  //       header.removeClass('header--fixed');
  //     }
  //   }), 10);
  // }
  //Меняем на закрытый hamburger при клике по другому блоку
  $(document).on('click', function(e) {
    if (!$(e.target).closest(".header__logo").length) {
      $('.hamburger').removeClass('active');
    }
    e.stopPropagation();
  });
  // HAMBURGER TOGGLER
  $('.js-hamburger').on('click', function(){
    //$('.hamburger').addClass('active');
    //$('.mobile__menu').toggleClass('active');
    $('.hamburger').toggleClass('active');
    $('.ui.sidebar').sidebar('toggle');
  });

  $('.item.menu-close').on('click', function(){
    $('.hamburger').removeClass('active');
    $('.ui.sidebar').sidebar('toggle');
  });

  //////////
  // SLIDERS
  //////////

  function initSliders(){
    // $('.clients__slider').slick({
    //   autoplay: false,
    //   dots: false,
    //   arrows: true,
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   centerMode: true,
    //   variableWidth: true,
    //   prevArrow: '<button type="button" class="slick-prev"></button>',
    //   nextArrow: '<button type="button" class="slick-next"></button>',
    //  // fade: true,
    //   //cssEase: 'linear',
    //   responsive: [
    //     {
    //       breakpoint: 850,
    //       settings: {
    //         //autoplay: true,
    //         arrows: false
    //       }
    //     }
    //   ]
    // });
    var mySwiper = new Swiper ('.clients__wrapper', {
      // Optional parameters
      loop: true,
      centeredSlides: false,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 2000,
  
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        850: {
          // Pagination
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        }
      },
  
    });
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    // var startWindowScroll = 0;
    $('.promo-video__link').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
  
      fixedContentPos: true
    });

  }


  ////////////
  // UI
  ////////////

  // custom selects
  $('.ui-select__visible').on('click', function(e){
    var that = this
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
      if ( !$(val).is($(that)) ){
        $(val).parent().removeClass('active')
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function(){
    // parse value and toggle active
    var value = $(this).data('val');
    if (value){
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value);

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }

  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });

  // textarea autoExpand
  $(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });


  // Masked input
  function initMasks(){
    $(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////

  var monitorActive = false;
  function runScrollMonitor(){
    setTimeout(function(){

      // require
      if ( !monitorActive ){
        monitorActive = true;
        $('.wow').each(function(i, el){

          var elWatcher = scrollMonitor.create( $(el) );

          var delay;
          if ( $(window).width() < 768 ){
            delay = 0
          } else {
            delay = $(el).data('animation-delay');
          }

          var animationClass

          if ( $(el).data('animation-class') ){
            animationClass = $(el).data('animation-class');
          } else {
            animationClass = "wowFadeUp"
          }

          var animationName

          if ( $(el).data('animation-name') ){
            animationName = $(el).data('animation-name');
          } else {
            animationName = "wowFade"
          }

          elWatcher.enterViewport(throttle(function() {
            $(el).addClass(animationClass);
            $(el).css({
              'animation-name': animationName,
              'animation-delay': delay,
              'visibility': 'visible'
            });
          }, 100, {
            'leading': true
          }));
          elWatcher.exitViewport(throttle(function() {
            $(el).removeClass(animationClass);
            $(el).css({
              'animation-name': 'none',
              'animation-delay': 0,
              'visibility': 'hidden'
            });
          }, 100));
        });
      }

    },300);
  }

//Semantic UI

//SelectBox
  $('.lang.ui.dropdown')
    .dropdown({
      transition: 'fade'
    });

//Checkbox
  $('.ui.checkbox')
    .checkbox();
      
//Tabs filter
  $('#catalog__filter .menu .item')
    .tab({
      context: $('#catalog__filter')
    });

});

$(document).ready(function(){
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  }
  var validateHighlight = function(element) {
    $(element).parent('div').addClass("has-error");
  }
  var validateUnhighlight = function(element) {
    $(element).parent('div').removeClass("has-error");
  }
  var validateSubmitHandler = function(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
            $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  }

  var validatePhone = {
    required: true,
    normalizer: function(value) {
        var PHONE_MASK = '+X (XXX) XXX-XXXX';
        if (!value || value === PHONE_MASK) {
            return value;
        } else {
            return value.replace(/[^\d]/g, '');
        }
    },
    minlength: 11,
    digits: true
  }

  ////////
  // FORMS


  /////////////////////
  // REGISTRATION FORM
  ////////////////////
  $(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6,
      }
      // phone: validatePhone
    },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
      },
      password: {
          required: "Заполните это поле",
          email: "Пароль мимимум 6 символов"
      },
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });

});
