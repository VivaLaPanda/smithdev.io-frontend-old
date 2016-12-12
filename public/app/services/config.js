

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

smithdev.config( function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.
      when('/admin', {
        templateUrl: 'app/views/admin/index.html',
        controller: 'GenericController'
      }).
      when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
      }).
      when('/signup', {
        templateUrl: 'app/views/signup.html',
        controller: 'SignUpController'
      }).
      when('/user', {
        templateUrl: 'app/views/user.html',
        controller: 'UserController'
      }).
      when('/passwordreset/:resetcode', {
        templateUrl: 'app/views/passwordReset.html',
        controller: 'GenericController'
      }).
      when('/passwordreset', {
        templateUrl: 'app/views/passwordReset.html',
        controller: 'GenericController'
      }).
      when('/contact', {
        templateUrl: 'app/views/contact.html',
        controller: 'GenericController'
      }).
      when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController'
      }).
	  otherwise({
		redirectTo: '/'
	  });
});