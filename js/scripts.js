// Mobile device detection
var isMobile = (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// Create --vh property
function createVH() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Fix flickering intro image
$('#hero-first-img').addClass('active');

// Document ready
$(function () {
    // Jarallax init
    $('.jarallax').jarallax({
        speed: 0.2,
        disableParallax: /iPad|iPhone|iPod|Android/,
    });

    // Set carousel fade time
    $('<style> .carousel-item { transition: opacity 3s ease-in-out } </style>').appendTo('head');
    $('<style> .carousel-fade .active.carousel-item-end { transition: opacity 0s 3s } </style>').appendTo('head');
    $('<style> .carousel-fade .active.carousel-item-start { transition: opacity 0s 3s } </style>').appendTo('head');

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
    });

    createVH();

    if (isMobile) {
        $(window).on("orientationchange", () => {
            $(() => {
                createVH();
            });
        });
    }
    else {
        $(window).on("resize", () => {
            createVH();
        });
    }
});
