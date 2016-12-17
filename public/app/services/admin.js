

/*
    This is our model for a single user and all it's data
    
*/

smithdev.factory('adminFactory', [ '$http', '$q', function($http, $q){
    var base = "https://api.smithdev.io/admin";

    var makeNewCategory = function(data){
        return $http.post(base + "/newCategory", { "data" : data});
    }

    var updateCategory = function(data){
        return $http.post(base + "/updateCategory", { "data" : data});
    }

    var removeCategory = function(data){
        return $http.post(base + "/removeCategory", { "data" : data});
    }

    var newBlogPost = function(data){
        return $http.post(base + "/newBlogPost", { "data" : data});
    }

    var deleteBlogPost = function(data){
        return $http.post(base + "/deleteBlogPost", { "data" : data});
    }

    var updateBlogPost = function(data){
        return $http.post(base + "/updateBlogPost", { "data" : data});
    }


	return {
			makeNewCategory : makeNewCategory,
			updateCategory : updateCategory,
			removeCategory : removeCategory,
			
			newBlogPost : newBlogPost,
			deleteBlogPost : deleteBlogPost,
			updateBlogPost, updateBlogPost
		};
}]);

