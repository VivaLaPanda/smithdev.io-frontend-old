smithdev.directive('siteFooter', function($location, userFactory) {
    return {
        restrict: 'E',
        link: function($scope){
            console.log("Footer Linked");
        },
        templateUrl: 'app/views/directive/footer.html'
  };
});
