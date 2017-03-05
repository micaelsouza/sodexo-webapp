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

    function addCard (card) {
      if ($scope.form.$valid) {

        cardsAPI
          .addCard(card)
          .then(function (_card) {
            $location.path('/balance/' + _card.id);
            $scope.$apply();
          }, function (err) {
            alert(err);
            $scope.$apply();
          });
      }
    }

  }
})();
