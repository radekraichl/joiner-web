function paralexMobileCheck()
{
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
function paralexDeprecatedBrowser()
{
    if ((navigator.userAgent.toLowerCase().indexOf("msie") !== -1) || (navigator.userAgent.toLowerCase().indexOf("wow64") !== -1))
    {
        return true;
    }
    return false;
}
// paralex javascript
// variables to hold each section's settings based on section style
var paralexPercentDisplayHeight = [];
var paralexBackgroundPercentAdjust = [];
var paralexBackgroundSpeed = [];
var paralexBackgroundWidth = [];
var paralexBackgroundHeight = [];
var paralexBackgroundProportion = [];
var paralexBackgroundResized = [];
var paralexIsMobile = paralexMobileCheck();
var paralexDeprecated = paralexDeprecatedBrowser();
var paralexResizeEvent = false;
// paralexMove
// calculates the background image height and top position based on section's styles
function paralexMove()
{
    var $ = jQuery;
    $(".paralex .foreground").each(function (i)
    {
        var top_of_element = $(this).offset().top;
        var top_of_screen = $(window).scrollTop();
        var height_of_viewport = paralexIsMobile ? screen.height : window.innerHeight;
        var min_height_of_element = height_of_viewport * paralexPercentDisplayHeight[i];
        $(this).css("min-height", min_height_of_element + "px");
        $(this).parent(".paralex").css("min-height", min_height_of_element + "px");
        var height_of_element = $(this).outerHeight();
        var width_of_element = $(this).outerWidth();
        var height_of_background = height_of_element * paralexBackgroundPercentAdjust[i];
        var bottom_of_element = top_of_element + height_of_element;
        var bottom_of_screen = top_of_screen + height_of_viewport;
        var bg_size = "";
        var fixed_background_height = 0;
        var backgroundPercentTopAdjust = 0;
        var backgroundMinHeight = 0;
        var effect_scroll_distance = 0;
        var onScreen = ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element));
        var resetTriggered = paralexBackgroundResized.includes(-1);
        if (onScreen || resetTriggered)
        {
            var paralexFixed = false;
            if ($(this).parent(".paralex").hasClass("reverse"))
            {
                if ($(this).parent(".paralex").hasClass("full"))
                {
                    effect_scroll_distance = height_of_background;
                    backgroundMinHeight = height_of_element;
                } else
                {
                    effect_scroll_distance = height_of_viewport - height_of_element;
                    backgroundMinHeight = height_of_background;
                }
                backgroundPercentTopAdjust = ((top_of_screen - top_of_element) / effect_scroll_distance) * (height_of_background - height_of_element);
                fixed_background_height = height_of_background;
            } else
                if ($(this).parent(".paralex").hasClass("fixed"))
                {
                    backgroundPercentTopAdjust = top_of_screen - top_of_element;
                    backgroundMinHeight = height_of_viewport;
                    fixed_background_height = height_of_viewport;
                    paralexFixed = true;
                } else
                {
                    backgroundPercentTopAdjust = -1 * (height_of_element) * (paralexPercentDisplayHeight[i] * (bottom_of_screen - top_of_element) / ((bottom_of_screen - top_of_element) + (bottom_of_element - top_of_screen)) * paralexBackgroundSpeed[i]);
                    backgroundMinHeight = height_of_background;
                    fixed_background_height = height_of_background;
                }
            if (!paralexBackgroundResized.includes(i) || resetTriggered)
            {
                if (paralexBackgroundProportion[i] > (width_of_element / fixed_background_height))
                {
                    bg_size = "auto " + fixed_background_height + "px";
                } else
                {
                    bg_size = width_of_element + "px auto";
                }
                $(this).siblings(".background")
                    .css("min-height", backgroundMinHeight + "px")
                    .css("background-size", bg_size);
                paralexBackgroundResized.push(i);
            }
            if (!paralexFixed && onScreen)
            {
                $(this).siblings(".background").css("top", backgroundPercentTopAdjust + "px");
            }
        } else
        {
            if (paralexBackgroundResized.includes(i))
            {
                paralexBackgroundResized.splice(paralexBackgroundResized.indexOf(i), 1);
            }
        }
    });
    if (paralexBackgroundResized.includes(-1))
    {
        paralexBackgroundResized.splice(paralexBackgroundResized.indexOf(-1), 1);
    }
}

