'use strict';

export default function NewCardConfig($routeProvider) {

  $routeProvider
    .when('/new/card', {
      templateUrl: 'src/new-card/new-card.card.html',
      controller: 'NewCardController',
      controllerAs: 'ctrl'
    })
    .when('/new/document', {
      templateUrl: 'src/new-card/new-card.document.html',
      controller: 'NewCardController',
      controllerAs: 'ctrl'
    });

}

NewCardConfig.$inject = [
  '$routeProvider'
];
