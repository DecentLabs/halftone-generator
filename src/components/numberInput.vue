<template lang="html">
  <div class="number-input">
    <button @mouseleave="stop"
            @mouseup="stop"
            @mousedown="start('minus')"
            @touchstart="start('minus')"
            @touchend="stop"
            class="minus" type="button"
            name="num-button">-</button>
    <input type="text" :value="val" @change="change">
    <button @mouseleave="stop"
            @mouseup="stop" 
            @mousedown="start('plus')"
            @touchstart="start('plus')"
            @touchend="stop"
            class="plus"
            type="button"
            name="num-button">+</button>
  </div>
</template>

<script>
export default {
  name: 'numberInput',
  props: ['value', 'name'],
  data: function () {
    return {
      val: this.value,
      interval: false
    }
  },
  methods: {
    start(type) {
      if (!this.inetrval) {
        this.interval = setInterval(() => {
          if (type === 'plus') {
            this.plus()
          } else {
            this.minus()
          }

        }, 50)
      }
    },
    stop() {
      clearInterval(this.interval)
      this.interval = false
    },
    emitChange() {
      this.$emit('change', {name: this.name, value:this.val})
    },
    change (e) {
      this.val = Number.parseInt(e.target.value)
      this.emitChange()
    },
    plus () {
      this.val += 1
      this.emitChange()
    },
    minus () {
      this.val -= 1
      this.emitChange()
    }
  }
}
</script>

<style scoped>
  .number-input {
    position: relative;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  input {
    padding: 5px 35px 5px 35px;
    margin: 0;
    text-align: center;
  }
  button {
    position: absolute;
    width: 35px;
    height: 35px;
    border: 0px solid white;
    margin: 0;
    background-color: transparent;
    font-size: 22px;
    text-align: center;
    top: 0;
    border-radius: 0;
  }
  .minus {
    left: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .plus {
    right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .minus:before, .plus:before {
    content: '';
    position: absolute;
    width: 33px;
    height: 31px;
    top: 2px;
  }
  .minus:before {
    border-right: 2px solid black;
    left: 2px;
  }
  .plus:before {
    border-left: 2px solid black;
    right: 2px;
  }
</style>
