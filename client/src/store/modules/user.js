export default {
  state: {
    user: null,
    token: null,
  },
  getters: {},
  mutations: {
    INIT_STATE(state) {
      state.user = localStorage.getItem('user');
      state.token = localStorage.getItem('token');
    },
    LOGIN_USER(state, payload) {
      state.user = payload.username;
      localStorage.setItem('user', state.user);
      state.token = payload.accessToken;
      localStorage.setItem('token', state.token);
    },
    LOGOUT_USER(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  actions: {
    loginUser({ commit }, data) {
      commit('LOGIN_USER', data);
    },
    logoutUser({ commit }) {
      commit('LOGOUT_USER');
    },
    initState({ commit }) {
      commit('INIT_STATE');
    },
  },
};
