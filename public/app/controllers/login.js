

smithdev.controller('LoginController', ['$scope', '$location', '$mdDialog', 'userFactory', 'utilityFactory', function($scope, $location, $mdDialog, userFactory, utilityFactory){
    console.log("login in control");
    $scope.data = { "email": "", "pass": ""};
	
	
	$scope.clickedSubmit = function(){
		console.log("clickedSubmit called");
        $scope.errorText = "";
		userFactory.loginUser($scope.data).then(
			function(result){
                console.log("Login controller got the result! ", result );
                if(result.data.success){
					console.log("Successful login");
                    if(result.data.isadmin){
                        $location.path("/admin");
                    } else {
                        $location.path("/user/");
                    }
                }else{
					utilityFactory.showGenericApiError("There was an error, please try again later");
                }
			},
            function(err){
                console.log("Login failed: ", err);
				
				$mdDialog.show(
					$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('Login Failed')
					.textContent(err.data.message)
					.ariaLabel('Invalid Login Prompt')
					.ok('Okay')
				);
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
		}, function(closed){
			// Don't do anything
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