// paralexHeight
// sets paralex variables for each background image
function paralexHeight()
{
    var urlRegex = /url\(['"]*(.*?)['"]*\)/g;
    jQuery(".paralex .foreground").each(function (i)
    {
        if (jQuery(this).parent(".paralex").hasClass("full"))
        {
            paralexPercentDisplayHeight[i] = 1;
            if (jQuery(this).parent(".paralex").hasClass("slow"))
            {
                paralexBackgroundSpeed[i] = 0.2;
                paralexBackgroundPercentAdjust[i] = 1.2;
            } else
                if (jQuery(this).parent(".paralex").hasClass("fast"))
                {
                    paralexBackgroundSpeed[i] = 0.5;
                    paralexBackgroundPercentAdjust[i] = 1.5;
                } else
                { // default medium speed
                    paralexBackgroundSpeed[i] = 0.3;
                    paralexBackgroundPercentAdjust[i] = 1.3;
                }
            jQuery(this).siblings(".background").css("background-size", "auto 100%");
        } else
            if (jQuery(this).parent(".paralex").hasClass("half"))
            {
                paralexPercentDisplayHeight[i] = 0.5;
                if (jQuery(this).parent(".paralex").hasClass("slow"))
                {
                    paralexBackgroundSpeed[i] = 0.5;
                    paralexBackgroundPercentAdjust[i] = 1.25;
                } else
                    if (jQuery(this).parent(".paralex").hasClass("fast"))
                    {
                        paralexBackgroundSpeed[i] = 1;
                        paralexBackgroundPercentAdjust[i] = 1.5;
                    } else
                    { // default medium speed
                        paralexBackgroundSpeed[i] = 0.7;
                        paralexBackgroundPercentAdjust[i] = 1.35;
                    }
            } else
            {  // default: 1/3 screen size
                paralexPercentDisplayHeight[i] = 0.3;
                if (jQuery(this).parent(".paralex").hasClass("slow"))
                {
                    paralexBackgroundSpeed[i] = 0.6;
                    paralexBackgroundPercentAdjust[i] = 1.2;
                } else
                    if (jQuery(this).parent(".paralex").hasClass("fast"))
                    {
                        paralexBackgroundSpeed[i] = 2;
                        paralexBackgroundPercentAdjust[i] = 1.6;
                    } else
                    { // default medium speed
                        paralexBackgroundSpeed[i] = 1;
                        paralexBackgroundPercentAdjust[i] = 1.3;
                    }
            }
        if (jQuery(this).parent(".paralex").hasClass("fixed") && paralexDeprecated)
        {
            jQuery(this).parent(".paralex").removeClass("fixed");
        }
        // This will resize an image onload to avoid jumps and tiling.
        var backgroundObject = jQuery(this).siblings(".background");
        var img = new Image();
        img.src = backgroundObject.css("background-image").replace(urlRegex, "$1");
        var backgroundImage = backgroundObject.css("background-image");
        var backgroundOpacity = backgroundObject.css("opacity");
        backgroundObject.css("background-color", "gray").css("background-image", "linear-gradient(145deg, #0098db, #0098db, #0098db, #0098db, #0098db, #ffa02f, #fcd900, #00c7b2, #007b69)").css("opacity", "0.3");
        img.onload = function ()
        {
            backgroundObject.css("background-image", backgroundImage).css("opacity", backgroundOpacity).fadeIn();
            paralexBackgroundWidth[i] = this.width;
            paralexBackgroundHeight[i] = this.height;
            paralexBackgroundProportion[i] = this.width / this.height;
            paralexBackgroundResized = [];
            paralexMove();
            img = null;
        };
    });
}

paralexHeight();
paralexMove();

function paralexReset()
{
    paralexBackgroundResized = [];
    paralexMove();
}
jQuery(window).scroll(function ()
{
    paralexMove();
});
jQuery(window).resize(function ()
{
    if (!paralexIsMobile)
    {
        paralexReset();
    } else
    {
        paralexMove();
    }
    paralexResizeEvent = true;
});
jQuery(window).on("orientationchange", function ()
{
    paralexReset();
    paralexResizeEvent = true;
});
// resizes all background images away from the scroll and resize events to increase performance.
jQuery(window).on("mouseover", function ()
{
    if (paralexResizeEvent)
    {
        paralexResizeEvent = false;
        paralexBackgroundResized = [-1];
        paralexMove();
    }
});
