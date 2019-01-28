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
        <label class="file" for="file">Add config</label>
        <input name="file" type="file" accept="application/json" @change="dataInput">
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'template-settings',
  computed: {
    canWrite () {
      return this.$store.getters['user/canWrite']
    },
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
        this.$store.state.generator.loadingTemplate = true
        let data = JSON.parse(reader.result)
        // TODO
        data = data.generator ? data.generator : data
        Object.keys(data).forEach((key) => {
          if (key !== 'loadingTemplate') {
            this.$store.state.generator[key] = data[key]
          }
        })
      }, false);

      if (file) {
        reader.readAsText(file);
      }
    }
  }
}
</script>
