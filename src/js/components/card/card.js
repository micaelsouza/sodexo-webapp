(function () {
  'use strict';

  angular
    .module(`sodexoApp`)
    .component('card', {
      bindings: {data: '='},
      templateUrl: 'dist/views/card.html'
    });

})();
