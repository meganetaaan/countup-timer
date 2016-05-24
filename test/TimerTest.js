(function(){
  'use strict';
  const assert = require('power-assert');
  const Timer = require('../lib/Timer');

  describe('Timer', ()=>{
    describe('constructor', ()=>{
      let timer;
      it('should set offset time', () => {
        const offset = 1000;
        timer = new Timer(offset);
        assert(timer.current === offset);
      })
    });
    describe('eventEmitter', function(){
      let timer;
      this.timeout(5000);

      it('should emit frame event', done=>{
        let done_called = false;
        timer = new Timer();
        timer.on('frame', data=>{
          if(!done_called){
            assert(typeof data.milliseconds !== 'undefined');
            done_called = true;
            done();
          }
        });
        timer.start();
      });
      it('should emit second event', done=>{
        timer = new Timer();
        timer.on('second', data =>{
          assert(typeof data.milliseconds !== 'undefined');
          done();
        });
        timer.start();
      });
      it('should emit start event', done=>{
        timer = new Timer();
        timer.on('start', data =>{
          assert(true);
          done();
        });
        timer.start();
      });
      it('should emit stop event', done=>{
        timer = new Timer();
        timer.on('stop', data =>{
          assert(true);
          done();
        });
        timer.start();
        timer.stop();
      });
      it('should emit reset event', done=>{
        timer = new Timer();
        timer.on('reset', data =>{
          assert(true);
          done();
        });
        timer.start();
        timer.stop();
        timer.reset();
      });
    });
    /*
    describe('start', ()=>{
    });
    describe('stop', ()=>{
    });
    describe('stop', ()=>{
    });
    */
    describe('reset', ()=>{
      let timer;

      beforeEach(()=>{
        timer = new Timer();
      });
      it('should set offset time', () => {
        const offset = 1000;
        timer.reset(offset);
        assert(timer.current === offset);
      })
    });
  });
})();
