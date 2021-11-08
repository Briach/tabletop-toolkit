<template>
  
  <div class="container-fluid mt-20" wfd-id="5">

    <add-players @players-added="onPlayersAdded"></add-players>

    <div class="row mb-5 justify-content-center" v-if="players.length > 0">
        <div class="col-11 col-md-10 col-lg-8 text-center">
            <!-- Striped rows -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="text-center">Round</th>
                        <th class="text-center" v-for="player in players" :key="player"> {{ player.name }} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(round, index) in rounds" :key="round">
                        <th class="text-center"> {{ round }} </th>
                        <td class="text-center" v-for="player in players" :key="player">
                            <div class="form-group">
                            <input type="number" default="0" placeholder="0" class="form-control" style="text-align: center" v-model="player.pointsByRound[index]" v-on:change="setCookie(cookieNamePlayers, JSON.stringify(players))">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center">Points</th>
                        <th class="text-center" v-for="player in players" :key="player">
                            {{ totalPoints(player) }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="row mb-5 justify-content-center">
        <div class="col-11 col-md-10 col-lg-8 col-lg-6 text-center">
            <p style="font-size: 2.5rem;" v-if="players.length == 0">
                Here you can keep track of who gained how many points in your favorite Games.
                Start by adding Players to the Table
            </p>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="openModal()">Add Players</button>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="addRound()" v-if="players.length > 0">Add Rounds</button>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="newGame()" v-if="players.length > 0">New Game</button>
            <button class="btn btn-primary mx-20 my-20" role="button" v-on:click="endGame()" v-if="players.length > 0">End Game</button>
        </div>
    </div>

    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as halfmoon from 'halfmoon'
import AddPlayers from './../../components/AddPlayers.vue';
import { Player } from './../../types'

@Options({
  components: {
    AddPlayers,
  },
})
export default class CountPoints extends Vue {

    rounds: number[] = [1];
    currentRound: number = 0;
    players: Player[] = [];
    cookieNamePlayers = "cookie-count-points-player";
    cookieExTime = 7;
  
    mounted() {
        if (this.$store.getters.cookieConsent) {
            var players = this.getCookie(this.cookieNamePlayers);
            if (players != "") {
                this.players = JSON.parse(players);
                for (let i = 0; i < this.players[0].pointsByRound.length; i++) {
                    if (i == 0) { continue} // Skip first rounds, since it is added in data()
                    this.currentRound++;
                    this.rounds.push(this.currentRound);
                    
                }
            }
        }
    }

    openModal(): void {
        halfmoon.toggleModal("modal-add-players");
    }

    addRound(): void {
        this.currentRound++;
        this.rounds.push(this.currentRound);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].pointsByRound.push(0);
        }
    }

    newGame(): void {
        if (confirm("Are you sure you want to reset this Game?")) {
            this.rounds = [1];
            this.currentRound = 1;
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].pointsByRound = [0];
            }
        }
    }

    endGame(): void {
        if (confirm("Are you sure you want end this Game?")) {
            this.rounds = [1];
            this.currentRound = 1;
            this.players = [];
        }
    }

    onPlayersAdded(players: Player[]): void {
        this.players = players;
    }

    totalPoints(player: Player): number { 
        var value: number = 0;
        for (const points of player.pointsByRound) {
            value = value + points;
        }
        return value;
    }

    setCookie(cname: string, cvalue: string): void {
        var d = new Date();
        d.setTime(d.getTime() + (this.cookieExTime*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname: string) {
        var name = cname + "=";
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
        return "";
    }
}
  
</script>

<style scoped lang="scss">

td .form-group {
    margin: 0;
}

</style>