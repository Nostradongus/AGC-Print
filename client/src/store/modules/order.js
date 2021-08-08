export default {
  state:{
    orders: [],
  },
  getters:{},
  mutations:{
    SET_ORDER(state, payload){
      state.orders.push(payload);
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
    GET_ORDER(state){
      const orders = localStorage.getItem('order');
      if(orders != null){
        state.orders = JSON.parse(localStorage.getItem('order'));
      }
    },
    RESET_ORDER(state) {
      state.orders = [];
      localStorage.setItem('order', JSON.stringify(state.orders));
      localStorage.removeItem('order');
    },
  },
  actions:{
    setOrder({commit}, data){
      commit('SET_ORDER', data);
    },
    getOrder({commit}){
      commit('GET_ORDER');
    },
    resetOrder({commit}) {
      commit('RESET_ORDER');
    },
  },
}