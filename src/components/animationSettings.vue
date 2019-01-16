<template lang="html">
  <div class="setting animation-settings">

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
    this.$store.commit('generator/updateAnimationMode', 'basic')
  },
  computed: {
    loop: {
      set(val) {
        this.$store.commit('generator/updateLoop', val)
      },
      get() {
        return this.$store.state.generator.loop
      }
    },
    animationMode: {
      set(val) {
        this.$store.commit('generator/updateAnimationMode', val)
      },
      get() {
        return this.$store.state.generator.animationMode
      }
    }
  }
}
</script>
