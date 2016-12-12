

smithdev.controller('SignUpController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory){
	console.log("signup in control");

    $scope.data = { "email": "", "pass": ""};
	$scope.clickedSubmit = function(){
		console.log("clickedSubmit called");
        //the endpoint is going to assume this happened
        if($scope.data.pass1 != $scope.data.pass2){
            return; 
        }else{
           $scope.data.pass = $scope.data.pass1;
        }
		userFactory.newUser($scope.data).then(
			function(result){
                console.log("new user success!", result);
                $location.path("login");
			}, function(err){
                console.log("new user error!", err);
            }
		);
	};
}]);
