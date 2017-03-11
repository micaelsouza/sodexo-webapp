'use strict';

import BalanceController from './balance.controller';
import BalanceConfig from './balance.config';

export default angular
  .module('app.balance', [])
  .config(BalanceConfig)
  .controller('BalanceController', BalanceController)
  .name;
