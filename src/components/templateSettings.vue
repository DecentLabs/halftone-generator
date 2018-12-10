<template lang="html">
  <div class="setting template-settings">
    <div class="input">
      <label for="">Choose template</label>
      <select v-model="templateName">
        <option value="beer">beer</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'template-settings',
  computed: {
    templateName: {
      set(val) {
        this.$store.commit('updateTemplateName', val)
      },
      get() {
        return this.$store.state.templateName
      }
    }
  }
}
</script>

<style lang="css">
</style>
