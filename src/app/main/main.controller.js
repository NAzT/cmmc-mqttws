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
  function MainController($timeout, webDevTec, toastr, myMqtt) {
    console.log(myMqtt);

    myMqtt.on('connected', function() {
      console.log("MQTT CONNECTED", "IN CONTROLLR");
      myMqtt.subscribe("#");
    });

    myMqtt.on("message", function(topic, payload) {
      console.log("ON MESSSAGE", topic, payload);
    });

    myMqtt.connect();
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
