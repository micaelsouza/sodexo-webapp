angular.module('sodexoApp').controller('cardsController', function ($scope, cardsAPI) {

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

  $scope.cards = cardsAPI.getCards();

});
