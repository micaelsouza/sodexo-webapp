'use strict';

export default function HomeConfig($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'src/home/home.html',
      controller: 'HomeController',
      controllerAs: 'ctrl'
    });

}

HomeConfig.$inject = [
  '$routeProvider'
];
