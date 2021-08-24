export default {
  state: {
    user: null,
    token: null,
  },
  getters: {},
  mutations: {
    INIT_STATE(state) {
      state.user = JSON.parse(localStorage.getItem('user'));
      state.token = localStorage.getItem('token');
    },
    LOGIN_USER(state, payload) {
      state.user = payload.data;
      localStorage.setItem('user', JSON.stringify({ ...state.user }));
      state.token = payload.accessToken;
      localStorage.setItem('token', state.token);
    },
    LOGOUT_USER(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('order');
    },
    UPDATE_USER(state, payload) {
      if (payload.email !== '') {
        state.user.email = payload.email;
      }
      localStorage.setItem('user', JSON.stringify({ ...state.user }));
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
    updateUser({ commit }, data) {
      commit('UPDATE_USER', data);
    },
  },
};
