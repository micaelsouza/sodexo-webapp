'use strict';

export default function  LoadingInterceptor($q, $rootScope, $timeout) {
  return {
    request: function (config) {
      $rootScope.isLoading = true;
      return config;
    },
    requestError: function (rejection) {
      $rootScope.isLoading = false;
      return $q.reject(rejection);
    },
    response: function (config) {
      $timeout(function () {
        $rootScope.isLoading = false;
      }, 500);
      return config;
    },
    responseError: function (rejection) {
      $rootScope.isLoading = false;
      return $q.reject(rejection);
    }
  };
}

LoadingInterceptor.$inject = [
  '$q',
  '$rootScope',
  '$timeout'
]
