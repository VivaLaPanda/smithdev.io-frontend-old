smithdev.directive('siteHeader',['$location', '$mdSidenav', '$route', 'userFactory', function($location, $mdSidenav, $route, userFactory) {
    return {
        restrict: 'E',
        link: function($scope, $timeout){
            console.log("Header Linked");
			
			// ************************
			// Logged in status handling
			// ************************
			
			$scope.ui = {loggedIn : false } //default behavior show "login"
        
			$scope.checkHeaderLogin = function(){
				console.log("Header checking login");
				userFactory.isLoggedIn()
				.then(function(isthey){
						$scope.ui.loggedIn = isthey;
						console.log("login result : ", isthey);
					}, function(err){
						console.log("login err", err);
					});
			}
			
			$scope.checkHeaderAdmin = function(){
				userFactory.checkAdmin().then(function(){
					console.log("We're an admin");
					$scope.ui.userIsAdmin = true;
				},function(err){
					console.log("Not an admin!");
					$scope.ui.userIsAdmin = false;
				});
			}
			
			
			userFactory.setLoginObserver($scope.checkHeaderLogin);
			userFactory.setAdminObserver($scope.checkHeaderAdmin);
			$scope.checkHeaderLogin();
			$scope.checkHeaderAdmin();
			
			$scope.logoutUser = function(){
				console.log("log out requested...");
				userFactory.logoutUser()
				.then(function(result){
					console.log("logout successful");
					$scope.checkHeaderLogin();
					$location.url("/login");
				});
			}
			
			// ************************
			// Everything Else
			// ************************
			
			// Exposing route so we can mark nav elements as active
			$scope.$route = $route;
			
			$scope.toggleLeft = buildToggler('left');
			$scope.toggleRight = buildToggler('right');

			function buildToggler(componentId) {
			  return function() {
				$mdSidenav(componentId).toggle();
			  }
			}
			
			$scope.ui.navLeftElements = [
				{
					'name' : "home",
					'text' : "Home",
					'href' : '/',
					'icon' : 'home'
				},
				{
					'name' : "blog",
					'text' : "Blog",
					'href' : '/blog',
					'icon' : 'subject'
				},
				{
					'name' : "projects",
					'text' : "Projects",
					'href' : '/project',
					'icon' : 'layers'
				},
				{
					'name' : "contact",
					'text' : "Contact",
					'href' : '/contact',
					'icon' : 'phone'
				}
				
			]
        },
        templateUrl: 'app/views/directive/header.html'
  };
}]);
