smithdev.controller('AdminController', ['$scope', 'adminFactory', 'blogFactory', function($scope, adminFactory, blogFactory){
	console.log("AdminController now controlling");
	
	$scope.newPostMode = false;
	
	$scope.addCategory = function(categoryName) {
		data = {
			name : categoryName
		};
		
		adminFactory.makeNewCategory(data).then(function(result) {
			console.log(result);
			
			$scope.categories = result.data;
		},function(err) {
			console.log(err);
		});
	};
	
	$scope.removeCategory = function(categoryID) {
		data = {
			categoryID : categoryID
		};
		
		adminFactory.removeCategory(data).then(function(result) {
			console.log(result);
			
			$scope.categories = result.data;
		},function(err) {
			console.log(err);
		});
	};
	
	$scope.setCurrentPost = function(post) {
		$scope.currentPost = post;
	}
	
	$scope.makeNewPost = function() {
		$scope.newPostMode = true;
		
		$scope.currentPost = {};
	}
	
	$scope.deletePost = function(post) {
		data = {
			postID : post.postID
		};
		
		adminFactory.deleteBlogPost(data).then(function(result) {
			console.log(result);
			
			$scope.blogPosts = result.data;
		},function(err) {
			console.log(err);
		});
	};
	
	$scope.modifyBlogPost = function() {
		/**********************
		FEATURE HOLE : NO IMAGE UPLOADER
		For now we will just give links to externally hosted images
		Eventually this system will allow uploading and serving of images.
		***********************/
		data = {
			imageUrl : $scope.currentPost.imageUrl,
			thumbImageUrl : $scope.currentPost.thumbImageUrl,
			title : $scope.currentPost.title,
			description : $scope.currentPost.description,
			postBody : $scope.currentPost.postBody,
			postID : $scope.currentPost.postID
		};
		
		console.log("Post ID: ", data.postID);
		
		if (!data.postID) {
			adminFactory.newBlogPost(data).then(function(result) {
				console.log("insert result", result);
				
				$scope.blogPosts = result.data;
			},function(err) {
				console.log(err);
			});
		} else {
			adminFactory.updateBlogPost(data).then(function(result) {
				console.log("update result", result);
				
				$scope.blogPosts = result.data;
			},function(err) {
				console.log(err);
			});
		}
		
		$scope.newPostMode = false;
		$scope.currentPost = {};
	};
	
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