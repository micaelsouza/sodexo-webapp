(function () {
  'use strict';

  angular
    .module('sodexoApp')
    .controller('cardsController', cardController);

  function cardController ($scope, $location, cardsAPI) {

    /* jshint validthis: true */
    var vm = this;
    vm.title = 'Meus cartões';
    vm.cards = cardsAPI.getCards();
    vm.updateAllCards = updateAllCards;
    vm.cardDetail = cardDetail;


    function updateAllCards () {
      cardsAPI
        .updateAllCards()
        .then(function () {
          vm.cards = cardsAPI.getCards();
          $scope.$apply();
        });
    }

    function cardDetail (card) {
      $location.path('/balance/' + card.id);
    }

  }

})();
