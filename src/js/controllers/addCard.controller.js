(function () {
  'use strict';

  angular
    .module('sodexoApp')
    .controller('addCardController', addCardController);

  function addCardController ($scope, $location, cardsAPI) {

    /* jshint validthis: true */
    var vm = this;
    vm.title = 'Novo cartão';
    vm.addCard = addCard;
    vm.addCardInProgress = false;

    function addCard (card) {
      if ($scope.form.$valid) {

        vm.addCardInProgress = true;

        cardsAPI
          .addCard({document: card.cpf, number: card.number})
          .then(function (_card) {
            $location.path('/balance/' + _card.id);
            $scope.$apply();
          }, function (err) {
            vm.addCardInProgress = false;
            alert(err);
            $scope.$apply();
          });
      }
    }

  }
})();
