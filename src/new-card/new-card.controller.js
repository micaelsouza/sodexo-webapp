'use strict';

export default class NewCardController {
  constructor($scope, $location, $timeout, cardsAPI) {
    Object.assign(this, {$scope, $location, $timeout, cardsAPI});

    this.title = 'Adicionar novo cartão';
  }

  saveCardNumber(number) {
    if (!number) return;

    sessionStorage.setItem('number', number);
    this.$timeout(() => {
      this.$location.path('/new/document');
    }, 1);
  }

  saveDocumentNumber(cpf) {
    if (!cpf) return;

    sessionStorage.setItem('cpf', cpf);
    this.addCard();
  }

  addCard() {
    let number = sessionStorage.getItem('number');
    let cpf = sessionStorage.getItem('cpf');

    if (number && cpf) {
      this.cardsAPI
      .addCard(number, cpf)
      .then(card => {
        this.$timeout(() => {
          this.$location.path('/')
        }, 1);
      })
      .catch(err => {
        alert(err);
      })
    } else {
      this.$timeout(() => {
        this.$location.path('/');
      }, 1);
    }
  }
}

NewCardController.$inject = [
  '$scope',
  '$location',
  '$timeout',
  'cardsAPI'
];
