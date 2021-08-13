export default {
    state: {
      worker: null,
      token: null,
    },
    getters: {},
    mutations: {
      INIT_STATE(state) {
        state.worker = JSON.parse(localStorage.getItem('worker'));
        state.token = localStorage.getItem('token');
      },
      LOGIN_WORKER(state, payload) {
        state.worker = payload.data;
        localStorage.setItem('worker', JSON.stringify({...state.worker}));
        state.token = payload.accessToken;
        localStorage.setItem('token', state.token);
      },
      LOGOUT_WORKER(state) {
        localStorage.removeItem('worker');
        localStorage.removeItem('token');
      },
    },
    actions: {
      loginWorker({ commit }, data) {
        commit('LOGIN_WORKER', data);
      },
      logoutWorker({ commit }) {
        commit('LOGOUT_WORKER');
      },
      initState({ commit }) {
        commit('INIT_STATE');
      },
    },
  };
  