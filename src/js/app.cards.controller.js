angular.module('sodexoApp').controller('cardsController', function ($scope, cardsAPI) {

  $scope.cards = cardsAPI.getCards();
  $scope.isOpen = false;
  $scope.addCardInProgress = false;

  $scope.addCard = function(card) {
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

  $scope.removeCard = function (cards) {
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

  $scope.updateAllCards = function () {
    $scope.isUpdating = true;
    cardsAPI
      .updateAllCards()
      .then(function () {
        $scope.cards = cardsAPI.getCards();
        $scope.isUpdating = false;
        $scope.$apply();
      });
  };

  $scope.selectCard = function (card) {
    card.selected = !card.selected;
  };

  $scope.someCardSelected = function (cards) {
    return $scope.cards.some(function (card) {
      return card.selected;
    });
  };

  // Atualizando todos os cartões quando o app for carregado
  $scope.updateAllCards();

});
