angular.module('sodexoApp').factory('cardsAPI', function ($http, idGenerator) {

  function addCard(card) {
    return new Promise(function(resolve, reject) {
      if (!card) throw('[cardsAPI] falta um parâmetro obrigatório!');

      var cards = getCards();

      fetchAPI(card)
        .then(function (res) {
          if (res.data.returnCode == 0) {
            var _card = res.data;
            _card.id = idGenerator();
            cards.push(_card);
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
        fetchAPI(card).then(function (res) {
          if (res.data.returnCode == 0) {
            card.balance = res.data.balanceAmount.replace('R$ ', '');
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
      $.param({card: card.number, document: card.document}),
      {headers: {'content-type': 'application/x-www-form-urlencoded'}}
    );
  }

  return {
    addCard: addCard,
    removeCard: removeCard,
    getCards: getCards,
    updateAllCards: updateAllCards,
    fetchAPI: fetchAPI
  };

});
