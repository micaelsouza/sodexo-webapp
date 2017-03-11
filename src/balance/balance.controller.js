'use strict';

export default class BalanceController {
  constructor($scope, $location, $routeParams, $timeout, cardsAPI) {
    Object.assign(this, {$scope, $location, $routeParams, $timeout, cardsAPI});

    let cardId = $routeParams.id;

    this.title = 'Saldo e extrato';

    cardsAPI
      .getCard(cardId)
      .then(card => this.card = card);
  }

  removeCard(card) {
    if (confirm('Deseja realemente remover este cartão?')) {
      this.cardsAPI
      .removeCard(card.id)
      .then(() => {
        this.$timeout(() => {
          this.$location.path('/');
        }, 1);
      });
    };
  }
}

BalanceController.$inject = [
  '$scope',
  '$location',
  '$routeParams',
  '$timeout',
  'cardsAPI'
];
