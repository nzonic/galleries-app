export const getters = {
    activeUser: (state) => state.activeUser,
    isAuthenticated: (state) => !!state.token,
    activeUserId: (state) => state.userId
  };