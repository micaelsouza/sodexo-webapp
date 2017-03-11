'use strict';

export default function AppRun ($rootScope, $location, $timeout) {
  $rootScope.theme = {color: ''};

  $rootScope.$on('$viewContentLoaded', () => {
    componentHandler.upgradeAllRegistered();

    $timeout(() => {
      switch ($location.path()) {
        case '/new/card':
          $rootScope.theme.color = '#439fe0';
          break;

        case '/new/document':
          $rootScope.theme.color = '#2ab27b';
          break;

        default:
          $rootScope.theme.color = '#ffffff';
      }
    }, 1);
  });

}

AppRun.$inject = [
  '$rootScope',
  '$location',
  '$timeout'
];
