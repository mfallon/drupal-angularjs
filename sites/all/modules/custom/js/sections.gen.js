'use strict'
;
// 2
var
 
sectionsControllers = angular.module(
'sectionsControllers'
, []);
  
sectionsControllers
  
.controller(
'sectionsCtrl'
, [
'$scope'
, 
'$http'
, 
'$location'
,
  
function
($scope, $http, $location) {
  
$http.get(
'/json/sections'
).success(
function
(result) {
  
$scope.sections = (
function
 
() {
  
return
 
result.taxonomy;
})();
});
}])
.controller(
'articlesCtrl'
, [
'$scope'
, 
'$routeParams'
, 
'$http'
, 
'$sce'
,
function
($scope, $routeParams, $http, $sce) {
$http.get(
'/json/'
 
+ $routeParams.tid + 
'/articles'
)
.success(
function
(result) {
$scope.renderHtml = 
function
 
(htmlCode) {
return
 
$sce.trustAsHtml(htmlCode);
};
$scope.articles = (
function
 
() {
return
 
result.node;
})();
});
}]);

// 1

var
 
sectionsApp = angular.module(
'sectionsApp'
, [
  
'ngRoute'
,
  
'ngSanitize'
,
  
'ngAnimate'
,
  
'sectionsDirectives'
,
  
'sectionsControllers'
  
]);
  
sectionsApp.config([
'$routeProvider'
,
  
function
($routeProvider) {
  
$routeProvider
  
.when(
'/'
, {
  
templateUrl: 
'/sites/all/modules/custom/sections/templates/sections.html'
,
  
controller: 
'sectionsCtrl'
})
.when(
'/section/:tid'
, {
templateUrl: 
'/sites/all/modules/custom/sections/templates/articles.html'
,
controller: 
'articlesCtrl'
})
.otherwise({
redirectTo: 
'/'
});
}]);
jQuery(document).ready(
function
() {
angular.bootstrap(document.getElementById(
'sections-app'
), [
'sectionsApp'
]);
});
