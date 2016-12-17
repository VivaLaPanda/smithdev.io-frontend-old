var smithdev = angular.module('smithdev', [
	'ngRoute',
	'ui.bootstrap',
	'ngMaterial',
	'ngAnimate',
	'ngMessages',
	'lfNgMdFileInput'
]);

smithdev.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('deep-orange');
});

smithdev.filter("trust", ['$sce', function($sce) {
	return function(htmlCode){
		console.log("Trusted HTML loaded")
		return $sce.trustAsHtml(htmlCode);
	}
}]);

'use strict';

