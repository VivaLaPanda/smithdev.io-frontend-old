smithdev.controller('BlogController', ['$scope', 'blogFactory', function($scope, blogFactory){
	console.log("Blog Controller now controlling");

	var refreshPosts = function() {
		blogFactory.allBlogPosts().then(function(result) {
			console.log("List of all blog posts:", result.data);
			$scope.blogPosts = result.data;
		},function(err) {
			console.log(err);
		});
	};
	
	var refreshCategories = function() {
		blogFactory.getCategories().then(function(result) {
			console.log("List of all categories:", result.data);
			$scope.categories = result.data;
		},function(err) {
			console.log(err);
		});
	};

	var onLoad = function() {
		refreshCategories();
		refreshPosts();
	};
	
	onLoad();
}]);
