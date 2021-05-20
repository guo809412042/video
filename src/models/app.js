import cookie from 'js-cookie';

export default {
  namespace: 'app',
  state: {
    loading: false,
    user: JSON.parse(cookie.get('user') || localStorage.getItem('user')),
  },
  // subscriptions: {
  //   setup({ dispatch }) {
  //     // dispatch({ type: 'initApp' });
  //   },
  // },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
