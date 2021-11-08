<template>
  
  <div class="modal" id="modal-add-players" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <a href="#" class="close" role="button" aria-label="Close" v-on:click="onCloseModal()">
                <span aria-hidden="true">&times;</span>
            </a>
            <h5 class="modal-title">Add Players</h5>
                <div class="form-group" onsubmit="return false">
                    <label for="players">Players</label>
                    <input type="text" id="players" class="form-control" v-model="rawPlayers" placeholder="Fabian, Vanessa, Pina" required="required" v-on:keyup="onKeyUp">
                    <div class="form-text">
                        Add multiple Players by seperating them with ','
                    </div>
                </div>
                <input class="btn btn-primary w-full" type="button" value="Add Players" v-on:click="onAddPlayers()">
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import halfmoon from 'halfmoon'
import { Player } from '../types'

export default class AddPlayers extends Vue {
    rawPlayers: string

    get players(): Player[] {
        var playerNames = this.rawPlayers.split(",");
        var players = [];
        
        for (let playerName of playerNames) {
            var player = {
                name: playerName,
                pointsByRound: [0],
                winsByRound: [false],
            }
            players.push(player);
        }
        return players;
    }

    onAddPlayers(): void {
        halfmoon.toggleModal("modal-add-players");
        this.$emit('players-added', this.players);
    }

    onCloseModal(): void {
        halfmoon.toggleModal("modal-add-players");
    }

    onKeyUp(event: KeyboardEvent): void {
            if(event.key === 'Enter'){
            this.onAddPlayers();
        }
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
