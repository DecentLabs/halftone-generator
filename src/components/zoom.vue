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
    width: 70px;
    height: 35px;
    background-color: white;
    margin: 25px 30px 20px 30px;
  }
  .zoom div {
    width: 35px;
    height: 35px;
    display: inline-block;
    border: 1px solid rgb(230, 230, 230);
    padding: 3px;
    text-align: center;
    font-weight: bold;
    font-size: 1.3em;
    cursor: pointer;
  }
  .zoom div:hover {
    background-color: black;
    color: white;
  }
</style>
