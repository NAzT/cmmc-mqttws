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

        var host;
        var port;
        var useTLS = false;
        var username = null;
        var password = null;
        var cleansession = true;

        var onSuccess;
        var mqtt;
        var reconnectTimeout = 2000;
        var events = { };

        function MQTTconnect() {
                mqtt = new Paho.MQTT.Client(host, port, "web_" + parseInt(Math.random() * 100, 10));

                var options = {
                        timeout: 3,
                        useSSL: useTLS,
                        cleanSession: cleansession,
                        onSuccess: function() {
                            var ev = events.connected || function() { };
                            console.log("DEFAULT SUCCESS", arguments);
                            ev.call();
                        },
                        onFailure: function (message) {
                                console.log("failed");
                                setTimeout(MQTTconnect, reconnectTimeout);
                        }
                };

                if (username != null) {
                        options.userName = username;
                        options.password = password;
                }

                mqtt.connect(options);
                mqtt.onMessageArrived = function(message) {
                        var topic = message.destinationName;
                        var payload = message.payloadString;

                        var ev = events.message || function() { };
                        ev.apply(null, [topic, payload, message]);
                }
        }

        this.$get = function () {
            return function socketFactory (options) {
                 console.log("OPTIONS:", options);

                 var wrappedSocket = {
                         on: function(event, func) {
                             events[event] = func;
                         },
                         addListener: function() { },
                         subscribe: function(topic, opts) {
                            if (mqtt) {
                                mqtt.subscribe(topic, opts || { qos: 0 });
                            }
                            else {
                                console.log("MQTT CONNECTION FAILED");
                            }
                         },
                         connect: function() {
                                MQTTconnect();
                         }
                 };

                 console.log("mqttwsFactory execute");
                 options = options || {};

                 host = options.host || '128.199.104.122';
                 port = options.port || 9001;

                 var callback = options.callback;


                 return wrappedSocket;
             };
        };


    });
