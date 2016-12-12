
smithdev.directive('login', function($location, userFactory) {
    return {
        restrict: 'E',
        transclude: true,
        link: function($scope){
            console.log("login in control");
            $scope.data = { "email": "", "pass": ""};
	        $scope.clickedSubmit = function(){
		        console.log("clickedSubmit called");
                $scope.errorText = "";
		        userFactory.loginUser($scope.data).then(
			        function(result){
                        console.log("xxxxxxxxxxxxxx login controller got the result! ", result );
                        if(result.data.success){
                            if($scope.loginHandler){
                                $scope.loginHandler(true);
                            }
                        }else{
                            $scope.errorText = "There was an error, please try again later";
                        }
			        },
                    function(err){
                        $scope.errorText = err.data.message;
                    }
		        );
	        };
        },
        templateUrl: 'app/views/directive/login2.html'
  };
});
