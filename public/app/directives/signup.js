
smithdev.directive('signup', function($location, userFactory) {
    return {
        restrict: 'E',
        transclude: true,
        link: function($scope){
            console.log("signup directive loaded");
        },
        templateUrl: 'app/views/directive/signup2.html'
  };
});
