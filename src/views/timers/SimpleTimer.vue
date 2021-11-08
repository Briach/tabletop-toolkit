<template>
  
  <div class="container-fluid my-auto" wfd-id="5">  

  <div class="row mb-5 justify-content-center">
    <div class="col-11 col-sm-10 col-lg-6 text-center">
      <h2>Count Up: {{ getFormattedTimer }}</h2>
    </div>
  </div>
   <div class="row mb-10 justify-content-center">
    <div id="timer" class="col-11 col-sm-10 col-lg-6 justify-content-center mb-5">
      <div class="base-timer">
        <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="circle">
            <path
              :stroke-dasharray="circleDasharray"
              class="path-remaining"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "></path>
          </g>
        </svg>
        <span class="label">
          {{ getFormattedTimeLeft }}
        </span>
      </div>
    </div>
  </div>

  <div class="row m-10 mb-20 justify-content-center">
    <div class="col-11 col-sm-10 col-lg-6 text-center">

      <div class="btn-toolbar mb-10 mx-auto" role="toolbar">
        <div class="input-group mx-auto">
          <span class="input-group-text prepend"><span>Make a Sound</span></span>
          <select class="form-control h-full" style="border-left: none" v-model="selectedOption">
            <option>after</option>
            <option>every</option>
          </select>
          <input class="form-control h-full" style="border-right: none" type="number" v-model="timeIntervall">
          <span class="input-group-text append"><span>Seconds</span></span>
        </div>
      </div>

      <small class="text-center">Leave the number at 0 to count infinite.</small>

    </div>
  </div>

  <div class="row m-5 mb-20 justify-content-center">
    <button class="btn btn-primary mx-20 my-20" v-if="!isCounterActive" v-on:click="startTimer()">Start</button>
    <button class="btn btn-primary mx-20 my-20" v-if="isCounterActive" v-on:click="pauseTimer()">Pause</button>
    <button class="btn btn-secondary mx-20 my-20" v-on:click="resetTimer()">Reset</button>
  </div>

  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as halfmoon from 'halfmoon'

export default class SimpleTimer extends Vue {

    counter: number = 0;
    isCounterActive: boolean = false;
    isTimerCreated: boolean = false;
    timeIntervall: number = 30;
    interval: ReturnType<typeof setInterval> = setTimeout(() => { return; }, 1);
    selectedOption: string = "after";

  
    get intervallElapsed(): number {
      var val = this.counter % this.timeIntervall
      if (this.timeIntervall == 0) {
        val = this.timeIntervall;
      }
      return val; 
    }

    get timeLeft(): number {
      return this.timeIntervall - this.intervallElapsed;
    }

    get getFormattedTimer(): string {
      var time = 0;
      time = this.counter;

      var hours = (Math.floor(time / 60)).toString();
      var minutes = (time % 60).toString();
      
      if (hours.length < 2) {
        hours = "0" + hours;
      }
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }

      var formatted = hours + ":" + minutes;
      return formatted;
    }

    get getFormattedTimeLeft(): string {
      var time = 0;
      time = this.timeIntervall - this.intervallElapsed;

      var hours = (Math.floor(time / 60)).toString();
      var minutes = (time % 60).toString();
      
      if (hours.length < 2) {
        hours = "0" + hours;
      }
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }

      var formatted = hours + ":" + minutes;
      return formatted;
    }

    get timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeIntervall;
      return rawTimeFraction - (1 / this.timeIntervall) * (1 - rawTimeFraction);
    }

    // Update the dasharray value as time passes, starting with 283
    get circleDasharray() {
      return `${(this.timeFraction * 283).toFixed(0)} 283`;
    }

    startTimer() {
      this.isCounterActive = true;

      this.interval = setInterval(() => {
        this.counter++;
        if (this.timeIntervall > 0 && this.counter > 0 && this.intervallElapsed == 0) {
          if (this.selectedOption == "after") {
            this.pauseTimer();
            this.counter = 0;
          }
          this.timerElapsed();
        }

      }, 1000)
    }

    pauseTimer(): void {
      this.isCounterActive = false;
      clearInterval(this.interval);
    }

    resetTimer(): void {
      this.counter = 0;
    }

    timerElapsed(): void {
      // TODO: Make sound
    }
}
  
</script>

<style scoped lang="scss">

select, .input-group input {
  height: 4.2rem;
  text-align: center;
}

.input-group {
  border-color: black;
}

.prepend {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: #ffffff;
  padding: 0.6rem !important;
  border-right: none;
}
.prepend span {
  border-radius: 25px;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.6rem;
  padding-right: 1rem;
  padding-left: 1rem;
}
.dark-mode .prepend {
  background-color: rgba(255, 255, 255, 0.05);
}

.append {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #ffffff;
  padding: 0.6rem !important;
  border-left: none;
}
.append span {
  border-radius: 25px;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.6rem;
  padding-right: 1rem;
  padding-left: 1rem;
}
.dark-mode .append {
  background-color: rgba(255, 255, 255, 0.05);
}

.append {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

/* Sets the containers height and width */
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.base-timer .svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}

/* Removes SVG styling that would hide the time label */
.base-timer .circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.base-timer .path-elapsed {
  stroke-width: 7px;
  stroke:grey;
}

.base-timer .path-remaining {
  /* Just as thick as the original ring */
  stroke-width: 7px;
  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;
  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;
  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;
  /* Allows the ring to change color when the color value updates */
  stroke: var(--primary-color);
}
.dark mode .base-timer .path-remaining {
  stroke: var(--primary-color);
}

.base-timer .label {
  position: absolute;    

  /* Size should match the parent container */    
  width: 300px;
  height: 300px;

  /* Keep the label aligned to the top */    
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */    
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 48px;
}

</style>