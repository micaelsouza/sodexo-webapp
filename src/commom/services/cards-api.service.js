'use strict';

// recupera dados do cartão na api
function _fetchCard(number, cpf) {
  return this.$http({
    url: `${this.urlApi}/saldo`,
    method: 'POST',
    data: `card=${number}&document=${cpf}`,
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  })
}

// capitaliza o texto passado por parâmetro
function _capitalize(val) {
  let textCapitalized = '';

  val.split(' ').forEach(function (str) {
    str = str.toLowerCase();

    if (/[^(da|de|di|do|du|e)]/.test(str)) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }

    textCapitalized += str + ' ';
  })

  return textCapitalized.trim();
}

// retorna um array com o número do cartão separado em 4 sequências
// ex: **** **** **** 5678
function _formatCardNumber(val) {
  return [
    val.substring(0,4),
    val.substring(4,8),
    val.substring(8,12),
    val.substring(12)
  ];
}

// retorna o nome do serviço sem erros de acentuação
function _formatServiceName(val) {
  let textFormated = '';

  switch (val.toLowerCase()) {
    case 'refeicao':
      textFormated = 'Refeição';
      break;

    case 'alimentacao':
      textFormated = 'Alimentação';
      break;

    default:
      textFormated = _capitalize(val);
  }

  return textFormated;
}

// separa o tipo da moeda e o valor e retona em um objeto
function _formatBalance(val) {
  return {
    currency: val.split(' ')[0],
    value: val.split(' ')[1]
  };
}

class CardsAPI {
  constructor($http, $location, idGenerator) {
    Object.assign(this, {$http, $location, idGenerator});
    this.urlApi = this.getUrlApi();
  }

  getUrlApi() {
    if (this.$location.host() === 'localhost') {
      return 'http://localhost:5000/api';
    }

    return 'https://sodexo.herokuapp.com/api';
  }

  addCard(number, cpf) {
    let cards = this.getAllCards();

    return new Promise((resolve, reject) => {
      _fetchCard
        .call(this, number, cpf)
        .then((res) => {
          if (res.data.returnCode === 0) {
            var card = res.data

            card.id = this.idGenerator();

            card.cardNumberFormated = _formatCardNumber(card.cardNumber);
            card.serviceNameFormated = _formatServiceName(card.serviceName);
            card.balance = _formatBalance(card.balanceAmount);
            card.nameFormated = _capitalize(card.name);

            card.transactions.map((transaction) => {
              transaction.history = _capitalize(transaction.history);
              return transaction;
            })

            cards.push(card);
            localStorage.setItem('cards', JSON.stringify(cards));

            resolve(card);
          } else {
            reject(res.data.returnMessage);
          }
        });
    });
  }

  removeCard(cardId) {
    return new Promise((resolve, reject) => {
      let cards = this.getAllCards();

      let cardsUpdated = cards.filter((card) => {
        return card.id !== cardId;
      });

      localStorage.setItem('cards', JSON.stringify(cardsUpdated));

      resolve(cardsUpdated);
    });
  }

  getCard(cardId) {
    return new Promise((resolve, reject) => {
      let cards = this.getAllCards();

      let card = cards.filter((card) => {
        return card.id == cardId;
      })[0];

      resolve(card);
    });
  }

  getAllCards() {
    let cards = localStorage.getItem('cards');

    if (cards) {
      return JSON.parse(cards);
    }

    return [];
  }

  updateAllCards() {
    let cards = this.getAllCards();
    let updatedCards = [];

    return new Promise((resolve, reject) => {
      if (cards.length == 0) {
        resolve(cards);
        return;
      }

      let update = () => {
        let card = cards[0];

        _fetchCard
          .call(this, card.cardNumber, card.document)
          .then((res) => {
            if (res.data.returnCode == 0) {
              card.dateBalance = res.data.dateBalance;
              card.transaction = res.data.transactions;

              card.cardNumberFormated = _formatCardNumber(card.cardNumber);
              card.serviceNameFormated = _formatServiceName(card.serviceName);
              card.balance = _formatBalance(card.balanceAmount);
              card.nameFormated = _capitalize(card.name);

              card.transactions.map((transaction) => {
                transaction.history = _capitalize(transaction.history);
                return transaction;
              });

              updatedCards.push(card);
              cards.shift();

              if (cards.length == 0) {
                localStorage.setItem('cards', JSON.stringify(updatedCards));
                resolve(updatedCards);
                return;
              }

              update();
            }
          });
      };

      update();
    });
  }
}

CardsAPI.$inject = [
  '$http',
  '$location',
  'idGenerator'
];

export default CardsAPI;
