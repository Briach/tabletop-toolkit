<template>

  <cookie-consent></cookie-consent>
  
  <div id="page-wrapper" class="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom"
       data-sidebar-type="overlayed-all">

    <!-- Sticky alerts -->
    <div class="sticky-alerts"></div>

    <!-- Navbar start -->
    <nav class="navbar">
      <div class="navbar-content">
        <button id="toggle-sidebar-btn" class="btn btn-action" type="button" onclick="halfmoon.toggleSidebar()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <router-link to="/" class="navbar-brand mx-auto">
        <i class="fas fa-dice"></i>&nbsp;<span class="d-none d-sm-flex">Tabletop Toolkit</span>
      </router-link>
      <div class="navbar-content">
        <button id="toggle-darkmode-btn" class="btn btn-action mr-5" type="button" onclick="halfmoon.toggleDarkMode()">
          <i class="fa fa-moon-o" aria-hidden="true"></i>
          <span class="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </nav>
    <!-- Navbar end -->

    <!-- Sidebar overlay -->
    <div class="sidebar-overlay" onclick="halfmoon.toggleSidebar()"></div>

    <!-- Sidebar start -->
    <div class="sidebar mt-auto mb-auto d-flex ml-15">
      <div class="sidebar-menu my-auto">

        <h5 class="sidebar-title mt-15">Board and Card Games</h5>
        <div class="sidebar-divider"></div>

        <router-link to="/sheets/countpoints" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">📝</span>
          Count Points
        </router-link>

        <router-link to="/sheets/countwins" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">📄</span>
          Count Wins
        </router-link>

        <router-link to="/timers/timer" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">⏱️</span>
          Timer
        </router-link>

        <h5 class="sidebar-title mt-15">Tabletop RPGs</h5>
        <div class="sidebar-divider"></div>

        <router-link to="/trpg/lootlist" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">⚔️</span>
          Loot List
        </router-link>

        <router-link to="/trpg/lootgenerator" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">💰</span>
          Loot Generator
        </router-link>

        <router-link to="/trpg/addloot" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">➕</span>
          Add Loot
        </router-link>

        <h5 class="sidebar-title mt-15">External Resources</h5>
        <div class="sidebar-divider"></div>

        <a href="https://tabletopaudio.com/" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">🔊</span>
          Tabletop Audio
        </a>

        <a href="https://watabou.itch.io/medieval-fantasy-city-generator" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">🗺️</span>
          Medieval City Generator
        </a>

        <a href="https://0x72.itch.io/paperdungeonmaker" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">🏰</span>
          Paper Dungeon Maker
        </a>

        <a href="https://www.fantasynamegenerators.com/" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">📛</span>
         Fantasy Name Generator
        </a>

        <a href="https://piecewise.itch.io/elder-god-generator" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">🐙</span>
         Elder God Generator
        </a>

        <div class="sidebar-notice">I am in no way associated with or have any kind of control over these external websites and the content they publish.</div>

        <h5 class="sidebar-title mt-15">Settings</h5>
        <div class="sidebar-divider"></div>

        <a href="#" class="sidebar-link sidebar-link-with-icon" v-on:click="openCookies()">
          <span class="sidebar-icon">🍪</span>
          Cookie Options
        </a>

      </div>
    </div>
    <!-- Sidebar end -->

    <!-- Content wrapper start -->
    <div class="content-wrapper d-flex" wfd-id="4">

        <router-view />

    </div>
    <!-- Content wrapper end -->

    <!-- Navbar fixed bottom start -->
    <nav class="navbar navbar-fixed-bottom">
           <span class="navbar-text" style="display: inline">
                Made with <i class="fas fa-heart"></i> and <i class="fas fa-coffee"></i> by <a href="https://twitter.com/FabianBrecht_">Fabian Brecht</a>
            </span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/impressum" class="nav-link" style="color:#ffffff">
            <i class="fa fa-question-circle-o mr-5" aria-hidden="true"></i>
            Impressum
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- Navbar fixed bottom end -->

  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as halfmoon from 'halfmoon';
import CookieConsent from './components/CookieConsent.vue';

@Options({
  components: {
    CookieConsent,
  },
})
export default class Home extends Vue {
  
  mounted() {
    halfmoon.onDOMContentLoaded();

    if (!this.$store.getters.cookieConsent) {
      halfmoon.toggleModal("modal-cookie-consent");
    }
  }

  openCookies(): void {
    halfmoon.toggleSidebar();
    halfmoon.toggleModal("modal-cookie-consent");
  }
}
  
