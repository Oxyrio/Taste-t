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
    templateUrl: 'templates/hasard.html',
    controller: 'ArticleHasardCtrl'
  })

    .state('liste', {
    url: '/liste',
    templateUrl: 'templates/liste.html',
    controller: 'AddRecetteCtrl'
  })

    .state('bases', {
    url: '/bases',
    templateUrl: 'templates/bases.html',
    controller: 'AnchorBasesCtrl'
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
  })

  .state('liste-tag', {
    url: '/liste-tag',
    templateUrl: 'templates/liste-tag.html'
  })

  .state('single-rec', {
    url: '/single-rec',
    templateUrl: 'templates/single-rec.html'
  })

  .state('add-recipe', {
    url: '/add-recipe',
    templateUrl: 'templates/add-recipe.html',
    controller: 'SampleCtrl'
  })

  .state('test-content', {
    url: '/test-content',
    templateUrl: 'templates/test-content.html',
    controller: 'AddRecetteCtrl'
  })

  .state('test-db', {
    url: '/test-db',
    templateUrl: 'templates/test-db.html'
  })

   $urlRouterProvider.otherwise('/login');


})

.controller("LoginController", function($scope, $firebaseAuth, $location) {

  $scope.login = function(username, password) {
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      $location.path("/home");
    }).catch(function(error) {
      alert("ERROR: " + error);
    });
  };

  $scope.register = function(username, password) {
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$createUser({
      email: username,
      password: password
    }).then(function() {
      return fbAuth.$authWithPassword({
        email: username,
        password: password
      });
    }).then(function(authData) {
      $location.path("/home");
    }).catch(function(error) {
      alert("ERROR " + error);
    });
  };

})

    /* se connecter via Facebook */

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase('https://tasteit.firebaseio.com/');
    return $firebaseAuth(ref);
  }
])

.controller("SampleCtrl", ["$scope", "Auth", //pour facebook, twitter et google+
  function($scope, Auth) {
    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    })
  }
])

    /* liste des recettes */


.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://tasteit.firebaseio.com/');
  return $firebaseArray(itemsRef);
}])

.controller('ListCtrl', function($scope, Items) {
  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('Ajoutez votre recette !!');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };
})

//AJOUTER DES RECETTES

.factory('Recettes', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://tasteit.firebaseio.com/');
  return $firebaseArray(itemsRef);
}])

.controller('AddRecetteCtrl', function($scope, Recettes) {
  $scope.recettes = Recettes;

  $scope.addRecette = function(){
    recettename = this.recettename;
    etapes = this.etapes;
    diff = this.diff;
    temps = this.temps;
    nbPers = this.nbPers;
    sucsal = this.sucsal;
    genre = this.genre;
    faim = this.faim;
    alcool = this.alcool;
    autres = this.autres;
    vote = 0;

    $scope.recettes.$add({
      "recettename": recettename,
      "etapes": etapes,
      "diff": diff,
      "temps": temps,
      "nbPers": nbPers,
      "sucsal": sucsal,
      "genre": genre,
      "faim": faim,
      "alcool": alcool,
      "autres": autres,
      "vote": vote
    });

  };
})


// FONCTION POUR HASARD

.controller('ArticleHasardCtrl', function ($scope) {

  $scope.hasardArticle = function () {

    var has = Math.floor((Math.random() * 6));
    var texthas;
    var titrerec;
    var diff;
    var desc;

    //var commun = "3 coms";
    //var comdeu = "6 coms";

    switch (has){
      case 0:
            titrerec = "Pâtes carbonara";
            diff = "Facile";
            desc = "Faire bouillir de l'eau et faire cuire les pâtes pendant 10min";
            break;
      case 1:
            titrerec = "Sandwich Jambon";
            diff = "Moyen";
            desc = "Du pain, du beurre et du jambon";
            break;
      case 2:
            titrerec = "Steak hâché";
            diff = "Difficile";
            desc = "Faites cuire pendant 3min de chaque côté à feu moyen";
            break;
      case 3:
            titrerec = "Le plat de Matthieu";
            diff = "Facile";
            desc = "26/05/96";
            break;
      case 4:
            titrerec = "Le plat d'Aymé";
            diff = "Facile";
            desc = "30/11/95";
            break;
      case 5:
            titrerec = "Le plat de Hugo";
            diff = "Facile";
            desc = "Unborn";
        break;
      default:
            texthas = has + ": Triste";
    }

    document.getElementById("hasardtitre").innerHTML = titrerec;
    document.getElementById("hasarddiff").innerHTML = diff;
    document.getElementById("hasarddesc").innerHTML = desc;


    /*
    if(0 < has < 50){
      document.getElementById("commhas").innerHTML = commun;
    }else if(has > 50){
      document.getElementById("commhas").innerHTML = comdeu;
    };*/



  };

})





//FONCTION AFFICHER RECETTE TOUTE SEULE

.controller('ShowArticleCtrl', function($scope) {
  
  $scope.showArticle = function(){

    var url = "https://tasteit.firebaseio.com/KJHI60CGSqzHH35x8jW";

    alert(url);
  };

})

//FONCTION ANCHOR SCROLL BASES

.controller('AnchorBasesCtrl', function ($scope, $ionicScrollDelegate, $location) {
  $scope.scrollTo = function (target) {
    $location.hash(target); //set the location hash
    var handle = $ionicScrollDelegate.$getByHandle('BasesDelegate');
    handle.anchorScroll(true);
  };
})

// Fonction loading

.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
      console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
      console.log("The loading indicator is now hidden");
    });
  };
});



//AJOUTER DES RECETTES
/*angular.module('starter').factory("recipes", function($firebaseArray) {
    var itemsRef = new Firebase("https://tasteit.firebaseio.com/recipes");
    return $firebaseArray(itemsRef);
});

//AJOUTER DES RECETTES
angular.module('starter').controller("AddRecipeController", function($scope, Recipes) {

    $scope.recipes = Recipes;

    $scope.addRecipe = function() {
        titre = this.titre;
        description = this.description;
        difficulte = this.difficulte;
        temps = this.temps;
        nbPersonne = this.nbPersonne;
        
        var ingredient = [
                "fraise",
                "farine"
            ]
        for (var i=0; i< ingredient.length; i++){
            i = ingredient[i];
        }

        $scope.recipes.$add({
            "titre": titre,
            "description": description,
            "difficulte": difficulte,
            "temps": temps,
            "nbPersonne": nbPersonne
        });

    };
});


//AFFICHER LES RECETTES
angular.module('SwaltyApp').controller('RecipeController', function($scope, Recipes){
    $scope.recipes = Recipes;
});

//LOGIN GOOGLE

    var ref = new Firebase("https://tasteit.firebaseio.com");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

*/