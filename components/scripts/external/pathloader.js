/**
 * pathLoader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function(e) {
    "use strict";

    function t(e) {
        this.el = e;
        this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength()
    }
    t.prototype._draw = function(e) {
        this.el.style.strokeDashoffset = this.el.getTotalLength() * (1 - e)
    };
    t.prototype.setProgress = function(e, t) {
        this._draw(e);
        if (t && typeof t === "function") {
            setTimeout(t, 200)
        }
    };
    t.prototype.setProgressFn = function(e) {
        if (typeof e === "function") {
            e(this)
        }
    };
    e.PathLoader = t
})(window);