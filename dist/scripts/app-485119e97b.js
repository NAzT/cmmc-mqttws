!function(){"use strict";angular.module("cmmcMqttws",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngMaterial"])}(),angular.module("cmmcMqttws").provider("mqttwsFactory",["$q",function(t){function e(){a=new Paho.MQTT.Client(n,o,"web_"+parseInt(100*Math.random(),10));var t={timeout:3,useSSL:c,cleanSession:l,onSuccess:function(){var t=u.connected||function(){};console.log("DEFAULT SUCCESS",arguments),t.call(null,arguments)},onFailure:function(t){console.log("failed"),setTimeout(e,i)}};null!=r&&(t.userName=r,t.password=s),a.connect(t),a.onMessageArrived=function(t){var e=t.destinationName,n=t.payloadString,o=u.message||function(){};o.apply(null,[e,n,t])}}console.log("mqttwsFactory");var n,o,a,c=!1,r=null,s=null,l=!0,i=2e3,u={};this.$get=function(){return function(t){console.log("OPTIONS:",t);var c={on:function(t,e){u[t]=e},addListener:function(){},subscribe:function(t,e){a?a.subscribe(t,e||{qos:0}):console.log("MQTT CONNECTION FAILED")},connect:function(){e()}};console.log("mqttwsFactory execute"),t=t||{},n=t.host||"128.199.104.122",o=t.port||9001;t.callback;return c}}}]),angular.module("cmmcMqttws").service("mqttService",function(){this.connect=function(t){console.log(t),userOnConnected=t.onSuccess||function(){},userOnMessageArrived=t.onMessageArrived||function(){},null!=mqtt&&mqtt.disconnect(),mqtt.onConnectionLost=function(t){setTimeout(MQTTconnect,reconnectTimeout),console.log("connection lost: "+t.errorMessage+". Reconnecting")},mqtt.onMessageArrived=function(t){t.destinationName,t.payloadString;userOnMessageArrived(t)}}}),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("cmmcMqttws").directive("acmeNavbar",t)}(),function(){"use strict";function t(t,e){function n(n){function a(t){return t.data}function c(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(o+"/contributors?per_page="+n).then(a)["catch"](c)}var o="https://api.github.com/repos/Swiip/generator-gulp-angular",a={apiHost:o,getContributors:n};return a}angular.module("cmmcMqttws").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,e,n){console.log(e),n.myName={},e.on("connected",function(){console.log("MQTT CONNECTED","IN CONTROLLR"),e.subscribe("esp8266/#")}),e.on("message",function(t,e){var o={};try{o=angular.fromJson(e)}catch(a){console.log("EX",a)}n.myName[o.d&&o.d.myName]=t,delete n.myName.undefined,n.payload=e,n.$apply()}),e.connect(),n.loadUsers=function(){var t=Object.keys(n.myName);n.users=t.map(function(t,e,n){return{id:e,name:t}})}}angular.module("cmmcMqttws").factory("myMqtt",["mqttwsFactory",function(t){var e={},n=t(e);return n}]).controller("MainController",t),t.$inject=["$timeout","myMqtt","$scope"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("cmmcMqttws").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.otherwise("/")}angular.module("cmmcMqttws").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("cmmcMqttws").constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}angular.module("cmmcMqttws").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("cmmcMqttws").run(["$templateCache",function(t){t.put("app/main/main.html",'<div layout="vertical" layout-fill="" layout-align="center"><md-content><header><md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">CMMC</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised" ng-click="">Choice</md-button><md-button href="#" class="md-raised">Text</md-button></section></md-toolbar></header><section class="jumbotron"><h1>{{ command }}</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br></p><section flex="" layout="row" layout-align="center"><md-button ng-click="enable(1)" href="#" class="md-raised">เปิด</md-button><md-button ng-click="enable(0)" href="#" class="md-raised">ปิด</md-button></section><section flex="" layout="row" layout-align="center"><input ng-model="sendText" type="text"></section><p class="lead">{{ sendText }}</p><p class="lead" ng-show="payload">{{ payload }}</p></section><section flex="" layout="row" layout-align="center"><md-select ng-model="user" md-on-open="loadUsers()" style="min-width: 200px;"><md-select-label>{{ user ? user.name : \'Filter\' }}</md-select-label><md-option ng-value="user" ng-repeat="user in users">{{user.name}}</md-option></md-select></section><section flex="" layout="row" layout-align="center"><input ng-model="myName[user.name]" type="text"><md-button ng-click="connect()" href="#" class="md-raised">connect</md-button></section><div layout="column" layout-align="center center" style="height: 100px;"><p class="md-caption">Selected: {{ user ? myName[user.name] : \'No one yet\' }}</p></div></md-content></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);