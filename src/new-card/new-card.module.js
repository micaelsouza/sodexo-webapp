'use strict';

import NewCardController from './new-card.controller';
import NewCardConfig from './new-card.config';

export default angular
  .module('app.new-card', [])
  .config(NewCardConfig)
  .controller('NewCardController', NewCardController)
  .name;
