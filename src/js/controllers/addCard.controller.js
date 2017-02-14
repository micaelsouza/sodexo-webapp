angular.module('sodexoApp').controller('addCardController', function ($scope, $location, cardsAPI) {

  $scope.addCardInProgress = false;

  this.addCard = function(card) {
    if ($scope.addCardInProgress) return;

    if ($scope.form.$valid) {
      $scope.addCardInProgress = true;

      cardsAPI
        .addCard({document: card.cpf, number: card.number})
        .then(function (card) {
          delete $scope.card;
          $scope.form.$setPristine();
          $scope.addCardInProgress = false;
          $location.path('/balance/' + card.id);
          $scope.$apply();
        }, function (err) {
          $scope.addCardInProgress = false;
          $scope.$apply();
          alert(err);
        });
    }

};

});
