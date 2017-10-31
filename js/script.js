new WOW().init();

function updateScrollMenu(){
    if ( $(window).scrollTop() > $('.why-block').offset().top && !($('.main-header').hasClass('fixed'))){
        $('.main-header').addClass('fixed animated slideInDown');
    } else if ($(window).scrollTop() < $('.why-block').offset().top){
        $('.main-header').removeClass('fixed animated slideInDown');
    }
}

function showMobileMenu() {
    $('.mobile-menu').addClass('active');

    $('[data-menu-toggler]').addClass('active');
    $('.main-header-menu-toggler-bars').addClass('rotate');
    $('.main-header-menu-toggler-close').addClass('active');

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

    $('[data-menu-toggler]').removeClass('active');
    $('.main-header-menu-toggler-bars').removeClass('rotate');
    $('.main-header-menu-toggler-close').removeClass('active');
}

function showSpinner() {
    $('#spin-overlay').fadeIn('fast');
    setTimeout(function(){
        $('#spin-overlay').spin('large', '#3d3e45');
    }, 500);
}

function hideSpinner() {
    $('#spin-overlay').fadeOut('fast');
    setTimeout(function(){
        $('#spin-overlay').spin(false);
    }, 1500);
}

function fotoramaResize() {
    var slider = $('.projects-block-slider');
    var fotorama = $('#projects-slider').data('fotorama');
    fotorama.resize({
        width: '100%',
        height: slider.height() - 10
    });
}

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
                scrollTop: $( $.attr(this, 'href') ).offset().top - 100
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

    $('[data-menu-toggler]').click(function() {
        if ($(this).hasClass('active')) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }
        return false;
    });

    $('.mobile-menu a').click(function(){
        hideMobileMenu();
    });

    $('[data-slider-index]').click(function() {
        var index = +$(this).data('slider-index');
        var slider = $(this).data('slider');
        $(slider).slick('slickGoTo', index);

        return false;
    });

    /* Slick Sliders */
    function updateProjectsSliderColor(slick, slide) {
        var frame = $(slick.$slides[slide]).find('.projects-block-slider-item');
        var color = frame.data('color');

        $('.projects-block-slider').css({
            backgroundColor: color
        });
    }

    $('#projects-slider').on('init', function (e, slick) {
        console.log(slick);
        updateProjectsSliderColor(slick, 0);
    });

    $('#projects-slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        updateProjectsSliderColor(slick, nextSlide);
        $('[data-slider-index]').removeClass('active');
        $('[data-slider-index="' + nextSlide + '"]').addClass('active');
    });

    $(".js-slick-slider").slick();
    $(".js-solutions-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        variableWidth: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 610,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    updateScrollMenu();
});

$(window).scroll(function () {
    updateScrollMenu();
});