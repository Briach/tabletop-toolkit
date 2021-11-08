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
        var cookieConsentExDays = 30
        var d = new Date();
        d.setTime(d.getTime() + (cookieConsentExDays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = state.cookieConsentName + "=" + value + ";" + expires + ";path=/";
      }
      else {
        document.cookie = state.cookieConsentName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT";path=/';
      }
    }
  },
  getters: {
    cookieConsent(state) {
      var name = state.cookieConsentName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
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
