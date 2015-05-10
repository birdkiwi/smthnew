$(document).on('click', '[data-version]', function() {
    localStorage.setItem('version', $(this).data('version'));
    window.location.reload();
    return false;
});

$(document).ready(function(){
    if ('ontouchstart' in window) {
        $('.change-version').show();
    }
    if (localStorage.getItem('version')) {
        var currentVersion = localStorage.getItem('version');
        if (currentVersion === 'full') {
            $('.change-version-mobile').show();
            $('.change-version-full').hide();
            $('meta[name=viewport]').attr('content', 'width=1024');
        } else if (currentVersion === 'mobile') {
            $('.change-version-mobile').hide();
            $('.change-version-full').show();
            $('meta[name=viewport]').attr('content', 'width=device-width');
        }
    }
});