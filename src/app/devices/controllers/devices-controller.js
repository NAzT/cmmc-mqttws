'use strict';
/**
 * @ngdoc function
 * @name cmmcMqttws.controller:devicesCtrl
 * @description
 * # devicesCtrl
 * Controller of the cmmcMqttws
 */
angular.module('cmmcMqttws')
.factory("devicesMqtt", function(mqttwsFactory) {
    var options = {};

    var mySocket = mqttwsFactory(options);
    return mySocket;
})
.controller('devicesCtrl', function ($scope, devicesMqtt) {
	$scope.devices = { };
	devicesMqtt.on('connected', function() {
	    console.log("MQTT CONNECTED", "IN CONTROLLR");
	    devicesMqtt.subscribe("esp8266/+/status");
	});

	devicesMqtt.on("message", function(topic, payload) {
		var payload = JSON.parse(payload);
		$scope.devices[payload.d.id] = payload;
		$scope.devices[payload.info && payload.info.id] = payload;
		delete $scope.devices.undefined
		$scope.$apply();
	});


	devicesMqtt.connect();

});
