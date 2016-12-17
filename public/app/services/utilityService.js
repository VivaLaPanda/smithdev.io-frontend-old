smithdev.factory('utilityFactory', [ '$http', '$mdDialog', function($http, $q, $mdDialog){
    states = undefined;

    var baseurl = "https://api.smithdev.io";
	
	var refreshStates = function(){
		console.log("Fetching list of states");
		return $http.get('app/services/stateLookup.json')
		.then(function(result){
            states = result;
            return states;
        }, function(err){
            console.log("Failed to load list of states:", err);
			throw err;
        });
    }
	
    var getStates = function(){
        if(states == undefined){
            return refreshStates();
        }else{
            return $q.when(states);
        }
	};
	
	// Showing an error
	var showGenericApiError = function(err) {
		// Appending dialog to document.body to cover sidenav in docs app
		// Modal dialogs should fully cover application
		// to prevent interaction outside of dialog
		console.log("Attempting to show mdDialog for error:", err);
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Error')
				.textContent("An error occured while communicating with the api: "+JSON.stringify(err))
				.ariaLabel('Error has Occured')
				.ok('Continue')
		);
	};
	
	
	return {
        refreshStates : refreshStates,
		getStates : getStates,
		showGenericApiError : showGenericApiError
	};
}]);
