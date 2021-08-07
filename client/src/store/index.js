import { createStore } from 'vuex';

import user from '../store/modules/user';
import order from '../store/modules/order';

const store = createStore({
  modules: {
    user,
    order,
  },
});

export default store;
