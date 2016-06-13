// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exemple = angular.module('starter', ['ionic', 'firebase', 'ngCordova']);

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
    templateUrl: 'templates/contact.html',
    controller: 'MapCtrl'
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

.controller('ListCtrl', function($scope, Items, $state, mySingle, Auth) {
  $scope.items = Items;

  $scope.single = function(){
    single = this.recette;
    mySingle.set(single);
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
    
// FONCTIONS POUR RECHERCHE

.controller('RechCtrl', function ($scope) {
  $scope.showDiv = function () {
    //document.getElementById('rech-btns').style.display = "none"; so when we click, this disappear
    document.getElementById('rechrech').style.display = "none"; //this appear

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
    var ingr;

    switch (n) {
      case 1:
        plat = "El Diablo";
        desc = "Remplissez un tumbler aux 2/3 de glaçons. <br>" +
            "Ecrasez les quarties de citrions avec un pilon. <br>" +
            "Mettez les quartiers de citrons écrasés dans un verre avec tous les autres ingédients et remuez ! <br>" +
            "Servez !";
        ingr = "- 2 quartiers de citrons verts <br>" +
            "- 12 cl de Canada Dry <br>" +
            "- 2 cl de crème de cassis <br>" +
            "- 4 cl de tequila";
        diff = "Moyen";
        break;
      case 2:
        plat = "Tartare au saumon";
        desc = "Commencez par hacher les pavés de saumon en faisant des petits cubes. <br>" +
            "Mettez les dans un saladier et ajoutez l'huile d'olive, la sauce soja et le jus de citron. <br>" +
            "Ajoutez un peu de sel et de poivre. <br>" +
            "Recouvrez le saladier avec du papier film et laisser le frigo pendant 1 à 2h. <br>" +
            "Pendant que le saumon marine, mélangez la crème fraîche avec les 2 cuillères à café de jus de citron et la ciboulette. <br>" +
            "Mettez au frais. <br>" +
            "Juste avant de servir, posez un cercle à patisserie sur une assiette et mettez y le saumon en appuyant bien avec une cuillère puis retirez doucement le cercle? <br>" +
            "Servez avec un peu de sauce !";
        ingr = "- 2 pavés de saumon frais, sans peau et sans arrètes (150g chacun) <br>" +
            "- 2 cuillèers à café de jus de citron <br>" +
            "- 2 cuillères à café de sauce soja <br>" +
            "- 2 cuillères à soupe d'huile d'olive <br>" +
            "- Du sel <br>" +
            "- Du poivre <br>" +
            "- 1O cl de crème fraîche <br>" +
            "- De la ciboulette" +
            "- Du jus de citron";
        diff = "Facile";
        break;
      case 3:
        plat = "Tomates farcies";
        desc = "Commencez par éplucher et hacher les oignons ainsi que les gousses d'ail. <br>" +
            "Mettez la motié des oignons dans la chair à saucisse et ajoutez y l'ail, le sel, le poivre et le persil. <br>" +
            "Coupez le chapeau des tomates et videz les puis salez et poivrez l'intérieur. <br>" +
            "Mettez ensuite la farce à saucisse dans les tomates et replacez les chapeaux. <br>" +
            "Placez les tomates dans un grand plat avec le reste des oignons. <br>" +
            "Mettez du thym et un peu de beurre sur chaque tomate. <br>" +
            "Puis, faites cuire au four à 180°C (th. 6) pendant 1h. <br>" +
            "Servez avec du riz !";
        ingr = "- 500g de chair à saucisse <br>" +
            "- 4 tomates de bonne taile <br>" +
            "- 3 oignons <br>" +
            "- 2 gousses d'ail <br>" +
            "- Du thym <br>" +
            "- Du persil <br>" +
            "- Du beurre <br>" +
            "- Du sel <br>" +
            "- Du poivre";
        diff = "Facile";
        break;
      case 4:
        plat = "Mousse au chocolat";
        desc = "Ramollisez le choclat dans une terrine. <br>" +
            "Cassez les oeufs et récupérez les jaunes, puis mettez les dans le chocolat avec du sucre. <br>" +
            "Battez les blancs en neige et ajoutez les au mélange. <br>" +
            "Mettez au frais pendant 1 à 2h.";
        ingr = "- 100g de chocolat <br>" +
            "- 3 oeufs <br>" +
            "- 1 sachet de sucre vanillé";
        diff = "Facile";
        break;
      case 5:
        plat = "Nuit de noces";
        desc = "Remplissez à 1/2 un shaker de galce et versez la bénédictine et la crème cassis. <br>" +
            "Frappez et versez dans une flûte. <br>" +
            "Puis, complétez avec le Champagne. <br>" +
            "C'est prêt !";
        ingr = "- 0.5 cl de crème de cassis <br>" +
            "- 1.5 cl de bénédictine <br>" +
            "- Du champagne";
        diff = "Difficile";
        break;
      case 6:
        plat = "Salade César";
        desc = "Commencez par laver la laitue romaine, coupez la et disposer la dans des assiettes creuses. <br>" +
            "Préparer la sauce césar : <br> " +
            "Mélangez à la fourchette le jaune d’œuf et la moutarde pour obtenir une sauce homogène. <br>" +
            "Puis ajoutez l'huile petit à petit comme pour préparer une mayonnaise avec un fouet. <br>" +
            "Salez, poivrez, ajoutez la crème fraîche, le citron et dans dans un petit mixeur, mixez à la sauce, 3 filets d'anchois et l'ail pour une texture bien lisse.<br>" +
            "Faites cuire les blancs de poulet dans une poêle avec un filet d'huile, bien dorer le poulet pour apporter le croustillant à la viande. <br>" +
            "Salez, poivrez. <br>" +
            "Puis faites griller les croûtons de pain de mie préalablement coupés ! <br>" +
            "Ajoutez au dernier moment le parmesan sur les croûton chaud, bien mélanger. <br>" +
            "Répartissez sur la salade, les blancs de poulet, les croûtons, les oignons frits, la sauce et déposez des copeaux de parmesan. <br>" +
            "C'est prêt !";
        ingr = "- 300 g de blanc de poulet <br>" +
        "- De la laitue romaine <br>" +
        "- 4 tranches de pain de mie <br>" +
        "- Des copeaux de parmesan <br>" +
        "- 20 g de parmesan râpé <br>" +
        "Pour la sauce césar : <br>" +
        "- 1 cuillère à soupe de citron jaune <br>" +
        "- 4 cuillères à soupe d'huile d'olive <br>" +
        "- 40 g de parmesan râpé <br>" +
        "- 1 jaune d'oeuf <br>" +
        "- 1 cuillère à soupe de moutarde <br>" +
        "- 1 cuillère à soupe de crème fraîche 15% mg <br>" +
        "- 3 filets d'anchois <br>" +
        "- 1 gousse d'ail <br>" +
        "- Du sel <br>" +
        "- Du poivre ";
        diff = "Facile";
        break;
      case 7:
        plat = "Cuillère appéritive : purée de poivron et fromage de chèvre";
        desc = "Préparez le coulis de poivron : lavez, épépinez les poivrons et coupez-les en 2. <br>" +
            "Faites-les revenir sous le gril (côté peau vers le dessus), jusqu'à ce que la peau soit noire. <br>" +
            "Vous pouvez ainsi facilement les éplucher.<br>" +
            "Une fois épluchés, mixez les poivrons afin d'obtenir un coulis de poivron.<br>" +
            "Mélangez le fromage de chèvre avec de l'huile d'olive, du jus de citron, de la ciboulette fraîche ciselée puis assaisonnez.<br>" +
            "Dans des cuillères (ou des verrines), disposez moitié-moitié de coulis de poivron et de préparation de fromage de chèvre.";
        ingr = "- 1 poivron rouge <br>" +
        "- 100g de fromage de chèvre frais <br>" +
        "- De l'huile d'olive <br>" +
        "- 1 jus de citron <br>" +
        "- De la ciboulette <br>" +
        "- Du sel <br>" +
        "- Du poivre";
        diff = "Facile";
        break;
      case 8:
        plat = "Fraisier";
        desc = "Pour la crème mousseline : <br>" +
            "Réaliser la crème pâtissière, pour cela : <br>" +
            "Dans une casserole, faites bouillir le lait avec la vanille.<br>" +
            "Dans un saladier, blanchissez les jaunes avec le sucre, ajoutez la maïzena sans battre, versez le lait bouillant sur cet appareil en 2 ou 3 fois, puis remettez sur le feu et faites bouillir 2 minutes en remuant vivement pour ne pas attacher.<br>" +
            "Hors du feu ajoutez 1/3 du beurre et fouettez vivement. <br>" +
            "Laissez refroidir en saupoudrant de sucre glace pour éviter le croûtage ou en posant, au contact, un film alimentaire. <br>" +
            "Entreposez au réfrigérateur.<br><br>" +
            "Faire les biscuits : <br>" +
            "Séparez les blancs et les jaunes de oeufs. <br>" +
            "Blanchissez les jaunes avec le sucre et ajoutez la farine. <br>" +
            "Montez les blancs en neige ferme et incorporez les aux jaunes en 2 fois en veillant à ne pas faire retomber l'appareil.<br><br>" +
            "Couchez 1 ou 2 disques (on peut aussi mettre un disque de biscuit sur le dessus du gâteau) à la poche à douille sur du papier sulfurisé sur la plaque de cuisson et cuire 200°C pendant 12 minutes environ. <br><br>" +
            "Faire le sirop : <br>" +
            "Faites bouillir l'eau et le sucre. Arrêtez au premier bouillon. <br>" +
            " A froid, incorporez le kirsch.<br><br>" +
            "Quand la crème est complètement froide, au batteur, incorporez le restant de beurre et le kirsch. <br>" +
            "Commencez à battre le beurre afin qu'il soit bien souple et mou puis incorporez, cuillère par cuillère, la pâtissière beurrée. <br>" +
            "Continuez de battre environ 10 minutes pour bien aérer la crème puis incorporez le kirsch. <br>" +
            "Posez un disque de biscuit dans un cercle à mousse de 5 cm de hauteur, punchez le généreusement au pinceau avec le sirop, et mettez une couche de crème mousseline.<br><br>" +
            "Disposez harmonieusement des fraises lavées et équeutées sur le pourtour du cercle, et finissez de garnir en alternant couche de crème et fraises en morceaux jusqu'à 1 cm du bord du cercle. <br>" +
            "Punchez le second disque de biscuit et posez le sur le gâteau - Laissez reposer au froid.";
        ingr = "- 500g de fraises lavées et équeutées <br>" +
        "Pour les biscuits : <br>" +
         "- 6 oeufs entiers <br>" +
        "- 150g de farine <br>" +
        "- 150g de sucre <br>" +
        "- 1 cuillère à café rase de vanille poudre <br>" +
        "- Pour la crème mousseline :" +
          "6 jaunes d'oeufs <br>" +
        "- 100g de sucre <br>" +
        "- 1/2 litre de lait <br>" +
        "- 50g de Maïzena <br>" +
        "- 250g de beurre doux <br>" +
        "- 30g de kirsch <br>" +
        "Pour le sirop : <br>" +
          "- 50g d'eau <br>" +
        "- 75g de sucre <br>" +
        "- 1 verre à liqueur de kirsch <br>" +
        "- Du sucre glace <br>" +
        "- 100g de pâte d'amande <br>" +
        "Pour une finition 'miroir' <br>" +
        "- 100gr de coulis de fraises bouilli 1 minute avec <br>" +
        "- 1/2 sachet de Vitpris alsa";
        diff = "Difficile";
        break;
      case 9:
        plat = "Houmous";
        desc = "Commencez par mettre les pois chiches égouttés dans un mixeur. <br>" +
            "Mixez légèrement en ajoutant un peu d'eau de cuisson. <br>" +
            "Ajoutez le tahin, le jus de citron, l'ail, le cumin et le sel, et continuez de mixer en incorporant l'huile d'olive petit à petit jusqu'à obtenir une texture homogène et crémeuse.";
        ingr = "- 300g de pois chiches cuits et égouttés <br>" +
        "- 2 à 3 cuillères à soupe de Tahin <br>" +
        "- Du jus d'1/2 citron <br>" +
        "- De huile d'olive <br>" +
        "- 1 cuillère à café de sel <br>" +
        "- 1 cuillère à soupe de cumin <br>" +
        "- 1 à 2 gousse d'ail <br>" +
        "- De l'huile de sésame (facultatif) <br>";
        diff = "Moyen";
        break;
      case 10:
        plat = "Spaghetti à la Carbonara";
        desc = "Faites cuire les spaguettis à votre goût. Faites suer les lardons dans une poêle sans les griller. <br> Lorsque les spaguettis sont cuits, " +
            "égouttez-les sur le feu, ajoutez rapidement aux spaguettis chauds, les lardons, l'oeuf entier. <br> Mélangez, ajoutez la crème fraîche et " +
            "servez chaud avec du gruyère râpé ou du parmesan.";
        ingr = "- 200g de spaghetti <br>" +
            "- 2 jaunes d'oeufs <br>" +
            "- 160g de lardons fumés <br>" +
            "- 15 cl de crème fraîche <br>" +
            "- 60g de parmesan râpé <br>" +
            "- Du sel <br>" +
            "- Du poivre";
        diff = "Facile";
        break;
      case 11:
        plat = "Cupcake";
        desc = "Travailler le beurre ramolli et le sucre jusqu'à obtenir une préparation crémeuse. <br>" +
            "Ajouter l'oeuf entier, l'extrait de vanille et la crème entière. Mélanger.<br>" +
            "Ajouter petit à petite la farine, préalablement mélangée avec le bicarbonate, la levure et le sel. <br>" +
            "Vous devez obtenir une pâte légèrement collante. <br>" +
            "Répartir dans des petits moules en papier sulfurisé (ou dans un moule à muffins). <br>" +
            "Attention, ne pas remplir plus de la moitié de la hauteur, sinon ça débordera à la cuisson !<br>" +
            "Enfourner 25 minutes à 180°C (thermostat 6). <br>" +
            "A la fin de la cuisson, la lame d'un couteau doit ressortir sèche. <br>" +
            "A l'aide d'un fouet électrique, battre le beurre ramolli en y ajoutant progressivement le sucre glace pour obtenir une crème au beurre. <br>" +
            "Ajouter l'extrait de vanille. <br>" +
            "Recouvrir le sommet des cupcakes de crème au beurre.";
        ingr = "75g de beurre <br>" +
        "135g de sucre <br>" +
        "1 oeuf <br>" +
        "1 cuillère à café d'extrait de vanille <br>" +
        "20 cl de crème épaisse <br>" +
        "150g de farine <br>" +
        "1 cuillère à café rase de bicarbonate <br>" +
        "1 cuillère à café rase de levure chimique <br>" +
        "1 pincée de sel <br>" +
        "Glaçage (crème au beurre) : <br>" +
        "60g de beurre <br>" +
        "30g de sucre glace <br>" +
        "2 cuillères à café d'extrait de vanille";
        diff = "Moyen";
        break;
      case 12:
        plat = "Mojito";
        desc = "Placez les feuilles de menthe dans le verre. <br>" +
            "Ajoutez le sucre et le jus de citron. <br>" +
            "Pilez consciencieusement afin d'exprimer l'essence de la menthe mais sans la broyer.<br>" +
            "Ajoutez le rhum, remplissez le verre à moitié de glaçons et complétez avec de l'eau gazeuse.<br>" +
            "Mélangez doucement et servez avec une paille dans un verre de type 'tumbler'";
        ingr = "- 6 cl de rhum cubain <br>" +
            "- 3 cl de jus de citron vert <br>" +
            "- 8 feuilles de menthe <br>" +
            "- De l'eau gazeuse <br>" +
            "- 2 cl de sirop de sucre de canne";
        diff = "Facile";
        break;
      case 13:
        plat = "Salade Tomate Mozzarella";
        desc = "Sur une planche, découpez la mozzarella en tranches de 2 à 3 mm d'épaisseur. <br>" +
            "Découpez les tomates en tranches. <br>" +
            "Intercalez les tranches de mozzarella entre les tranches de tomates sur le plat de service en les faisant se chevaucher. Garnissez tout le plat. <br>" +
            "Préparez une vinaigrette avec l'huile d'olive, le vinaigre, le sel et le poivre. <br>" +
            "Aspergez les tomates et la mozzarella de vinaigrette. <br>" +
            "Prélevez des feuilles de basilic frais et émincez les finement après les avoir rincées. <br>" +
            "Parsemez les tomates de basilic. <br>" +
            "Ajoutez en dernier une pincée de sel de Guérande.";
        ingr = "- 4 tomates rouges <br>" +
            "- 250 à 300 g de mozzarella <br>" +
            "- 1 botte de basilic <br>" +
            "- 10 cl d'huile d'olive <br>" +
            "- 5 cl de vinaigre balsamique <br>" +
            "- Du sel de Guérande <br>" +
            "- Du poivre";
        diff = "Facile";
        break;
      case 14:
        plat = "Tarte Tomates Cerise";
        desc = "Préchauffez le four à 210°C (thermostat 7). <br>" +
            "Etalez la pâte brisée dans un plat à tarte, puis piquez la à l'aide d'une fourchette. <br>" +
            "Dans un bol, mélangez la crème fraîche épaisse avec la moutarde, la tapenade noire et le basilic. <br>" +
            "Répartissez bien la préparation sur le fond de la pâte, puis disposez y les tomates cerises, coupées en deux, face coupée vers le fond du plat. <br>" +
            "Pour bien les répartir, faites un cercle en partant du bord de la pâte. <br>" +
            "Saupoudrez de gruyère râpé puis arrosez d'un filet d'huile d'olive en zigzag. <br>" +
            "Saupoudrez d'herbes de Provence. <br>" +
            "Faites cuire au four pendant environ 25 minutes.";
        ingr = "- 1 pâte brisée <br>" +
            "- 250g de tomates cerises <br>" +
            "- 4 cuillères à soupe de crème fraîche épaisse entière <br>" +
            "- 2 cuillères à soupe de moutarde <br>" +
            "- 1 cuillère à soupe de tapenade noire <br>" +
            "- 1 cuillère à soupe de basilic ciselé <br>" +
            "- Du gruyère râpé <br>" +
            "- De l'huile d'olive <br>" +
            "- Des herbes de Provence <br>";
        diff = "Moyen";
        break;
      case 15:
        plat = "Eclair au chocolat";
        desc = "Pour la pâte à choux: <br>" +
        "Préchauffez le four à 210°C (Thermostat 7). <br>" +
        "Mélangez sel, sucre, beurre et eau dans une casserole, et faites bouillir. <br>" +
          "Intégrez la farine, et remuez jusqu'à l'obtention d'une pâte compacte. Travaillez jusqu'à ce qu'elle soit suffisamment ferme. <br> " +
        "Intégrez 4 oeufs, un à un en veillant à bien mélanger entre chaque oeuf. <br>" +
          "Travaillez la pâte afin de la rendre ferme. <br>" +
          "Sur un plaque allant au four préalablement huilée, répartissez à l'aide de la poche à douille une dizaine de boudins de pâte de 15 cm de long environ.  <br>" +
        "Badigeonnez avec le jaune d'œuf pour que la pâte soit dorée à la cuisson. <br>" +
        "Faites cuire 25 min à four chaud et laissez reposer 10 min, four éteint, pour éviter que les choux ou les éclairs ne dégonflent. <br><br>" +
            "Pour la crème: <br>" +
        "Faites fondre 60 g de chocolat cassé en morceaux dans le lait, à feu doux. <br>" +
          "Dans un bol, fouettez oeuf, jaune et sucre jusqu'à ce que le mélange soit mousseux. <br>" +
        "Ajoutez la farine et verser dans le lait chocolaté. <br>" +
          "Faites épaissir sans cesser de remuer. <br>" +
          "Hors du feu, intégrez 20 g de beurre. Laisser refroidir. <br>" +
          "Garnissez de cette crème les éclairs coupés en 2 dans le sens de la longueur et faites fondre au bain-marie le reste du chocolat et du beurre. <br>" +
          "Nappez le dessus des éclairs. Laissez durcir le glaçage avant de déguster.";
        ingr = "Pour 10 éclairs : <br>" +
            "Pour la crème : <br>" +
            "- 2 cuillères à soupe de farine <br>" +
            "- 30 cl de lait <br>" +
            "- 50g de beurre <br>" +
            "- 210g de chocolat noir <br>" +
            "- 1 oeuf <br>" +
            "- 3 cuillères à soupe de sucre <br>" +
            "- 2 jaunes d'oeufs <br>" +
            "Pour la pâte à choux : <br>" +
            "- 150g de farine <br>" +
            "- 25 cl d'eau  <br>" +
            "- 75g de beurre <br>" +
            "- 1 cuillère à soupe de sucre <br>" +
            "- 4 oeufs <br>" +
            "- 1 pincée de sel <br>" +
            "- 1 jaune d'oeuf  <br>" +
            "- De l'huile";
        diff = "Moyen";
        break;
      case 16:
        plat = "Tequila Sunrise";
        desc = "Versez la tequila sur des glaçons dans le verre. <br>" +
            "Complétez avec le jus d'orange et remuez. <br>" +
            "Versez doucement le sirop de grenadine dans le verre pour que celui-ci tombe au fond. <br>" +
            "Donnez un petit coup de cuillère pour affiner le dégradé si nécessaire. <br>" +
            "Servez dans un verre de type 'tumbler'."
        ingr = "- 6 cl de tequila <br>" +
            "- 12 cl de jus d'orange <br>" +
            "2 cl de sirop de grenadine";
        diff = "Facile";
        break;
      case 17:
        plat = "Brochettes Melon - Tomates Cerise";
        desc = "Découpez le melon en petites tranches. <br>" +
            "Embrochez les morceaux de melon et les tomates cerise sur les batonnets <br>" +
            "Servez comme entrée ou appéritif.";
        ingr = "- Du melon <br>" +
            "- Des tomates cerise" +
            "- Des batonnets";
        diff = "Très facile";
        break;
      case 18:
        plat = "Gratin Dauphinois";
        desc = "Pelez et coupez les pommes de terre en fines rondelles. <br>" +
            "Mettez dans un plat à gratin une bonne couche de pomme de terre. <br>" +
            "Salez, poivrez et muscadez légrèrement. <br>" +
            "Parsemez de quelques noisettes de beurre et étalez une fine couche de gruyère râpé." +
            "Renouvelez l'opération sans le gruyère. <br>" +
            "Ajoutez le mélange crème-lait. <br>" +
            "Puis finissez par une bonne couche de gruyère râpé. <br>" +
            "Mettez au four à 220°C environ 1h15 environ.";
        ingr = "- 5 à 6 grosses pommes de terre <br>" +
            "- 20 cl de crème liquide entière <br>" +
            "- 20 à 30 cl de lait <br>" +
            "- Quelques noisettes de beurre <br>" +
            "- 100 g de gruyère râpé <br>" +
            "- Des noix de muscade <br>" +
            "- Du sel <br>" +
            "- Du poivre";
        diff = "Moyen";
        break;
      case 19:
        plat = "Truffes au chocolat";
        desc = "Cassez le chocolat en petits morceaux dans un plat résistant à la chaleur. <br>" +
            "Faites le fondre au bain-marie. Ajoutez progressivement le beurre coupé en petits dés. Mélangez. <br>" +
        "Quand le beurre a bien fondu dans le chocolat, retirez le plat du feu, ajoutez y les jaunes d'oeuf, le sucre vanillé et le sucre glace. Bien mélanger le tout. <br>" +
        "Mettez la pâte au frigo pendant au moins une heure afin qu'elle se solidifie." +
        "Ensuite, formez des petites boulettes de pâte à la main, roulez les dans le cacao puis disposez les sur un plat.";
        ingr = "- 250g de chocolat noir de bonne qualité <br>" +
            "- 100g de beurre non salé <br>" +
            "- 2 jaunes d'oeuf <br>" +
            "- 7.5g de sucre vanillé <br>" +
            "- 80g de sucre glace <br>" +
            "- 50g de cacao <br>";
        diff = "Facile";
        break;
      case 20:
        plat = "Sex on the beach";
        desc = "Versez les alcools sur des glaçons, mélangez et complétez avec les jus de fruits. <br>" +
            "Servez dans un verre de type 'verre tulipe'.";
        ingr = "- 3 cl de vodka <br>" +
            "- 2 cl de sirop de melon <br>" +
            "- 2 cl de chambord <br>" +
            "- 5 cl de jus d'ananas <br>" +
            "- 6 cl de jus de cranberry";
        diff = "Facile";
        break;
      case 21:
        plat = "Salade concombres";
        desc = "Pelez le concombre et coupez-le en fines rondelles. <br>" +
              "Faites-le dégorger avec du sel. <br>" +
              "Mélangez 3 cuillères à soupe de crème avec 1 cuillère d'huile d'olive. <br>" +
              "Salez, poivrez et ajoutez 1 touche de basilic. <br>" +
              "Une fois le concombre dégorgé, mélangez-le avec la sauce. <br>" +
              "C'est prêt !";
        ingr = "- 1 gros concombre <br>" +
            "- De la crème fraîche <br>" +
            "- De l'huile d'olive <br>" +
            "- Du basilic <br>" +
            "- Du sel <br>" +
            "- Du poivre";
        diff = "Facile";
        break;
      case 22:
        plat = "Gin TOnic";
        desc = "Servir dans un tumbler, sur des glaçons. <br>" +
            "Verser le gin, remplir de tonic frais et remuer doucement une seule fois. <br>" +
            "Servir dans un verre de type 'tumbler'.";
        ingr = "- Du Tonic (schweppes) <br>" +
              "- 3 cl de gin";
        diff = "Facile";
        break;
      case 23:
        plat = "Clafoutis aux cerises";
        desc = "Préchauffez le four à 180°c. <br>" +
            "Lavez, équeutez et éventuellement dénoyautez les cerises. Réservez. <br>" +
            "Dans un saladier, battez les oeufs en omelette. <br>" +
            "Ajoutez le sucre et le sel, et fouettez 5 minutes. <br>" +
            "Versez la farine et la levure. Mélangez délicatement à la spatule en bois. <br>" +
            "Ajoutez progressivement 25g de beurre fondu et le lait. <br>" +
            "Beurrez un plat à gratin. Disposez les cerises dans le plat et versez l'appareil dessus. <br>" +
            "Enfourner et cuire 45 mn à 180°c. <br>" +
            "Saupoudrez de sucre vanillé à la sortie du four. <br>" +
            "Servir tel quel, ce clafoutis ne se démoule pas.";
        ingr = "- 750 g de cerises bien mûres <br>" +
        "- 100 g de farine <br>" +
        "- 1/2 sachet de levure en poudre <br>" +
        "- 4 oeufs <br>" +
        "- 125 g de sucre <br>" +
        "- 2 pincée de sel <br>" +
        "- 25 g de beurre <br>" +
        "- 25 cl de lait <br>" +
        "- 1 sachet de sucré vanillé <br>";
        diff = "Moyen";
        break;
      case 24:
        plat = "Cake aux olives et au jambon";
        desc = "Préchauffer le four à 180°C.<br>" +
            "Coupez les olives en anneaux, coupez le jambon en dés et émiettez le boursin.<br>" +
            "Dans un saladier, mélangez farine, levure chimique, sel, poivre et oeufs.<br>" +
            "Versez-y le vin blanc et l’huile en fouettant. <br>" +
            "Ajoutez les olives vertes, les dés de jambon et le boursin.<br>" +
            "Beurrez et farinez un moule à cake. <br>" +
            "Versez-y la pâte et faites cuire 50 minutes dans le four à 180°C.";
        ingr = "- 1 boursin ail et fines herbes <br>" +
        "- 100g d’olives vertes dénoyautées <br>" +
        "- 100g de jambon de Paris en tranches épaisses <br>" +
        "- 200g de farine <br>" +
        "- 1 sachet de levure chimique <br>" +
        "- 4 oeufs <br>" +
        "- 10 cl d’huile d’olive <br>" +
        "- 10 cl de vin blanc sec <br>" +
        "- Du beurre";
        diff = "Moyen";
        break;
      case 25:
        plat = "Gaspacho";
        desc = "Pelez et épépinez les tomates. <br>" +
            "Épluchez et épépinez le concombre. <br>" +
            "Coupez le poivron en petits dés. <br>" +
            "Mixez tous les légumes ensemble.<br>" +
            "Ajoutez les gousses d'ail, l'huile d'olive, le sel, le poivre. <br>" +
            "Mixez à nouveau.<br>" +
            "Réservez au réfrigérateur pendant 4 heures.";
        ingr = "- 5 grosses tomates bien mures <br>" +
            "- 1 concombre <br>" +
            "- 1 poivron rouge <br>" +
            "- 2 gousses d'ail épluchées <br>" +
            "- 3 cuillères à soupe d'huile d'olive";
        diff = "Facile";
        break;
      case 26:
        plat = "Ratatouille";
        desc = "Lavez et détaillez les courgettes, l'aubergine, le poivron vert et le rouge, en cubes de taille moyenne. <br>" +
            "Coupez les tomates en quartiers, et émincez l'oignon. <br>" +
            "Dans une poêle, versez un peu d'huile d'olive et faites-y revenir les uns après les autres les différents légumes pendant 5 minutes pour qu'ils colorent. <br>" +
            "Commencez par les poivrons, puis les aubergines, les courgettes et enfin les oignons et les tomates que vous cuirez ensemble.<br>" +
            "Après avoir fait cuire les légumes, ajoutez-les tous aux tomates et aux oignons, baissez le feu puis mélangez. <br>" +
            "Ajoutez un beau bouquet garni de thym, de romarin et de laurier, salez, poivrez, puis couvrez pour laisser mijoter 40 minutes en remuant régulièrement. <br>" +
            "A environ 10 minutes du terme de la cuisson, ajoutez les deux belles gousses d'ail écrasées puis couvrez de nouveau. <br>" +
            "N'hésitez pas à goûter et à assaisonner de nouveau selon vos goûts.";
        ingr = "- 2 courgettes <br>" +
        "- 1 aubergine <br>" +
        "- 1 poivron vert et 1 rouge <br>" +
        "- 3 tomates <br>" +
        "- 1 oignon <br>" +
        "- 2 gousses d'ail <br>" +
        "- 1 bouquet garni <br>" +
        "- De l'huile d'olive <br>" +
        "- Du sel <br>" +
        "Du poivre";
        diff = "Difficile";
        break;
      case 27:
        plat = "Tarte aux pommes";
        desc = "Étalez votre pâte sur votre moule à tarte et piquez la pâte à l'aide d'une fourchette. <br>" +
            "Épluchez les pommes, coupez les en deux et enlevez les trognons. <br>" +
            "Coupez ensuite la moitié de la pomme en lamelle et disposez la sur la pâte à la verticale. <br>" +
            "Faites de même pour toutes les pommes. <br>" +
            "Coupez ensuite les 40 g de beurre en morceaux que vous disposez sur les pommes, coupez puis ajoutez les 40 g de sucre. <br>" +
            "Mettez au four à 200°C durant 30 minutes environ.";
        ingr = "- 1 pâte brisée ou feuilletée <br>" +
        "- 7 ou 8 pommes <br>" +
        "- 40g de sucre <br>" +
        "- 40g de beurre";
        diff = "Facile";
        break;
      case 28:
        plat = "Vin chaud";
        desc = "Lavez et brossez les oranges. <br>" +
            "Coupez les en rondelles très fines. <br>" +
            "Versez le vin et le Cognac dans une grande casserole. Ajoutez y les épices, le sucre et les rondelles d'oanges. <br>" +
            "Laissez cuire 1 heure environ. Remuez de temps en temps.";
        ingr = "- 1 bouteille de 75 cl de vin rouge : Madiran, Cahors, Bordeaux rouge (au choix) <br>" +
        "- 2 oranges <br>" +
        "- 1 cuillère à café de cannelle en poudre <br>" +
        "- 1 cuillère à café de gingembre en poudre <br>" +
        "- 1 cuillère à café de quatre épices <br>" +
        "- 5 cl de Cognac <br>" +
        "- 200g de sucre roux";
        diff = "Moyen";
        break;
      case 29:
        plat = "Spaghettis Bolognaise";
        desc = "Dans une casserole, faites chauffer l'huile d'olive et jetez-y les oignons détaillés. <br>" +
            "Faites-les cuire à feu doux le temps qu'ils deviennent translucides. <br>" +
            "Ajoutez l'ail détaillé à la fin juste le temps qu'il dore très légèrement sans qu'il ne brûle. <br>" +
            "Mettez les tomates dans la casserole et portez sur feu moyen à fort. <br>" +
            "Laissez mijoter 20 minutes en ajoutant l'origan, le basilic, le sel, le poivre, le piment de Cayenne et le sucre selon les goûts. <br>" +
            "Baissez le feu en remuant pour faire réduire la sauce. Réservez. <br>" +
            "Faites cuire la viande dans une poêle après l'avoir assaisonnée. <br>" +
            "Pensez à bien retirer le jus de la viande.<br>" +
            "Mélangez la viande à la sauce et mélangez le tout aux pâtes cuites al dente.";
        ingr = "- 600g de viande de boeuf hachée <br>" +
        "- 1 boîte de tomates pelées de 800g environ <br>" +
        "- 2 oignons <br>" +
        "- 2 gousses d'ail <br>" +
        "- 2 cuillères à soupe d'huile d'olive <br>" +
        "- 1 cuillère à soupe d'origan <br>" +
        "- Quelques feuilles de basilic <br>" +
        "- 2 à 3 morceaux de sucre <br>" +
        "- Du piment de Cayenne <br>" +
        "- Du sel  <br>" +
        "- Du poivre <br>" +
        "- 400g de spaghettis";
        diff = "Facile";
        break;
      case 30:
        plat = "Verrine de saumon fumé et ricotta";
        desc = "Détaillez en lamelles puis en petits rectangles le saumon fumé. <br>" +
            "Ciselez la ciboulette ainsi que l'aneth.<br>" +
            "Mélangez dans un bol le jus de citron, la ricotta, la crème fraîche, les herbes. <br>" +
            "Si vous le souhaitez, poivrez un peu. <br>" +
            "Ajoutez le saumon fumé en en gardant pour le décor. <br>" +
            "Mélangez bien." +
            "A l'aide d'une poche à douille à embout large, remplissez les verres à cocktail de la préparation. <br>" +
            "C'est ce qui fait l'élégance de la verrine. <br>" +
            "Puis terminez par deux rectangles de saumon fumé et une pluche d'aneth. " +
            "<br>Servez !!";
        ingr = "Pour 4 verres à vodka : <br>" +
        "- 1 tranche de saumon fumé <br>" +
        "- 2 cuillères à soupe de crème fraîche <br>" +
        "- 3 cuillères à soupe de ricotta <br>" +
        "- Une vingtaine de brins de ciboulette <br>" +
        "- 5 branches d'aneth <br>" +
        "- 1/4 de jus de citron";
        diff = "Difficile";
        break;
      case 31:
        plat = "Îles flottantes";
        desc = "Séparez les blancs d'oeufs des jaunes. <br>" +
            "Montez les blancs en neige bien ferme en y ajoutant une pincée de sel, puis 70g de sucre. <br>" +
            "Faites frémir le lait et la vanille, et plongez-y les quenelles de blancs battus réalisées à l'aide de deux cuillères. <br>" +
            "Laissez-les pocher 1 à 2 minutes en les retournant, puis sortez-les à l'écumoire et posez-les sur du papier absorbant.<br>" +
            "Battez les jaunes d'oeufs et le reste du sucre (100g) jusqu'à ce que le mélange blanchisse et soit mousseux. <br>" +
            "Mélangez cet appareil au lait (auquel vous avez retirez la gousse de vanille) en fouettant énergiquement. <br>" +
            "Sans jamais arriver à ébullition, chauffez à feu doux en remuant jusqu'à ce que la crème épaississe et nappe le dos d'une cuillère en bois. <br>" +
            "Une fois que la crème est à consistance, transvasez-la dans un plat de service ou un saladier pour que la cuisson s'arrête.<br>" +
            "Versez les 50g de sucre restants dans une casserole et faites chauffer à feu doux jusqu'à obtention d'un caramel (vous pouvez également utiliser du caramel déjà prêt).";
        ingr = "- 6 oeufs <br>" +
        "- 1/2 litre de lait <br>" +
        "- 170g de sucre + 50 g pour le caramel <br>" +
        "- Une gousse de vanille <br>" +
        "- Une pincée de sel";
        diff = "Moyen";
        break;

    }

    document.getElementById("hasardtitre").innerHTML = plat;
    document.getElementById("hasarddiff").innerHTML = diff;
    document.getElementById("hasarddesc").innerHTML = desc;
    document.getElementById("hasardingr").innerHTML = ingr;



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
})



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

// Geolocalisation

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function (error) {
    console.log("Could not get location");

    google.maps.event.addListenerOnce($scope.map, 'idle', function () {

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });

    })
  })
});