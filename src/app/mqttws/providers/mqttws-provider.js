'use strict';

/**
 * @ngdoc service
 * @name cmmcMqttws.mqttws
 * @description
 * # mqttws
 * Provider in the cmmcMqttws.
 */
angular.module('cmmcMqttws')
  .provider('mqttws', function () {
// Private variables
    var salutation = 'Hello';
// Private constructor
    function Greeter() {
      this.greet = function () {
        return salutation;
      };
    }
// Public API for configuration
    this.setSalutation = function (s) {
      salutation = s;
    };
// Method for instantiating
    this.$get = function () {
      return new Greeter();
    };
  });
