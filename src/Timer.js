(function(){
  'use strict';

  const EventEmitter = require('events').EventEmitter;
  const nextFrame = typeof window === 'undefined' ? setImmediate : window.requestAnimationFrame;
  const cancelFrame = typeof window === 'undefined' ? clearImmediate : window.cancelAnimationFrame;
  const secondPassed = (current, last) => {
    return Math.floor(current / 1000) !== Math.floor(last / 1000);
  };

  class Timer extends EventEmitter{
    constructor(current) {
      super();
      this.current = this._last = this._pivot = current ? current : 0;
      this.loop = () => {
        const passed = Date.now() - this._lastStarted;
        this.current = this._pivot + passed;
        super.emit('frame', {milliseconds: this.current});
        //if(Math.floor(this.current / 1000) !== Math.floor(this._last / 1000)){
        if(secondPassed(this.current, this._last)){
          super.emit('second', {milliseconds: this.current});
        }
        this._last = this.current;
        this.timeout = nextFrame(this.loop, 0);
      };
    }

    reset(offset){
      this.stop();
      this.current = offset ? offset : 0;
      super.emit('reset', {milliseconds: this.current});
    }

    start(){
      this._lastStarted = Date.now();
      super.emit('start', {milliseconds: this.current});
      this.timeout = nextFrame(this.loop, 0);
    }

    stop(){
      this._pivot = this.current;
      cancelFrame(this.timeout);
      super.emit('stop', {milliseconds: this.current});
    }
  }

  module.exports = Timer;
})();
