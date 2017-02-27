(function () {
  'use strict';

  angular
    .module('sodexoApp', ['ngRoute', 'ngAnimate'])
    .run(function ($rootScope, $timeout) {
      $rootScope.$on('$viewContentLoaded', function () {
        componentHandler.upgradeAllRegistered();
      });
    });

})();
