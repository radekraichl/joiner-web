$(function ()
{
    // Jarallax init
    $('.jarallax').jarallax({
        speed: 0.01,
        imgSize: 'cover'
    });

    var j = $('.jarallax').first();

    console.log(j[0].jarallax.pureOptions);

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
});

// Fix flickering intro image
$('#hero-first-img').addClass('active');