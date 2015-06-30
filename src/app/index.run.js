(function() {
  'use strict';

  angular
    .module('cmmcMqttws')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
