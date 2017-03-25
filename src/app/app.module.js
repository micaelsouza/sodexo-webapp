'use strict';

import config from './app.config';
import run from './app.run';

import common from './../common/common.module';
import home from './../home/home.module';
import newCard from './../new-card/new-card.module';
import balance from './../balance/balance.module';

angular
  .module('app', [
    'ngRoute',
    'ngAnimate',
    'ngMask',
    common,
    home,
    newCard,
    balance
  ])
  .config(config)
  .run(run);
