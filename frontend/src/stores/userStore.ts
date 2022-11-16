import { defineStore } from 'pinia';
import { genericModel } from '../types';
const userStore = defineStore('user', {
  state: () => ({
    user: {} as genericModel,
    token: '',
  }),
  actions: {
    verifyUser() {
      const tokenLocal = localStorage.getItem('token');
      const userLocal = localStorage.getItem('user') || '';
      if (!this.token) {
        if (tokenLocal && tokenLocal.length > 0) {
          this.token = tokenLocal;
          this.user = JSON.parse(userLocal);
        }
      }
    },
  },
});
export default userStore;
