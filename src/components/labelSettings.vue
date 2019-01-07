<template lang="html">
  <div class="label-settings">

    <div class="section">
      <div class="input">
        <label>Label</label>
        <input type="text" v-model="label">
      </div>

      <div class="input">
        <label>Sublabel</label>
        <input type="text" v-model="subLabel">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'label-settings',
  computed: {
    label: {
      get () {
        return this.$store.state.labelName
      },
      set (val) {
        this.$store.commit('updateLabelName', val)
      }
    },
    subLabel: {
      get () {
        return this.$store.state.subLabel
      },
      set (val) {
        this.$store.commit('updateSubLabel', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
