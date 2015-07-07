'use strict';

/**
 * @ngdoc service
 * @name cmmcMqttws.mqttwsFactory
 * @description
 * # mqttwsFactory
 * Provider in the cmmcMqttws.
 */
angular.module('cmmcMqttws')
  .provider('mqttwsFactory', function () {
    console.log("mqttwsFactory")
    // Method for instantiating

   this.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {
     return function socketFactory (options) {
        console.log("OPTIONS:", options);

        var wrappedSocket = {
            on: function() { },
            addListener: function() { },
            once: function() { } 
        }

        console.log("mqttwsFactory execute");
        options = options || {};

        return wrappedSocket;
      }
   }];


  });
