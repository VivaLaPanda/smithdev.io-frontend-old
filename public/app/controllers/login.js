

smithdev.controller('LoginController', ['$scope', '$location', '$mdDialog', 'userFactory', 'utilityFactory', function($scope, $location, $mdDialog, userFactory, utilityFactory){
    console.log("login in control");
    $scope.data = { "email": "", "pass": ""};
	$scope.clickedSubmit = function(){
		console.log("clickedSubmit called");
        $scope.errorText = "";
		userFactory.loginUser($scope.data).then(
			function(result){
                console.log("xxxxxxxxxxxxxx login controller got the result! ", result );
                if(result.data.success){
					console.log("Successful login");
                    if(result.data.isadmin){
                        $scope.errorText = "valid login!";
                        $location.path("/admin");
                    } else {
                        $scope.errorText = "invalid!";
                        $location.path("/user/");
                    }
                }else{
                    $scope.errorText = "There was an error, please try again later";
                }
			},
            function(err){
                console.log(err);
				utilityFactory.showGenericApiError(err.data.message);
				return err;
            }
		);
	};
			
	$scope.forgotPassword = function () {
		$mdDialog.show(
			{
				parent : angular.element(document.querySelector('#popupContainer')),
				clickOutsideToClose : true,
				controller: dialogController,
				flex : "90",
				template :
					'<md-dialog>'+
						'<md-dialog-content><password-reset></password-reset></md-dialog-content>'+
					'</md-dialog>'
			}
		)
		.then(function(result) {
			$location.path("/")
		})
	}
	
	var dialogController = function ($scope, $mdDialog) {
		$scope.closeDialog = function() {
			// Easily hides most recent dialog shown...
			// no specific instance reference is needed.
			$mdDialog.hide();
		};
	}
	
}]);
