angular.module('sodexoApp').factory('idGenerator', function () {
  return function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
});
