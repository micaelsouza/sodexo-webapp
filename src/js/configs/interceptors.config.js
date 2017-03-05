(function () {
  'use strict';

  angular
    .module('sodexoApp')
    .config(config);

  function config ($httpProvider) {
    $httpProvider.interceptors.push('loadingInterceptor');
  }

})();
