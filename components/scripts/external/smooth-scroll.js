//*smooth scroll*
(function(e, t) {
    if (typeof define === "function" && define.amd) {
        define("smoothScroll", t(e))
    } else if (typeof exports === "object") {
        module.exports = t(e)
    } else {
        e.smoothScroll = t(e)
    }
})(this, function(e) {
    "use strict";
    var t = {};
    var n = !!document.querySelector && !!e.addEventListener;
    var r;
    var i = {
        speed: 500,
        easing: "easeInOutCubic",
        offset: 0,
        updateURL: true,
        callbackBefore: function() {},
        callbackAfter: function() {}
    };
    var s = function(e, t, n) {
        if (Object.prototype.toString.call(e) === "[object Object]") {
            for (var r in e) {
                if (Object.prototype.hasOwnProperty.call(e, r)) {
                    t.call(n, e[r], r, e)
                }
            }
        } else {
            for (var i = 0, s = e.length; i < s; i++) {
                t.call(n, e[i], i, e)
            }
        }
    };
    var o = function(e, t) {
        var n = {};
        s(e, function(t, r) {
            n[r] = e[r]
        });
        s(t, function(e, r) {
            n[r] = t[r]
        });
        return n
    };
    var u = function(e) {
        var t = String(e);
        var n = t.length;
        var r = -1;
        var i;
        var s = "";
        var o = t.charCodeAt(0);
        while (++r < n) {
            i = t.charCodeAt(r);
            if (i === 0) {
                throw new InvalidCharacterError("Invalid character: the input contains U+0000.")
            }
            if (i >= 1 && i <= 31 || i == 127 || r === 0 && i >= 48 && i <= 57 || r === 1 && i >= 48 && i <= 57 && o === 45) {
                s += "\\" + i.toString(16) + " ";
                continue
            }
            if (i >= 128 || i === 45 || i === 95 || i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122) {
                s += t.charAt(r);
                continue
            }
            s += "\\" + t.charAt(r)
        }
        return s
    };
    var a = function(e, t) {
        var n;
        if (e === "easeInQuad") n = t * t;
        if (e === "easeOutQuad") n = t * (2 - t);
        if (e === "easeInOutQuad") n = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        if (e === "easeInCubic") n = t * t * t;
        if (e === "easeOutCubic") n = --t * t * t + 1;
        if (e === "easeInOutCubic") n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        if (e === "easeInQuart") n = t * t * t * t;
        if (e === "easeOutQuart") n = 1 - --t * t * t * t;
        if (e === "easeInOutQuart") n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        if (e === "easeInQuint") n = t * t * t * t * t;
        if (e === "easeOutQuint") n = 1 + --t * t * t * t * t;
        if (e === "easeInOutQuint") n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
        return n || t
    };
    var f = function(e, t, n) {
        var r = 0;
        if (e.offsetParent) {
            do {
                r += e.offsetTop;
                e = e.offsetParent
            } while (e)
        }
        r = r - t - n;
        return r >= 0 ? r : 0
    };
    var l = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
    };
    var c = function(e) {
        return !e || !(typeof JSON === "object" && typeof JSON.parse === "function") ? {} : JSON.parse(e)
    };
    var h = function(e, t) {
        if (history.pushState && (t || t === "true")) {
            history.pushState({
                pos: e.id
            }, "", window.location.pathname + e)
        }
    };
    t.animateScroll = function(t, n, r, s) {
        var p = o(p || i, r || {});
        var d = c(t ? t.getAttribute("data-options") : null);
        p = o(p, d);
        n = "#" + u(n.substr(1));
        var v = document.querySelector("[data-scroll-header]");
        var m = v === null ? 0 : v.offsetHeight + v.offsetTop;
        var g = e.pageYOffset;
        var y = f(document.querySelector(n), m, parseInt(p.offset, 10));
        var b;
        var w = y - g;
        var E = l();
        var S = 0;
        var x, T;
        if (t && t.tagName.toLowerCase() === "a" && s) {
            s.preventDefault()
        }
        h(n, p.updateURL);
        var N = function(r, i, s) {
            var o = e.pageYOffset;
            if (r == i || o == i || e.innerHeight + o >= E) {
                clearInterval(s);
                p.callbackAfter(t, n)
            }
        };
        var C = function() {
            S += 16;
            x = S / parseInt(p.speed, 10);
            x = x > 1 ? 1 : x;
            T = g + w * a(p.easing, x);
            e.scrollTo(0, Math.floor(T));
            N(T, y, b)
        };
        var k = function() {
            p.callbackBefore(t, n);
            b = setInterval(C, 16)
        };
        if (e.pageYOffset === 0) {
            e.scrollTo(0, 0)
        }
        k()
    };
    t.init = function(e) {
        if (!n) return;
        r = o(i, e || {});
        var u = document.querySelectorAll("[data-scroll]");
        s(u, function(e) {
            e.addEventListener("click", t.animateScroll.bind(null, e, e.hash, r), false)
        })
    };
    return t
});