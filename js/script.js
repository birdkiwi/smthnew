new WOW().init();

function updateScrollMenu(){
    if( $(window).scrollTop() > $('#ideas').offset().top && !($('.main-header').hasClass('fixed'))){
        $('.main-header').addClass('fixed animated fadeInDown');
    } else if ($(window).scrollTop() < $('#ideas').offset().top){
        $('.main-header').removeClass('fixed animated fadeInDown');
    }
}

function showMobileMenu() {
    $('.mobile-menu').addClass('active');
    $('body').addClass('mobile-menu-push-right');

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
    $('body').removeClass('mobile-menu-push-right');

    $('[data-menu-toggler]').removeClass('active');
    $('.main-header-menu-toggler-bars').removeClass('rotate');
    $('.main-header-menu-toggler-close').removeClass('active');
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

    $('[data-slider-left]').click(function() {
        var slider = $(this).data('slider-left');
        var fotorama = $(slider).data('fotorama');
        fotorama.show('<');
        return false;
    });

    $('[data-slider-right]').click(function() {
        var slider = $(this).data('slider-right');
        var fotorama = $(slider).data('fotorama');
        fotorama.show('>');
        return false;
    });

    $('[data-slider-index]').click(function() {
        var index = +$(this).data('slider-index');
        var slider = $(this).data('slider');
        var fotorama = $(slider).data('fotorama');

        fotorama.show(index-1);
        return false;
    });

    $('#projects-slider').on('fotorama:showend', function (e, fotorama, extra) {
        console.log('active frame', fotorama.activeFrame.i);
        $('[data-slider-index]').removeClass('active');
        $('[data-slider-index="' + fotorama.activeFrame.i + '"]').addClass('active');
    });

    updateScrollMenu();
});

$(window).scroll(function () {
    updateScrollMenu();
});