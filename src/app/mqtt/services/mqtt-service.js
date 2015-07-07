'use strict';
/**
 * @ngdoc service
 * @name cmmcMqttws.mqtt
 * @description
 * # mqtt
 * Service in the cmmcMqttws.
 */
angular.module('cmmcMqttws')
.service('mqttService', function () {
// AngularJS will instantiate a singleton by calling "new" on this function

    function onSuccess() {
        console.log('Connected to ' + host + ':' + port);
        userOnConnected(mqtt);
    }


    this.connect = function(callbackFn) {
        console.log(callbackFn);
        userOnConnected = callbackFn.onSuccess || function() { };
        userOnMessageArrived = callbackFn.onMessageArrived || function() { };

        if (mqtt != null) {
            mqtt.disconnect();
        }

        mqtt.onConnectionLost = function(response) {
            setTimeout(MQTTconnect, reconnectTimeout);
            console.log("connection lost: " + response.errorMessage + ". Reconnecting");
        };

        mqtt.onMessageArrived = function(message) {
            var topic = message.destinationName;
            var payload = message.payloadString;
            userOnMessageArrived(message);
        }
    }

  });
