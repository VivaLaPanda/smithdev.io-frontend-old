smithdev.directive('userPurchaseHistory', function(userFactory, utilityFactory, $filter) {
    return {
        restrict: 'E',
        link: function($scope){
			// Adding array summation method
			$scope.sum = function(items, prop, conditional, checker){
				//a always has to be returned in the function
				return items.reduce( function(a, b){
					if(checker){
						if(b[conditional]){
							return a + b[prop];
						}else{
							return a;
						}
					}else{
						if( ! b[conditional]){
							return a + b[prop];
						}else{
							return a;
						}
					}
				}, 0);
			};
	
			$scope.start = new Date();
			tempMoment = moment($scope.start).subtract(30, "d");
			$scope.start = tempMoment.toDate();
			$scope.end = new Date(Date.now());
		
            // Getting the list of all purchases
			$scope.getPurchaseList = function() {
				$scope.data = {"start" : $scope.start, "end" : $scope.end}
				console.log("Getting list of all purchases");
				// Calls the service to get the information for a course ID
				userFactory.getAllPurchases($scope.data)
					.then(function(result){
						console.log(result);
						$scope.certPurchaseList = result.data.certificates;
						$scope.giftCardPurchaseList = result.data.gift_cards;
						return $scope.certPurchaseList;
					}, function(err) {
						console.log(err);
						utilityFactory.showGenericApiError(err.data);
						return err;
					})
					.then(function(result) {
						$scope.getTotals();
					})
			}
			$scope.getPurchaseList();
			
			// Getting an object containing totals of various properties
			$scope.getTotals = function () {
				getCerificateTotals();
				getGiftCardTotals();
				
				$scope.totals.grandTotal = $scope.totals.certTotal + $scope.totals.giftCards;
			}
			
			var getCerificateTotals = function() {
				frontendFilter = $filter('filter');
				purchaseList = frontendFilter($scope.certPurchaseList);
				
				$scope.totals = { 'purchase_price' : 0, 'non_sale' : 0 };
				$scope.totals.purchase_price = $scope.sum(purchaseList, "purchase_price", "sale", true);
				$scope.totals.non_sale = $scope.sum(purchaseList, "purchase_price", "sale", false);
				$scope.totals.certTotal = $scope.totals.purchase_price + $scope.totals.non_sale;
				
				console.log("Totals:", $scope.totals);
			}
			
			var getGiftCardTotals = function() {
				giftCardList = $scope.giftCardPurchaseList;
				
				$scope.totals.giftCards = $scope.sum(giftCardList, "amount", "null_property", false);
			}
		},
		templateUrl: 'app/views/directive/userPurchaseHistory.html'
    }
});

smithdev.directive('userPersonalInfo', function(userFactory, $filter, $q, $location) {
    return {
        restrict: 'E',
        link: function($scope){
			$scope.ui = {
				infoGet : false
			}
			
			$scope.data = {
			  "userid": null,
			  "firstname": null,
			  "lastname": null,
			  "zip": null,
			  "gender": null,
			  "income": null,
			  "handicap": null,
			  "playid": null,
			  "homeowner": false,
			  "secondhome": false,
			  "education": null,
			  "maritalstatus": null,
			  "annualgolftrips": null,
			  "tripinnextyear": null,
			  "golftripfunds": null,
			  "course_id": null,
			  "annualequipmentcost": null,
			  "travelforgolf": null,
			  "annualgolftrip": null
			};

			$scope.display = {
				courseDisplayName : "none selected !",
				userToggle : false,
				updateMessage : "Update"
			}

			$scope.refreshInfo = function(){
				return userFactory.refreshUser().then(function(ret){
					console.log("got userinfo ", ret);
					$scope.data = ret.data[0];
					$scope.ui.infoGet = true;
					return ret.data;
				}, function(error){
					if(error.status == 401){
						$location.path("login");
					}
				});
			}

			$scope.updateUserInfo = function(){
				console.log("here's the data", $scope.data);
				$scope.display.updateMessage = "..."
				return userFactory.updateUser($scope.data)
					.then($scope.refreshInfo)
					.then($scope.loadCourseName)
					.then(function(res){ $scope.display.updateMessage = "Updated" });
			}

			$scope.loadCourseName = function(data){
				console.log(data);
				if(data.course_id == null){
					return $q.when("");
				}
				console.log("loading name for ", data.course_id);
				return courseFactory.refreshBaseByID(data.course_id).then(function(base){
					console.log("got result ", base);
					if(base.data[0].name){
						$scope.display.courseDisplayName = base.data[0].name;
						$scope.display.userToggle = false;
					}
					return data;
				});
			}

			$scope.courseSelected = function(course_id){
				console.log("course selected ", course_id);
				$scope.data.course_id = course_id;
				$scope.loadCourseName({ "course_id" : course_id });
			}
			$scope.refreshInfo().then($scope.loadCourseName);
		},
		templateUrl: 'app/views/directive/userPersonalInfo.html'
    }
});