import { createStore } from 'vuex'

export default createStore({
  state: {
    cookieConsent: false,
    cookieConsentName: "cookie-consent",
    apiUrl: "https://devapi.tabletop-toolkit.com"
  },
  mutations: {
    changeCookieConsent(state, value) {
      if (value) {
        const cookieConsentExDays = 30
        const d = new Date();
        d.setTime(d.getTime() + (cookieConsentExDays*24*60*60*1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = state.cookieConsentName + "=" + value + ";" + expires + ";path=/";
      }
      else {
        document.cookie = state.cookieConsentName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT";path=/';
      }
    }
  },
  getters: {
    cookieConsent(state) {
      const name = state.cookieConsentName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return false;
    },
    apiUrl(state) {
      return state.apiUrl;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
