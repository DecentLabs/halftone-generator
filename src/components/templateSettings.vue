<template lang="html">
  <div class="template-settings">

    <div class="section">
      <div class="input">
        <label>Choose template</label>
        <select v-model="templateName">
          <option value="beer">beer</option>
          <option value="decent">decent logo</option>
        </select>
      </div>

      <div class="input">
        <label>Choose project</label>
        <select v-model="selectedProject">
          <option disabled value="null">Select one</option>
          <option v-for="(value, key) in projectList">{{key}}</option>
        </select>
      </div>

      <div class="input">
        <label class="file" for="file">Choose image</label>
        <input name="file" type="file" accept="application/json" @change="dataInput">
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
        this.$store.commit('generator/updateTemplateName', val)
      },
      get() {
        return this.$store.state.generator.templateName
      }
    },
    selectedProject: {
      set(val) {
        this.$store.dispatch('user/selectProject', val)
      },
      get() {
        return this.$store.state.user.selectedProject
      }
    },
    projectList () {
      return this.$store.state.user.projectList
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
