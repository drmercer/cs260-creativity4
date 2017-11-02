angular
.module('app')
.factory('Poller', function() {
  const DEFAULT_INTERVAL = 1100;

  function Poller(fn) {
    this._fn = fn;
    this._interval = DEFAULT_INTERVAL;
  }

  Poller.prototype = {
    setInterval: function(interval) {
      this._interval = interval;
    },

    start: function() {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => {
        Promise.resolve()
          .then(() => this._fn())
          .then(() => this.start()) // Set next interval
          .catch(err => this.onError(err));
      }, this._interval || DEFAULT_INTERVAL);
    },

    // Can be overridden
    onError: function(err) {
      console.error("Error in poller:", err);
    },

    stop: function() {
      clearTimeout(this._timeoutId);
    }
  };

  Poller.DEFAULT_INTERVAL = DEFAULT_INTERVAL;

  return Poller;
})
