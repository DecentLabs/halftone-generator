<template lang="html">
  <div class="image-settings">

    <div class="section">

      <div class="input">
        <label class="file" for="file">Choose image</label>
        <input name="file" type="file" accept="image/png, image/jpeg" @change="imageChange">
      </div>

      <div class="input">
        <label for="">Image sample</label>
        <number-input @change="valueChanged"
                      :value="imageRes"
                      :name="'imageRes'"></number-input>
      </div>

      <div class="input">
        <label>Opacity</label>
        <vue-slider class="slider"
                    :tooltip-dir="'bottom'"
                    :tooltip="'hover'"
                    :min="0"
                    :max="255"
                    ref="slider"
                    v-model="opacity"></vue-slider>
      </div>

      <div class="input">
        <label>Lightness</label>
        <vue-slider class="slider"
                    :tooltip-dir="'bottom'"
                    :tooltip="'hover'"
                    :min="0"
                    :max="255"
                    ref="slider"
                    v-model="lightness"></vue-slider>
      </div>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import numberInput from './numberInput.vue'
export default {
  name: 'imageSettings',
  components: { vueSlider, numberInput },
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
    },
    opacity: {
      set(val) {
        this.$store.commit('updateOpacityLimit', val)
      },
      get () {
        return this.$store.state.opacityLimit
      }
    },
    lightness: {
      set(val) {
        this.$store.commit('updateLightnessLimit', val)
      },
      get () {
        return this.$store.state.lightnessLimit
      }
    }
  },
  methods: {
    valueChanged (e) {
      this[e.name] = e.value
    },
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
  .slider {
    margin-top: 15px;
  }
</style>
