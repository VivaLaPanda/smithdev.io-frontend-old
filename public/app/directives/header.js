smithdev.directive('siteHeader', function($location, userFactory) {
    return {
        restrict: 'E',
        link: function($scope){
            console.log("Header Linked");
        },
        templateUrl: 'app/views/directive/header.html'
  };
});
