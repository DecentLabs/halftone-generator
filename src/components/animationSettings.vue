<template lang="html">
  <div class="setting animation-settings">

    <!-- <h2>Animation settings</h2> -->

    <div class="section">
      <div class="input">
        <label for="loop">loop</label>
        <input type="checkbox" id="loop" v-model="loop">
      </div>

      <div v-if="loop" class="input">
        <label>animation mode</label>
        <select v-model="animationMode">
          <option value="basic">basic</option>
          <option value="increment">increment</option>
          <option value="decrement">decrement</option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'animation-settings',
  mounted () {
    this.$store.commit('updateAnimationMode', 'basic')
  },
  computed: {
    loop: {
      set(val) {
        this.$store.commit('updateLoop', val)
      },
      get() {
        return this.$store.state.loop
      }
    },
    animationMode: {
      set(val) {
        this.$store.commit('updateAnimationMode', val)
      },
      get() {
        return this.$store.state.animationMode
      }
    }
  }
}
</script>
