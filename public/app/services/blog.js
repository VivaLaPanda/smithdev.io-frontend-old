

/*
    This is our model for a single user and all it's data
    
*/

smithdev.factory('blogFactory', [ '$http', '$q', function($http, $q){
    var base = "https://api.smithdev.io/blog";

    var getCategories = function(){
        return $http.get(base + "/categories");
    }

	var getBlogPost = function(postID){
        return $http.get(base + "/getBlogPost", {
			params: { postID: postID }
		});
    }

	var allBlogPosts = function(){
        return $http.get(base + "/allBlogPosts");
    }

	return {
			getCategories : getCategories,
		
            getBlogPost: getBlogPost,
			allBlogPosts : allBlogPosts

		};
}]);

