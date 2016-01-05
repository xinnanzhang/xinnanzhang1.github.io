var huyinghuan = angular.module("huyinghuan.io",
	['ngRoute','pascalprecht.translate']);

//配置 多国语言
huyinghuan.config(function($translateProvider) {
  	$translateProvider.translations('en_US',en_US).translations('zh_CN', zh_CN);
  	$translateProvider.preferredLanguage('zh_CN');
});


huyinghuan.controller('navigationTopCtrl',['$scope','$location', '$translate', function($scope,$location,$translate) {
  $scope.setLang = function(langKey) {
    // You can change the language during runtime
    $translate.use(langKey);
  };
  $scope.language = $translate('language');
  $scope.languages = [{key:"en_US",value:"English"},{key:"zh_CN",value:"中文"}];
  $scope.isActive =function(viewLocation){
    return viewLocation == $location.path();
  }
}]);

huyinghuan.controller('navigationSideCtrl',['$scope','$location', function($scope,$location) {
  $scope.isActive =function(viewLocation){
    return viewLocation == $location.path();
  }
}]);

huyinghuan.controller('aboutmeCtrl',['$scope',function($scope){
    $scope.websites = PersonalData.getFavoriteWebsite();
    $scope.projects = PersonalData.getSkillDataOfProject();
}])

//自定义指令
huyinghuan.directive('ioTopnavbar',function(){ //顶部导航栏
        return {
            restrict: 'E',
            templateUrl: 'nav-top.html'
        };
    });
//配置路由
huyinghuan.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/about-me',{
            templateUrl: 'about-me.html',
            controller:'aboutmeCtrl'
        })
        .when('/contact',{
            templateUrl: 'contact.html'
        })
  }]);