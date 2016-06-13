// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exemple = angular.module('starter', ['ionic', 'firebase']);

var fb = null;

exemple.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    fb = new Firebase("https://tasteit.firebaseio.com/");

  });

  /*$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });*/
  
})

/*ApplicationRun.$inject = ['$ionicPlatform', '$rootScope', '$state'];

function AuthDataResolver(Auth) {
  return Auth.$requireAuth();
}
AuthDataResolver.$inject = ['Auth'];*/



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
    templateUrl: 'templates/rech.html',
    controller: 'AddRecetteCtrl'
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
    templateUrl: 'templates/liste-tag.html',
    controller: 'AddRecetteCtrl'
  })

  .state('single-rec', {
    url: '/single-rec/:recId',
    templateUrl: 'templates/single-rec.html'/*,
    controller: 'RecDetailCtrl'*/
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

    /* se connecter via réseaux sociaux


.controller("SampleCtrl", function RsLoginCtrl(Auth, $state) {

  this.loginWithGoogle = function loginWithGoogle(){
    Auth.$authWithOAuthPopup('google')
        .then(function (authData) {
          $state.go('home');
        });
  };

}) */


.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase('https://tasteit.firebaseio.com/');
    return $firebaseAuth(ref);
  }
])
     /*
.controller("SampleCtrl", function (Auth, $state) {
  this.loginWithGoogle = function loginWithGoogle(){
    Auth.$authWithOAuthPopup('google')
        .then(function (authData) {
          $state.go('home');
        });
  };
})
*/
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

