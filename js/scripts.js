// lightgallery init
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

// set fade for hero carousel images
setHeroCarouselFadeTime(0.4);                                    // first fade
setTimeout(function () { setHeroCarouselFadeTime(2.4) }, 1);     // all the others (after the set time)

// this will set the fade time for the hero carousel images
function setHeroCarouselFadeTime(time)
{
    createCSSSelector
        ('.carousel-item', `transition: transform ${time}s ease-in-out`);
    createCSSSelector
        ('.carousel-fade .active.carousel-item-start', `transition: opacity 0s ${time}s`);
    createCSSSelector
        ('.carousel-fade .active.carousel-item-end', `transition: opacity 0s ${time}s`);
}

// this will create a new css rule
function createCSSSelector(selector, style)
{
    if (!document.styleSheets) return;
    if (document.getElementsByTagName('head').length == 0) return;

    var styleSheet, mediaType;

    if (document.styleSheets.length > 0)
    {
        for (var i = 0, l = document.styleSheets.length; i < l; i++)
        {
            if (document.styleSheets[i].disabled)
                continue;
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if (mediaType === 'string')
            {
                if (media === '' || (media.indexOf('screen') !== -1))
                {
                    styleSheet = document.styleSheets[i];
                }
            }
            else if (mediaType == 'object')
            {
                if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1))
                {
                    styleSheet = document.styleSheets[i];
                }
            }

            if (typeof styleSheet !== 'undefined')
                break;
        }
    }

    if (typeof styleSheet === 'undefined')
    {
        var styleSheetElement = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

        for (i = 0; i < document.styleSheets.length; i++)
        {
            if (document.styleSheets[i].disabled)
            {
                continue;
            }
            styleSheet = document.styleSheets[i];
        }

        mediaType = typeof styleSheet.media;
    }

    if (mediaType === 'string')
    {
        for (var i = 0, l = styleSheet.cssRules.length; i < l; i++)
        {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase())
            {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.insertRule(selector, style);
    }
    else if (mediaType === 'object')
    {
        var styleSheetLength = styleSheet.cssRules ? styleSheet.cssRules.length : 0;
        for (var i = 0; i < styleSheetLength; i++)
        {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase())
            {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
    }
}

// fix flickering intro image
const heroFirstImage = document.getElementById('hero-first-img');
heroFirstImage.className += ' active';