
smithdev.directive('passwordReset', function($location, $routeParams, userFactory) {
    return {
        restrict: 'E',
        transclude: true,
        link: function($scope, element, attrs){
            console.log("password reset in control ", $routeParams);

            $scope.resetcode = $routeParams.resetcode;

            $scope.complete = false;

            $scope.passwords = {
                email : undefined,
                passwordcode : $routeParams.resetcode,
                pass1 : undefined,
                pass2 : undefined
            };

            $scope.initiateReset = function(){
                console.log($scope.passwords);
                userFactory.initiateReset($scope.passwords)
                    .then(function(result){
                        $scope.complete = true;
                    });
            }

            $scope.performReset = function(){
                if($scope.passwords.pass1 == $scope.passwords.pass2){
                    $scope.passwords.pass = $scope.passwords.pass1;
                    userFactory.performReset($scope.passwords)
                        .then(function(result){
                            $scope.complete = true;
                        });
                }
            }

        },
        templateUrl: 'app/views/directive/passwordResetForm.html'
  };
});