.controller('ListCtrl', function($scope, Items, $state, mySingle) {
  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('Ajoutez votre recette !!');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.single = function(){
    single = this.recette;
    mySingle.set(single);
  }

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
    
// FONCTIONS POUR RECHERCHE

.controller('RechCtrl', function ($scope) {
  $scope.showDiv = function () {
    //document.getElementById('rech-btns').style.display = "none"; so when we click, this disappear
    document.getElementById('rechrech').style.display = "block"; //this appear

    //document.getElementById("paramrech").innerHTML = param; and here I don't know what to do to change what I want
  };

})

/*.controller('RechHideCtrl', function ($scope) {

  $scope.hideDiv = function () {
    document.getElementById('rech-btns').style.display = "block";
    document.getElementById('rechrech').style.display = "none";
  };
  
})    */


// FONCTION BACK

.controller('BackCtrl', function ($scope, $ionicHistory) {
  $scope.myGoBack = function () {
    $ionicHistory.goBack();
  };
})

// FONCTION DATE POUR DAILY

.controller('DateCtrl', ['$scope', function ($scope) {
  $scope.date = new Date();
}])    

// FONCTION POUR DAILY / HASARD

.controller('ArticleHasardCtrl', function ($scope) {

  $scope.hasardArticle = function () {

    var d = new Date();
    var n = d.getDate();

    var plat;
    var desc;
    var diff;
    var img;

    switch (n) {
      case 1:
        plat = "plat 2";
        desc = "desc 2";
        diff = "diff 2";
        break;
      case 2:
        plat = "plat 3";
        desc = "desc 3";
        diff = "diff 3";
        break;
      case 3:
        plat = "plat 4";
        desc = "desc 4";
        diff = "diff 4";
        break;
      case 4:
        plat = "plat 5";
        desc = "desc 5";
        diff = "diff 5";
        break;
      case 5:
        plat = "plat 6";
        desc = "desc 6";
        diff = "diff 6";
        break;
      case 6:
        plat = "plat 7";
        desc = "desc 7";
        diff = "diff 7";
        break;
      case 7:
        plat = "plat 8";
        desc = "desc 8";
        diff = "diff 8";
        break;
      case 8:
        plat = "plat 9";
        desc = "desc 9";
        diff = "diff 9";
        break;
      case 9:
        plat = "plat 10";
        desc = "desc 10";
        diff = "diff 10";
        break;
      case 10:
        plat = "Spaghetti à la Carbonara";
        desc = "Faites cuire les spaguettis à votre goût. Faites suer les lardons dans une poêle sans les griller. <br> Lorsque les spaguettis sont cuits, " +
            "égouttez-les sur le feu, ajoutez rapidement aux spaguettis chauds, les lardons, l'oeuf entier. <br> Mélangez, ajoutez la crème fraîche et " +
            "servez chaud avec du gruyère râpé ou du parmesan.";
        diff = "Facile";
        break;
      case 11:
        plat = "plat 12";
        desc = "desc 12";
        diff = "diff 12";
        break;
      case 12:
        plat = "plat 13";
        desc = "desc 13";
        diff = "diff 13";
        break;
      case 13:
        plat = "plat 14";
        desc = "desc 14";
        diff = "diff 14";
        break;
      case 14:
        plat = "plat 15";
        desc = "desc 15";
        diff = "diff 15";
        break;
      case 15:
        plat = "plat 16";
        desc = "desc 16";
        diff = "diff 16";
        break;
      case 16:
        plat = "plat 17";
        desc = "desc 17";
        diff = "diff 17";
        break;
      case 17:
        plat = "plat 18";
        desc = "desc 18";
        diff = "diff 18";
        break;
      case 18:
        plat = "plat 19";
        desc = "desc 19";
        diff = "diff 19";
        break;
      case 19:
        plat = "plat 20";
        desc = "desc 20";
        diff = "diff 20";
        break;
      case 20:
        plat = "plat 21";
        desc = "desc 21";
        diff = "diff 21";
        break;
      case 21:
        plat = "plat 22";
        desc = "desc 22";
        diff = "diff 22";
        break;
      case 22:
        plat = "plat 23";
        desc = "desc 23";
        diff = "diff 23";
        break;
      case 23:
        plat = "plat 24";
        desc = "desc 24";
        diff = "diff 24";
        break;
      case 24:
        plat = "plat 25";
        desc = "desc 25";
        diff = "diff 25";
        break;
      case 25:
        plat = "plat 26";
        desc = "desc 26";
        diff = "diff 26";
        break;
      case 26:
        plat = "plat 27";
        desc = "desc 27";
        diff = "diff 27";
        break;
      case 27:
        plat = "plat 28";
        desc = "desc 28";
        diff = "diff 28";
        break;
      case 28:
        plat = "plat 29";
        desc = "desc 29";
        diff = "diff 29";
        break;
      case 29:
        plat = "plat 30";
        desc = "desc 30";
        diff = "diff 30";
        break;
      case 30:
        plat = "plat 31";
        desc = "desc 31";
        diff = "diff 31";
        break;
      case 31:
        plat = "plat 32";
        desc = "desc 32";
        diff = "diff 32";
        break;

    }

    document.getElementById("hasardtitre").innerHTML = plat;
    document.getElementById("hasarddiff").innerHTML = diff;
    document.getElementById("hasarddesc").innerHTML = desc;
    document.getElementById("hasardimg").innerHTML = img;



    /*
    if(0 < has < 50){
      document.getElementById("commhas").innerHTML = commun;
    }else if(has > 50){
      document.getElementById("commhas").innerHTML = comdeu;
    };*/



  };

})





//FONCTION AFFICHER RECETTE TOUTE SEULE

/*.controller('RecDetailCtrl', function ($scope, $stateParams, Recettes) {
  $scope.recdet = Recettes.get($stateParams.recId);
})*/

.controller('SingleController', function($scope, Recettes, mySingle){  
  $scope.single = mySingle.get(); 
 })


/* .controller('ShowArticleCtrl', function($scope) {
  
  $scope.showArticle = function(){

    var url = "https://tasteit.firebaseio.com/KJHI60CGSqzHH35x8jW";

    alert(url);
  };

}) */

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