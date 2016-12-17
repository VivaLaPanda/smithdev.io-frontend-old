smithdev.directive('jumbotronDirective',['$location', '$route', function($location, $mdSidenav, $route) {
    return {
        restrict: 'E',
        link: function($scope, $timeout, attrs){
            console.log("Jumbotron Linked");
			
			$scope.title = attrs.title;
			$scope.subTitle = attrs.subtitle;
			$scope.image = attrs.imghref;
			$scope.isHome = false;
			
			if (attrs.ishome) {
				console.log("home exists", attrs.ishome);
				if (Boolean(attrs.ishome) == true) {
					$scope.isHome = true;
				}
			}
			
			console.log($scope.isHome);
        },
        templateUrl: 'app/views/directive/jumbotron.html'
  };
}]);
