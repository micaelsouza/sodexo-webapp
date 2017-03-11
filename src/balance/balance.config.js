'use strict';

export default function BalanceConfig($routeProvider) {

  $routeProvider
    .when('/balance/:id', {
      templateUrl: 'src/balance/balance.html',
      controller: 'BalanceController',
      controllerAs: 'ctrl'
    });

}

BalanceConfig.$inject = [
  '$routeProvider'
];
