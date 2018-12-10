<template lang="html">
  <div class="setting image-settings">

    <div class="input">
      <label for="imageUrl">Image url</label>
      <input v-model="imageUrl">
    </div>

    <div class="input">
      <label for="">Image sample</label>
      <input type="number" v-model.number="imageRes">
    </div>

  </div>
</template>

<script>
export default {
  name: 'imageSettings',
  computed: {
    imageUrl: {
      set(val) {
        this.$store.commit('updateImageUrl', val)
        this.$store.dispatch('generateGrid')
      },
      get () {
        return this.$store.state.imageUrl
      }
    },
    imageRes: {
      set(val) {
        this.$store.commit('updateImageRes', val)
      },
      get () {
        return this.$store.state.imageRes
      }
    }
  }
}
</script>

<style lang="css">
</style>
