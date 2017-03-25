'use strict';

import IdGenerator from './services/id-generator.service';
import CardsAPI from './services/cards-api.service';
import CardComponent from './components/card/card.component';
import LoadingInterceptor from './interceptors/loading.interceptor';



export default angular
  .module('app.common', [])
  .service('idGenerator', IdGenerator)
  .service('cardsAPI', CardsAPI)
  .component('card', CardComponent)
  .factory('loadingInterceptor', LoadingInterceptor)
  .name;
