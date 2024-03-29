
var userAgent = navigator.userAgent;

// Mobile device detection
var isMobile = (/Android|iPhone|iPad|iPod/i.test(userAgent));

// Android version detect
function getAndroidVersion() {
    var match = userAgent.toLowerCase().match(/android\s([0-9\.]*)/i);
    return match ? match[1] : undefined;
};

// Fuction to create --vh property
function createVH() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ---------- Navbar menu events ----------
// Opening
$('#navbarNavAltMarkup').on('show.bs.collapse', function () {
    $('nav').addClass('nav-color-dark');
    $('nav').removeClass('nav-color');
})

// Open
$('#navbarNavAltMarkup').on('shown.bs.collapse', function () { })

// Closing
$('#navbarNavAltMarkup').on('hide.bs.collapse', function () { })

// Close
$('#navbarNavAltMarkup').on('hidden.bs.collapse', function () {
    $('nav').addClass('nav-color');
    $('nav').removeClass('nav-color-dark');
})

// Jarallax init
if (parseInt(getAndroidVersion()) > 10 || getAndroidVersion() === undefined) {
    $('.jarallax').jarallax({
        speed: 0.3,
    });
}

// ---------- Document ready ----------
$(function () {
    // Lightgallery init
    lightGallery($('#light-gallery').get(0), {
        plugins: [lgThumbnail, lgFullscreen, lgZoom],
        licenseKey: 'your_license_key',
        getCaptionFromTitleOrAlt: false,
        startAnimationDuration: 300,
        hideBarsDelay: 5000,
        actualSize: true,
        fullScreen: true,
        counter: false,
        mode: 'lg-tube',
        speed: 500,
        zoom: true,
        scale: 1,
        mobileSettings: { controls: false, showCloseIcon: true, download: false, },
    });

    // If the device is mobile
    if (isMobile) {
        createVH();
        var width = $(window).width();
        $(window).resize(function () {
            // Only action on screen width change
            if ($(window).width() != width) {
                // Create --vh property
                createVH();
                width = $(window).width();
            }
        });
    }
    else {
        $(window).resize(function () {
            // Create --vh property
            createVH();
        });
    }

    // Fade in adn fade out scroll indicator on scroll 
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100)
            $('.scroll-indicator').css('opacity', 0);
        else
            $('.scroll-indicator').css('opacity', 1);
    });
});