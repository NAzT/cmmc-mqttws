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

   this.$get = ['mqttService', '$rootScope', '$timeout', function (mqttService, $rootScope, $timeout) {

    console.log("SERVICE", mqttService);

     return function socketFactory (options) {
        console.log("OPTIONS:", options);

        var wrappedSocket = {
            on: function() { },
            addListener: function() { },
            once: function() { } 
        }

        console.log("mqttwsFactory execute");
        options = options || {};
          var callback = {
              onMessageArrived: function(message) {
                  var topic = message.destinationName;
                  var payload = message.payloadString;
              },
              onSuccess: function(mqtt) {
                console.log("CONNECTION SUCCESS", mqtt);
              }
          }
        mqttService.connect(callback);
        return wrappedSocket;
      }
   }];


  });
