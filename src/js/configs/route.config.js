angular.module('sodexoApp').config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/dist/views/index.html',
      controller: 'cardsController',
      controllerAs: 'cardCtrl'
    })
    .when('/add', {
      templateUrl: '/dist/views/add-card.html',
      controller: 'addCardController',
      controllerAs: 'addCardCtrl'
    })
    .when('/balance/:id', {
      templateUrl: '/dist/views/balance.html',
    })
    .otherwise({redirectTo: '/'});

});
