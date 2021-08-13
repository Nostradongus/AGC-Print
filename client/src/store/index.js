import { createStore } from 'vuex';

import user from '../store/modules/user';
import worker from '../store/modules/worker';
import order from '../store/modules/order';

const store = createStore({
  modules: {
    user,
    worker,
    order,
  },
});

export default store;
