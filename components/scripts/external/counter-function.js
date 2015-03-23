// #
// # Just a little counter function by je. Minified and beautified for security reasons.
// #

(function(e) {
    e.fn.countTo = function(t) {
        t = e.extend({}, e.fn.countTo.defaults, t || {});
        var n = Math.ceil(t.speed / t.refreshInterval),
            r = (t.to - t.from) / n;
        return e(this).each(function() {
            function a() {
                o += r;
                s++;
                e(i).html(o.toFixed(t.decimals));
                if (typeof t.onUpdate == "function") {
                    t.onUpdate.call(i, o)
                }
                if (s >= n) {
                    clearInterval(u);
                    o = t.to;
                    if (typeof t.onComplete == "function") {
                        t.onComplete.call(i, o)
                    }
                }
            }
            var i = this,
                s = 0,
                o = t.from,
                u = setInterval(a, t.refreshInterval)
        })
    };
    e.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    }
})(jQuery);