</script>

<style lang="scss">

body {
    font-family: 'Montserrat', sans-serif;
}

.sidebar {
    height: 95% !important;
}

.sidebar {
  overflow: hidden;
}
.sidebar-menu {
  overflow: auto;
  height: 90%;
}

h4.sidebar-title {
   font-size: 1.5rem;
 }
 h5.sidebar-title {
   font-size: 1.3rem;
 }

 .sidebar-notice {
   padding: var(--sidebar-link-padding);
  margin: var(--sidebar-link-margin);
  font-size: 1rem;
 }

.sidebar-divider {
   background-color: rgba(0, 0, 0, 0.2);
 }
 .sidebar-divider.big {
   height: 2px;
   background-color: rgba(0, 0, 0, 0.4);
 }

#freepik_stories-game-day {
  margin-top: -15%;
}

#toggle-sidebar-btn, #toggle-darkmode-btn {
  border-radius: 50%;
  height: var(--navbar-action-button-width);
}

.navbar {
  background-color: var(--primary-color);
  color: #ffffff;
}

.navbar.navbar-fixed-bottom {
  background-color: #212529;
  color: #ffffff
}

.sidebar {
  border-radius: 35px;
  border-top: var(--sidebar-border-width) solid var(--lm-sidebar-border-color);
  border-bottom: var(--sidebar-border-width) solid var(--lm-sidebar-border-color);
  -webkit-box-shadow: 6px 0px 35px 5px rgba(74,74,74,0.41); 
  box-shadow: 6px 0px 35px 5px rgba(74,74,74,0.41);
}

:root {
    /* Space Purple */

    --space-purple-color: #24124b;
    --space-purple-color-light: #3b1e7b;
    --space-purple-color-very-light: #6332cd;
    --space-purple-color-dark: #1e0f3e;
    --space-purple-color-very-dark: #140a29;
    --space-purple-box-shadow-color: rgba(40, 20, 82, 0.3);
    --space-purple-box-shadow-color-darker: rgba(59, 30, 123, 0.6);
    --text-color-on-space-purple-color-bg: #ffffff;

    /* Space Blue */

    --space-blue-color: #4f568a;
    --space-blue-color-light: #6d74ab;
    --space-blue-color-very-light: #8e93be;
    --space-blue-color-dark: #414771;
    --space-blue-color-very-dark: #2f3351;
    --space-blue-box-shadow-color: rgba(61, 69, 126, 0.3);
    --space-blue-box-shadow-color-darker: rgba(65, 71, 113, 0.6);
    --text-color-on-space-blue-color-bg: #ffffff;

    /* Space Pink */

    --space-pink-color: #f4649f;
    --space-pink-color-light: #f788b6;
    --space-pink-color-very-light: #f8a0c5;
    --space-pink-color-dark: #f0287c;
    --space-pink-color-very-dark: #bf0d57;
    --space-pink-box-shadow-color: rgba(244, 100, 159, 0.3);
    --space-pink-box-shadow-color-darker: rgba(244, 100, 159, 0.6);
    --text-color-on-space-pink-color-bg: #ffffff;


    --primary-color: var(--space-blue-color);
    --primary-color-light: var(--space-blue-color-light);
    --primary-color-very-light: var(--space-blue-color-very-light);
    --primary-color-dark: var(--space-blue-color-dark);
    --primary-color-very-dark: var(--space-blue-color-very-dark);
    --primary-box-shadow-color: var(--space-blue-box-shadow-color);
    --primary-box-shadow-color-darker: var(--space-blue-box-shadow-color-darker);
    --text-color-on-primary-color-bg: var(--text-color-on-space-blue-color-bg);

    --secondary-color: var(--space-pink-color);
    --secondary-color-light: var(--space-pink-color-light);
    --secondary-color-very-light: var(--space-pink-color-very-light);
    --secondary-color-dark: var(--space-pink-color-dark);
    --secondary-color-very-dark: var(--space-pink-color-very-dark);
    --secondary-box-shadow-color: var(--space-pink-box-shadow-color);
    --secondary-box-shadow-color-darker: var(--space-pink-box-shadow-color-darker);
    --text-color-on-secondary-color-bg: var(--text-color-on-space-pink-color-bg);


    --lm-navbar-text-color: var(--dm-base-text-color-light);
    --lm-navbar-brand-text-color: #ffffff;
    --lm-navbar-brand-text-color-hover: #f3f3f3;
    --dm-sidebar-link-text-color-active: var(--primary-color-very-light);
}

</style>
