(function(){
  'use strict';
  const assert = require('power-assert');
  const Timer = require('..');

  describe('Timer', function(){
    describe('on', function(){
      it('can subscribe event', (done) => {
        const timer = new Timer(); // init with default values
        timer.on('second', data =>{
          assert(true);
          done();
        });
        timer.start();
      });
    });
  });
})();
