<template lang="html">
  <div class="setting image-settings">
    <!-- <h2>Image settings</h2> -->

    <div class="section">

      <div class="input">
        <label class="file" for="file">Choose image</label>
        <input name="file" type="file" accept="image/png, image/jpeg" @change="imageChange">
      </div>

      <div class="input">
        <label for="">Image sample</label>
        <input type="number" v-model.number="imageRes">
      </div>
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
  },
  methods: {
    imageChange(e) {
      let file = e.target.files[0]
      let reader  = new FileReader()

      reader.addEventListener("load", () => {
        this.imageUrl = reader.result
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
}
</script>

<style lang="css">
  input[type="file"] {
    border: none;
    height: auto;
    width: auto;
    padding: 15px 0 15px 0;
    margin: 0;
    margin-left: 10px;
    cursor: pointer;
    align-items: center;
  }
</style>
