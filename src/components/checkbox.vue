<template lang="html">
  <div class="checkbox">
    <input type="checkbox" :checked="val">
    <span class="checkmark" @click="change"></span>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: ['value', 'name'],
  data: function () {
    return {
      val: this.value,
    }
  },
  methods: {
    emitChange() {
      this.$emit('change', {name: this.name, value: this.val})
    },
    change () {
      this.val = !this.val
      this.emitChange()
    },
  }
}
</script>

<style scoped>
  .checkbox {
    width: 35px;
    height: 35px;
    position: relative;
    cursor: pointer;
    margin: 5px auto 10px auto;
  }
  .checkbox input {
    opacity: 0;
    position: absolute;
    height: 0;
    width: 0;
    cursor: pointer;
    padding: 0;
  }
  .checkmark {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin: 0;
    border: 2px solid black;
    color: white;
  }
  .checkbox input:checked ~ .checkmark {
    background-color: black;
    border: none;
  }
  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .checkbox .checkmark:after {
    left: 14px;
    top: 10px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
