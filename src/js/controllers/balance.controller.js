(function () {
  'use strict';

  angular
    .module('sodexoApp')
    .controller('balanceController', balanceController);

  function balanceController ($scope, $routeParams, $location, cardsAPI) {

    var cardId = $routeParams.id;
    /* jshint validthis: true */
    var vm = this;
    vm.title = 'Saldo';
    vm.removeCard = removeCard;

    function removeCard (card) {
      if (confirm('Deseja realmente excluir este cartão?')) {
        cardsAPI
        .removeCard(card)
        .then(function () {
          $location.path('/');
          $scope.$apply();
        });
      }
    }

    // TODO: Depois, migrar esse filtro para o cardsAPI
    vm.card = cardsAPI.getCards().filter(function (card) {
      return card.id == cardId;
    })[0];
  }
})();
