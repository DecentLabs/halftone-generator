<template lang="html">
  <div class="zoom">
    <div class="zoom-in" @click="zoom('zoomIn')">+</div>
    <div class="zoom-out" @click="zoom('zoomOut')">-</div>
  </div>
</template>

<script>
export default {
  name: 'zoom',
  methods: {
    zoom(type) {
      this.$store.commit('updateZoomValue', type)
    }
  }
}
</script>

<style>
  .zoom {
    width: 60px;
    height: 30px;
    background-color: white;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .zoom div {
    width: 30px;
    height: 30px;
    display: inline-block;
    border: 1px solid rgb(230, 230, 230);
    padding: 2px;
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;
  }
  .zoom div:hover {
    background-color: black;
    color: white;
  }
</style>
