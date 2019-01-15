<template lang="html">
  <div class="template-settings">

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

    <div class="input">
      <label class="file" for="file">Choose image</label>
      <input name="file" type="file" accept="application/json" @change="dataInput">
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
  },
  methods: {
    dataInput (e) {
      let file = e.target.files[0]
      let reader  = new FileReader()

      reader.addEventListener("load", () => {
        let data = JSON.parse(reader.result)
        Object.keys(data).forEach((key) => {
          this.$store.state[key] = data[key]
        })
      }, false);

      if (file) {
        reader.readAsText(file);
      }
    }
  }
}
</script>

<style lang="css">
</style>
