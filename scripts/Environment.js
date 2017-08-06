// Cross Browser requestAnimationFrame compatibility.
// @link http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
export function requestAnimFrame() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}

// Check user agent device type.
// @link http://stackoverflow.com/a/16755700/1718162
export default {
    //mobile or desktop compatible event name, to be used with '.on' function
    TOUCH_DOWN_EVENT_NAME: 'mousedown touchstart',
    TOUCH_UP_EVENT_NAME: 'mouseup touchend',
    TOUCH_MOVE_EVENT_NAME: 'mousemove touchmove',
    TOUCH_DOUBLE_TAB_EVENT_NAME: 'dblclick dbltap',

    isAndroid: function () {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isIOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function () {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
    }
};