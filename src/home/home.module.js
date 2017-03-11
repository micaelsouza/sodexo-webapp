'use strict';

import HomeController from './home.controller';
import HomeConfig from './home.config';

export default angular
  .module('app.home', [])
  .config(HomeConfig)
  .controller('HomeController', HomeController)
  .name;
