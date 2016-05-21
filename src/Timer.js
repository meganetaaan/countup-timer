(function(){
  'use strict';

  const EventEmitter = require('events').EventEmitter;
  const nextFrame = typeof window === 'undefined' ? setImmediate : window.requestAnimationFrame;
  const cancelFrame = typeof window === 'undefined' ? clearImmediate : window.cancelAnimationFrame;
  class Timer extends EventEmitter{
    constructor(current) {
      super();
      this.current = this._last = this._pivot = current ? current : 0;
      this.loop = () => {
        const passed = Date.now() - this._lastStarted;
        this.current = this._pivot + passed;
        if(Math.floor(this.current / 1000) !== Math.floor(this._last / 1000)){
          super.emit('second', this.current);
        }
        this._last = this.current;
        this.timeout = nextFrame(this.loop, 0);
      };
    }

    _secondPassed(current, last){
      return Math.floor(current / 1000) !== Math.floor(last / 1000);
    }

    reset(offset){
      this.stop();
      this.current = offset ? offset : 0;
      super.emit('reset');
    }

    start(){
      this._lastStarted = Date.now();
      this.timeout = nextFrame(this.loop, 0);
      super.emit('start');
    }

    stop(){
      this._pivot = this.current;
      cancelFrame(this.timeout);
      super.emit('stop');
    }
  }

  module.exports = Timer;
})();

