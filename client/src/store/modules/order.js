export default {
  state: {
    orders: [],
    orderSet: null,
    confirmedOrders: null,
  },
  getters: {},
  mutations: {
    SET_ORDER(state, payload) {
      state.orders.push(payload);
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
    DELETE_ORDER(state, payload) {
      state.orders.splice(payload, 1);
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
    SET_ORDER_CONFIRMED(state, payload) {
      state.orderSet = payload;
      state.confirmedOrders = JSON.parse(localStorage.getItem('order'));
      localStorage.setItem('orderSet', JSON.stringify(state.orderSet));
      localStorage.setItem('confirmedOrders', JSON.stringify(state.confirmedOrders));
    },
    GET_ORDER(state) {
      const orders = localStorage.getItem('order');
      console.log(orders);
      if (orders != null) {
        console.log('passing through');
        state.orders = JSON.parse(localStorage.getItem('order'));
      }
    },
    RESET_ORDER(state) {
      state.orders = [];
      localStorage.setItem('order', JSON.stringify(state.orders));
      localStorage.removeItem('order');
    },
  },
  actions: {
    setOrder({ commit }, data) {
      commit('SET_ORDER', data);
    },
    deleteOrder({ commit }, data) {
      commit('DELETE_ORDER', data);
    },
    setOrderConfirmed({ commit }, data) {
      commit('SET_ORDER_CONFIRMED', data);
    },
    getOrder({ commit }) {
      commit('GET_ORDER');
    },
    resetOrder({ commit }) {
      commit('RESET_ORDER');
    },
  },
};
