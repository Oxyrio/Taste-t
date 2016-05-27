// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exemple = angular.module('starter', ['ionic', 'firebase']);

var fb = null;

exemple.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    fb = new Firebase("https://tasteit.firebaseio.com/");

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'        
  })

    .state('hasard', {
    url: '/hasard',
    templateUrl: 'templates/hasard.html'        
  })

    .state('liste', {
    url: '/liste',
    templateUrl: 'templates/liste.html'        
  })

    .state('bases', {
    url: '/bases',
    templateUrl: 'templates/bases.html'        
  })

    .state('rech', {
    url: '/rech',
    templateUrl: 'templates/rech.html'        
  })

    .state('tend', {
    url: '/tend',
    templateUrl: 'templates/tend.html'        
  })

    .state('contact', {
    url: '/contact',
    templateUrl: 'templates/contact.html'        
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('todo', {
    url: '/todo',
    templateUrl: 'templates/todo.html',
    controller: 'TodoController'
  });


   $urlRouterProvider.otherwise('');


})

.controller("LoginController", function($scope, $firebaseAuth, $location) {

  $scope.login = function(username, password) {
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      $location.path("/todo");
    }).catch(function(error) {
      console.error("ERROR: " + error);
    });
  };

  $scope.register = function(username, password) {
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$createUser({email: username, password: password}).then(function() {
      return fbAuth.$authWithPassword({
        email: username,
        password: password
      });
    }).then(function(authData) {
      $location.path("/todo");
    }).catch(function(error) {
      console.error("ERROR " + error);
    });
  }

})

.controller("TodoController", function($scope, $firebaseObject, $ionicPopup) {
   $scope.list = function() {
     var fbAuth = fb.getAuth();
     if(fbAuth) {
       var syncObject = $firebaseObject(fb.child("users/" + fbAuth.uid));
       syncObject.$bindTo($scope, "data");
     }
   };

  $scope.create = function() {
    $ionicPopup.prompt({
          title: 'Enter a new TODO item',
          inputType: 'text'
        })
        .then(function(result) {
          if(result !== "") {
            if($scope.data.hasOwnProperty("todos") !== true) {
              $scope.data.todos = [];
            }
            $scope.data.todos.push({title: result});
          } else {
            console.log("Action not completed");
          }
        });
  }

});
