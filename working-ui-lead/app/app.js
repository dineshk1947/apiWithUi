// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

var app = angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'angular-loading-bar',  
  'ngResource',
  'ngTouch',
  'ngAnimate',
  'ngSanitize',
  'ui.select',
  'ui.grid',  
  'ngStorage',
  'ui.bootstrap',
  'ui.grid.exporter',
  'ui.grid.selection',
  'ui.grid.pagination',
  'ui.grid.moveColumns',
  'ui.grid.resizeColumns',
  'schemaForm',
  'angular-growl',
  'angularjs-dropdown-multiselect',
  'moment-picker',
  'ui.multiselect'
]).constant("apiUrl", {
  "dev": "http://127.0.0.1:8080/",
  "api":"http://localhost:3000/"
});
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);