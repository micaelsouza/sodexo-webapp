'use strict';

export default class HomeController {
  constructor($scope, $location, $timeout, cardsAPI) {
    Object.assign(this, {$scope, $location, $timeout, cardsAPI});

    this.title = 'Meus cartões';
    this.cards = cardsAPI.getAllCards();

    this.updateAllCards();
  }

  updateAllCards() {
    this.cardsAPI
      .updateAllCards()
      .then((cards) => {
        this.cards = cards;
      });
  }

  cardDetail(card) {
    this.$timeout(() => {
      this.$location.path(`/balance/${card.id}`);
    }, 1);
  }
}

HomeController.$inject = [
  '$scope',
  '$location',
  '$timeout',
  'cardsAPI'
];
