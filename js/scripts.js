// Lightgallery init
lightGallery(document.getElementById('light-gallery'), {
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
    scale: 1
});

// Set fade time
$(document).ready(function ()
{
    $("<style> .carousel-item { transition: opacity 3s ease-in-out } </style>").appendTo("head")
    $("<style> .carousel-fade .active.carousel-item-end { transition: opacity 0s 3s } </style>").appendTo("head")
    $("<style> .carousel-fade .active.carousel-item-start { transition: opacity 0s 3s } </style>").appendTo("head")
});

// Fix flickering intro image
const heroFirstImage = document.getElementById('hero-first-img');
heroFirstImage.className += ' active';
