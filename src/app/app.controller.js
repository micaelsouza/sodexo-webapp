'use strict';

export default class AppController {
  constructor($scope, $location) {
    Object.assign(this, {$scope, $location});
  }
}

AppController.$inject = [
  '$scope',
  '$location'
];
