'use strict';

export default function AppConfig ($routeProvider, $httpProvider) {

  $routeProvider.otherwise({redirectTo: '/'});

  $httpProvider.interceptors.push('loadingInterceptor');

}

AppConfig.$inject = [
  '$routeProvider',
  '$httpProvider'
];
