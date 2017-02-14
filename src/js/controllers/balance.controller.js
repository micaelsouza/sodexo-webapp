angular.module('sodexoApp').controller('cardsController', function ($scope, $location, cardsAPI) {

  $scope.cards = cardsAPI.getCards();
  $scope.isOpen = false;
  $scope.addCardInProgress = false;

  this.addCard = function(card) {
    if ($scope.addCardInProgress) return;

    if ($scope.form.$valid) {
      $scope.addCardInProgress = true;

      cardsAPI
        .addCard(card)
        .then(function () {
          $scope.cards = cardsAPI.getCards();
          $scope.addCardInProgress = false;
          $scope.$apply();
        }, function (err) {
          $scope.addCardInProgress = false;
          $scope.$apply();
          alert(err);
        });

      delete $scope.card;
      $scope.form.$setPristine();
    }

    $scope.isOpen = !$scope.isOpen;
  };

  this.removeCard = function (cards) {
    if (!confirm('Tem certeza de que deseja remover?')) return;

    $scope.cards.forEach(function (card) {
      if (card.selected) {
        cardsAPI
          .removeCard(card)
          .then(function () {
            $scope.cards = cardsAPI.getCards();
            $scope.$apply();
          });
      }
    });
  };

  this.updateAllCards = function () {
    $scope.isUpdating = true;
    cardsAPI
      .updateAllCards()
      .then(function () {
        $scope.cards = cardsAPI.getCards();
        $scope.isUpdating = false;
        $scope.$apply();
      });
  };

  this.selectCard = function (card) {
    card.selected = !card.selected;
  };

  this.someCardSelected = function (cards) {
    return $scope.cards.some(function (card) {
      return card.selected;
    });
  };

  // Atualizando todos os cartões quando o app for carregado
  this.updateAllCards();

});
