'use strict';

import config from './app.config';
import run from './app.run';
import ctrl from './app.controller';

import commom from './../commom/commom.module';
import home from './../home/home.module';
import newCard from './../new-card/new-card.module';
import balance from './../balance/balance.module';

angular
  .module('app', [
    'ngRoute',
    'ngAnimate',
    'ngMask',
    commom,
    home,
    newCard,
    balance
  ])
  .controller('AppController', ctrl)
  .config(config)
  .run(run);