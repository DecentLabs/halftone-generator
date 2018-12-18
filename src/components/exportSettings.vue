<template lang="html">
  <div class="export-settings">

    <div class="popup">
      <div class="close" @click="close">x</div>

      <h2>Export settings: {{generatorType}}</h2>
      <form class="" action="index.html" method="post">
        <div class="row">
          <h4>Name</h4>
          <input type="text" name="" value="name">
        </div>

        <div class="row">
          <h4>Export sizes</h4>
        </div>

        <div class="row">
          <div class="input">
            <label for="">Thumbnail</label>
            <input type="checkbox" name="" value="">
          </div>

          <div class="input">
            <label for="">Medium</label>
            <input type="checkbox" name="" value="">
          </div>

          <div class="input">
            <label for="">Large</label>
            <input type="checkbox" name="" value="">
          </div>

          <div class="input">
            <label for="">Custom</label>
            <input type="checkbox" name="" value="">
          </div>

        </div>

      </form>
      <button type="button" name="button" @click="save">Export</button>
      <button type="button" name="button" @click="close">Cancel</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'export-settings',
  computed: {
    generatorType () {
      return this.$store.state.generatorType
    }
  },
  methods: {
    save () {
      this.$emit('save')
    },
    close() {
      this.$emit('closeExportSettings')
    }
  }
}
</script>

<style>
.export-settings {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
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
  /* margin-top: -10px;
  margin-left: -10px; */
  width: 100%;
  text-align: left;
}
h4 {
  margin-right: 20px;
  padding-top: 5px;
}
form {
  flex-direction: row;
}
input, input[type="checkbox"] {
  margin: 0;
}
.row {
  width: 100%;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
}
.row .input {
  width: auto;
  text-align: center;
}
.input input {
  margin-left: auto;
  margin-right: auto;
}
label {
  margin-right: 20px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}
button {
  margin: 20px 20px 10px 20px;
}
</style>
