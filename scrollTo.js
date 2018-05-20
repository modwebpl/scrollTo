export let scrollTo = function (el, type = 1) {
  this.init(el, type);
};

scrollTo.prototype = {
  constructor: scrollTo,

  init: function (el, type) {
    var _this = this;

    if (!_this._setVars(el, type)) return;
    _this._setEvents(type);
  },

  _setVars: function (el, type) {
    var _this = this;

    _this._link = el;
    if (!_this._link) return;

    if (type === '0') {
      _this._attr = _this._link.getAttribute('href') || _this._link.getAttribute('data-id');

      _this._hash = document.getElementById(_this._attr);
      if (!_this._hash) return false;
    }

    scrollToPlugin;
    CSSPlugin;

    return true;
  },

  _setEvents: function (type) {
    var _this = this;

    if (type === '1') _this._scrollToID();
    else if (type === '0') _this._scrollToAll();
    else console.error('no scroll type set');

  },

  _scrollToAll: function () {
    var _this = this;

    each(_this._link, function (key, val) {
      val._elhs = val._elhs || {};

      val._elhs.click = function (e) {
        let hash = this.getAttribute('href') || this.getAttribute('data-id'),
          offY = this.getAttribute('data-offset-y') || '0',
          div = document.getElementById(hash);

        if (!div) return;
        TweenLite.killTweensOf(window);
        TweenLite.to(window, 1, {scrollTo: {y: hash, offsetY: offY, autoKill: true}, ease: Power3.easeInOut});

        e.preventDefault();
      };
      val.addEventListener('click', val._elhs.click);
    });
  },

  _scrollToID: function () {
    var _this = this,
      scrollEv = _this._link;

    scrollEv._elhs = scrollEv._elhs || {};
    scrollEv._elhs.click = function (e) {
      var offY = this.getAttribute('data-offset-y') || '0';

      TweenLite.killTweensOf(window);
      TweenLite.to(window, 1, {scrollTo: {y: _this._hash, offsetY: offY, autoKill: true}, ease: Power3.easeInOut});

      e.preventDefault();
    };
    _this._link.addEventListener('click', scrollEv._elhs.click);
  }
};
