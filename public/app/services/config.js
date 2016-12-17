

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*
http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript

fancy ^.^
*/
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

smithdev.config( function($routeProvider, $httpProvider, $locationProvider) {
	
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.
      when('/admin', {
        templateUrl: 'app/views/admin/index.html',
        controller: 'AdminController'
      }).
      when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController',
        activetab: 'login'
      }).
      when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignUpController',
        activetab: 'login'
      }).
      when('/user', {
        templateUrl: 'app/views/user.html',
        controller: 'GenericController',
        activetab: 'user'
      }).
      when('/passwordreset/:resetcode', {
        templateUrl: 'app/views/passwordReset.html',
        controller: 'GenericController',
        activetab: 'user'
      }).
      when('/passwordreset', {
        templateUrl: 'app/views/passwordReset.html',
        controller: 'GenericController',
        activetab: 'user'
      }).
      when('/blog', {
        templateUrl: 'app/views/blog.html',
        controller: 'BlogController',
        activetab: 'contact'
      }).
      when('/blog/:postID', {
        templateUrl: 'app/views/post.html',
        controller: 'BlogController',
        activetab: 'contact'
      }).
      when('/projects', {
        templateUrl: 'app/views/projects.html',
        controller: 'ProjectsController',
        activetab: 'contact'
      }).
      when('/contact', {
        templateUrl: 'app/views/contact.html',
        controller: 'GenericController',
        activetab: 'contact'
      }).
      when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        activetab: 'home'
      }).
	  otherwise({
		redirectTo: '/'
	  });
	  
	  
	 // Use HTML5 history API
	$locationProvider.html5Mode(true).hashPrefix('!');
});