

/*
    This is our model for a single user and all it's data
    
*/

smithdev.factory('userFactory', [ '$http', '$q', function($http, $q){

    var currentUser = undefined;
	
    var temporaryEmailAddress = undefined;

    var base = "https://api.smithdev.io";
    
    var loginObserver;

    /*destroy all objects we're holding so they must be refreshed*/
    var wipeAll = function(){
        currentUser = undefined;
    }

    var refreshEmail = function(){
        console.log("refreshing email...");
		return $http.get(base + "/user/getUserEmail")
            .then(function(result){
                console.log("result of email address ", result);
                if(result.status == 200){
                    return result;
                }else{
                    return temporaryEmailAddress;
                }
            }, function(err){
                console.log("error on email address ", err);
                if(temporaryEmailAddress){
                    return $q.when(temporaryEmailAddress);
                }else{
                    return err;
                }
            });
    }
	
    var setEmail = function(dat){
        temporaryEmailAddress = dat;
    }

    var refreshUser = function(){
        console.log("refreshing user...");
		return $http.get(base + "/user/getUserInfo")
            .then(function(result){
                currentUser = result;
                return result;
            });
    }

	var getUser = function(id){
        if(currentUser == undefined){
            return refreshUser(id);
        }else{
            return $q.when(currentUser);
        }
	}

	var newUser = function(data){
		return $http.post(base + "/login/newUser", { "data" : data });
	}

	var loginUser = function(data){
		return $http.post(base + "/login/login", { "data" : data })
			.then(function(result){
				loginObserver();
				return result;
			});
	}

    var isLoggedIn = function(){
        return $http.get(base + "/user/").then(function(result){
            console.log("returned from logincheck")
            if(result.status == 200){
                return true;
            }else{
                return false;
            }
        }, function(err){
            return $q.when(false);
        });
    }

    var isAdmin = function(){
        return $http.post(base + "/admin/anything").then(function(result){
            console.log("returned from adminCheck")
            return result;
        });
    }

    var updateUser = function(data){
        console.log("updating ",data);
        return $http.post(base + "/user/updateUserInfo", { "data" : data});
    }

    var focus = function(onWhat){
        return function(garbage){
            return onWhat;
        }
    }

    var initiateReset = function(data){
        return  $http.post(base + "/passwords/initiatereset", { "data": data } );
    }

    var performReset = function(data){
        return  $http.post(base + "/passwords/performreset", { "data": data } );
    }
    
    
    var logoutUser = function(){
        console.log("sending logout request...");
		return $http.post(base + "/user/logout", {} );
    }
    
    var setLoginObserver = function(fn){
    	loginObserver = fn;
    }

	return {
            currentUser: currentUser,
            wipeAll : wipeAll,
			newUser : newUser,
			loginUser : loginUser,
            isLoggedIn : isLoggedIn,
			
            refreshUser : refreshUser,
            updateUser : updateUser,
            setEmail : setEmail,
            refreshEmail : refreshEmail,
			
            logoutUser : logoutUser,
            setLoginObserver : setLoginObserver

		};
}]);

