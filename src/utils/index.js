export function debounce(func, delay) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        var context = this, args = arguments
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, delay)
    }
}