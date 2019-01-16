<template lang="html">
  <div class="save-project">

    <div class="popup">
      <div class="close" @click="closePopup">x</div>
      <h2>Save project</h2>

      <form>
        <div class="input">
          <h4>Project name</h4>
          <input type="text" v-model="projectName">
        </div>
      </form>

      <button type="button" name="button-save" @click="saveProject">Save</button>
      <button type="button" name="button-cancel" @click="closePopup">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'save-project',
  data: function () {
    return {
      projectName: 'Decent logo 01'
    }
  },
  methods: {
    saveProject () {
      this.$emit('save', { projectName: this.projectName })
      this.closePopup()
    },
    closePopup () {
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped>
.save-project {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}
.popup {
  width: 500px;
  height: auto;
  padding: 25px;
  background-color: white;
  color: black;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
h2 {
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
}
h4 {
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 5px;
  width: 30%;
}
button {
  margin: 20px 20px 10px 20px;
}
.input {
  width: 100%;
  flex-direction: row;
  padding: 0;
  margin: 20px 0 20px 0;
}
input {
  width: 70%;
  margin: 0;
}

@media (max-width: 414px) {
  .popup {
    margin: 0;
    width: 100%;
    height: 100%;
    /* todo */
    overflow-y: auto;
  }
}
</style>
