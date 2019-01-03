<template lang="html">
  <div class="setting template-settings">

    <div class="section">
      <div class="input">
        <label>Choose template</label>
        <select v-model="templateName">
          <option value="beer">beer</option>
          <option value="decent">decent logo</option>
          <!-- <option value="decent2">decent logo2</option> -->
        </select>
      </div>
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
