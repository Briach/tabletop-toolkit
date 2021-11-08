<template>
  
  <div class="modal" id="modal-cookie-consent" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <a href="#" class="close" role="button" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
                <h5 class="modal-title">Cookies</h5>
                <div class="form-text">
                    This Site uses only functional cookies to ensure the best experience for you. E.G. if you prefer 
                    light-mode or dark-mode, or the value of your sheets in case you accidently refresh the page. <b>None</b>
                    of your personal data is tracked. 
                </div>
                <div class="text-right mt-20"> <!-- text-right = text-align: right, mt-20 = margin-top: 2rem (20px) -->
                    <!-- <button class="btn btn-secondary mr-5" type="button" v-on:click="onCookiesDeclined()">Decline</button> -->
                    <button class="btn btn-primary ml-5 mr-5" type="button" v-on:click="onCookiesAccepted()">Accept</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
const halfmoon = require('halfmoon');

@Options({
  props: {
    msg: String
  }
})
export default class CookieConsent extends Vue {
  msg!: string

  onCookiesAccepted(): void {
      halfmoon.toggleModal("modal-cookie-consent");
      this.$store.commit('changeCookieConsent', true);
  }
  onCookiesDeclined(): void {
      halfmoon.toggleModal("modal-cookie-consent");
      this.$store.commit('changeCookieConsent', false);
  }
  onCloseModal(): void {
      halfmoon.toggleModal("modal-cookie-consent");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.modal {
    position: fixed;
}

.modal-content {
    hyphens: auto; 
	text-align: justify
}

</style>
