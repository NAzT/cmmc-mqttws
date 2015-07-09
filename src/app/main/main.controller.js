(function() {
    'use strict';

    angular
        .module('cmmcMqttws')
        .factory("myMqtt", function(mqttwsFactory) {
            var options = {};

            var mySocket = mqttwsFactory(options);
            return mySocket;
        })
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, webDevTec, toastr, myMqtt, $scope) {
        console.log(myMqtt);

        $scope.myName = { };

        myMqtt.on('connected', function() {
            console.log("MQTT CONNECTED", "IN CONTROLLR");
            myMqtt.subscribe("esp8266/#");
        });

        myMqtt.on("message", function(topic, payload) {

            var json = { };
            try {
                json = angular.fromJson(payload);
            }
            catch(ex)
            {
               console.log("EX", ex); 
            }

            $scope.myName[json.d && json.d.myName] = topic;
            delete $scope.myName.undefined

            $scope.payload = payload;
            $scope.$apply();
        });

        myMqtt.connect();

        $scope.loadUsers = function() {
            var k = Object.keys($scope.myName);
            $scope.users = k.map(function(k, idx, val) {
                return { id: idx, name: k }
            });
        }

        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1435662498687;
        vm.showToastr = showToastr;

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
    }
})();
