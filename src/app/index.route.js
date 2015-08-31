(function() {
  'use strict';

  angular
    .module('cmmcMqttws')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('devices', {
        url: '/devices',
        templateUrl: 'app/devices/partials/devices.html',
        controller: 'devicesCtrl',
        controllerAs: 'devices'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
