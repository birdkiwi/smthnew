new WOW().init();

$(document).ready(function(){
    $(".js-validate").each(function(){
        $(this).validate({
            errorPlacement: function(error, element) {},
            highlight: function(element, errorClass, validClass) {
                if ($(element).parent().hasClass('form-control')) {
                    $(element).parent().addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if ($(element).parent().hasClass('form-control')) {
                    $(element).parent().removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        });
    });

    $('.welcome-block-iphone').bgLoaded({
        afterLoaded : function() {
            $(this).addClass('animated bounceInDown');
        }
    });

    $('.form-control > input, .form-control > textarea').on("focus blur", function() {
        if ($(this).is(":focus")) {
            $(this).parent().addClass('has-focus');
        } else {
            $(this).parent().removeClass('has-focus');
        }
    });

    $('.js-custom-file-input').on("focus blur change", function() {
        var filename = $(this).val();
        var title = $(this).siblings('.input-file-title').data('custom-input-file-default-title');
        var subtitle = $(this).siblings('.input-file-subtitle');

        if (filename != '') {
            if (filename.length > 25) {
                filename = filename.substr(0,25) + '...';
            }
            $(this).siblings('.input-file-title').html(filename);
            subtitle.animate({opacity: 0}, 300);
        } else {
            $(this).siblings('.input-file-title').html(title);
            subtitle.animate({opacity: 1}, 300);
        }
    });

    $('.js-smooth-scroll').click(function() {
        history.pushState(null, null, $(this).attr('href'));
        var elementId = window.location.hash;
        if ($(elementId).length > 0) {
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - 10
            }, 700);
        } else {
            //console.log('no element!');
        }
        return false;
    });

    $("#welcome-block-title-type").typed({
        typeSpeed: 100,
        loop: true,
        startDelay: 3000,
        backDelay: 2000,
        strings: $("#welcome-block-title-type").data("typed-words").split(",")
    });

    function showMobileMenu() {
        $('.mobile-menu').addClass('active');
        $('body').addClass('mobile-menu-push-right');

        $('[data-menu-toggler]').addClass('active');
        $('.main-header-menu-toggler-bars').toggleClass('rotate');
        $('.main-header-menu-toggler-close').toggleClass('active');

        function hideEvent(e) {
            if(!$(e.target).closest('.mobile-menu').length) {
                hideMobileMenu();
                $(document).off('click', 'body', hideEvent);
            }
        }

        $(document).on('click', 'body', hideEvent);
    }

    function hideMobileMenu() {
        $('.mobile-menu').removeClass('active');
        $('body').removeClass('mobile-menu-push-right');

        $('[data-menu-toggler]').removeClass('active');
        $('.main-header-menu-toggler-bars').toggleClass('rotate');
        $('.main-header-menu-toggler-close').toggleClass('active');
    }

    $('[data-menu-toggler]').click(function() {
        if ($(this).hasClass('active')) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }
        return false;
    });
});

$(window).scroll(function () {
    if( $(window).scrollTop() > $('#process').offset().top && !($('.main-header').hasClass('fixed'))){
        $('.main-header').addClass('fixed animated fadeInDown');
    } else if ($(window).scrollTop() < $('#process').offset().top){
        $('.main-header').removeClass('fixed animated fadeInDown');
    }
});