(function () {
  'use strict';

  angular
    .module('sodexoApp')
    .factory('cardsAPI', cardsAPI);

  function cardsAPI ($http, idGenerator) {

    function addCard(newCard) {
      return new Promise(function(resolve, reject) {
        if (!newCard) throw('[cardsAPI] falta um parâmetro obrigatório!');

        var cards = getCards();

        fetchAPI({card: newCard.number, document: newCard.cpf})
          .then(function (res) {
            if (res.data.returnCode == 0) {
              var card = res.data;

              // formatando número do cartão
              card.cardNumberFormated = formatCardNumber(card.cardNumber);

              // formatando nome do serviço
              card.serviceNameFormated = formatServiceName(card.serviceName);

              // formatando valor
              card.balance = formatBalance(card.balanceAmount);

              // formatando nome
              card.nameFormated = capitalize(card.name);

              // formatando nome do estabelecimento
              card.transactions.map(function (transaction) {
                transaction.history = capitalize(transaction.history);
                return transaction;
              });

              // setando id do cartão
              card.id = idGenerator();

              // adicionando e salvando o novo cartão
              cards.push(card);
              localStorage.setItem('cards', JSON.stringify(cards));

              resolve(card);
            } else {
              reject(res.data.returnMessage);
            }
          });
      });
    }

    function removeCard(card) {
      return new Promise(function(resolve) {
        if (!card) throw('[cardsAPI] falta um parâmetro obrigatório!');

        var cards = getCards().filter(function (_card) {
          return _card.id != card.id;
        });

        localStorage.setItem('cards', JSON.stringify(cards));
        resolve();
      });
    }

    function getCards() {
      if (localStorage.getItem('cards') && localStorage.getItem('cards') != 'undefined') {
        return JSON.parse(localStorage.getItem('cards'));
      } else {
        return [];
      }
    }

    function updateAllCards() {
      var cards = getCards();
      var updatedCards = [];

      return new Promise(function (resolve, reject) {
        if (cards.length == 0) {
          resolve();
          return;
        };

        (function update() {
          var card = cards[0];

          fetchAPI({card: card.cardNumber, document: card.document}).then(function (res) {
            if (res.data.returnCode == 0) {
              card.dateBalance = res.data.dateBalance;
              card.transactions = res.data.transactions;

              // formatando valor
              card.balance = formatBalance(res.data.balanceAmount);

              // formatando nome do estabelecimento
              card.transactions.map(function (transaction) {
                transaction.history = capitalize(transaction.history);
                return transaction;
              });
            }

            updatedCards.push(card);
            cards.shift();

            if (!cards[0]) {
              localStorage.setItem('cards', JSON.stringify(updatedCards));
              resolve();
              return;
            };

            update();
          });
        })();
      });
    }

    function fetchAPI(card) {
      return $http.post(
        'https://sodexo.herokuapp.com/api/saldo',
        $.param(card),
        {headers: {'content-type': 'application/x-www-form-urlencoded'}}
      );
    }

    function capitalize(string, limit) {
      var textCapitalized = '';

      string.split(' ').forEach(function (_string) {
        _string = _string.toLowerCase();

        if (/[^(da|de|di|do|du|e)]/.test(_string)) {
          _string = _string.charAt(0).toUpperCase() + _string.slice(1);
        }

        textCapitalized += _string + ' ';
      });

      return textCapitalized.trim();
    }

    function formatServiceName(string) {
      var textFormated = '';
      switch (string.toLowerCase()) {
        case 'refeicao':
          textFormated = 'Refeição';
          break;

        case 'alimentacao':
          textFormated = 'Alimentação';
          break;

        default:
          textFormated = capitalize(string);
      }

      return textFormated;
    }

    function formatBalance(string) {
      return {
        currency: string.split(' ')[0],
        value: string.split(' ')[1]
      };
    }

    function formatCardNumber(number) {
      return [
        number.substring(0,4),
        number.substring(4,8),
        number.substring(8,12),
        number.substring(12)
      ];
    }

    return {
      addCard: addCard,
      removeCard: removeCard,
      getCards: getCards,
      updateAllCards: updateAllCards,
      fetchAPI: fetchAPI
    };

  }

})();
