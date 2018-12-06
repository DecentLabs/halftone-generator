<template lang="html">
  <div class="attributes">

    <form>
      <div class="input">
        <label for="">Grid size</label>
        <span>x:</span>
        <input type="number" v-model.number="xSize">
        <span>y:</span>
        <input type="number" v-model.number="ySize">
      </div>

      <div class="input">
        <label for="distance">Distance</label>
        <input type="number" name="distance" v-model.number="distance">
      </div>

      <div class="input">
        <label for="radius">Average point radius</label>
        <input type="number" name="radius" v-model.number="radius">
      </div>

      <div class="input">
        <label for="paintnum">Number of paints</label>
        <input type="number" name="paintnum" v-model.number="paintNum">
      </div>

      <div class="input">
        <label for="degree">Degree</label>
        <input type="number" name="degree" v-model.number="degree">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      xSize: null,
      ySize: null,
      distance: null,
      paintNum: null,
      radius: null,
      degree: null
    }
  },
  mounted () {
    this.xSize = 5,
    this.ySize = 5,
    this.distance = 30,
    this.paintNum = 10,
    this.radius = 5,
    this.degree = 45
  },
  computed: {
    gridSize () {
      return [this.xSize, this.ySize]
    },
    size () {
      return this.radius * 2
    }
  },
  methods: {
    emitChange () {
      this.$emit('change', {
        size: this.size,
        distance: this.distance,
        degree: this.degree
      })
    }
  },
  watch: {
    gridSize (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('gridChange', newVal)
      }
    },
    size (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitChange()
      }
    },
    distance (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitChange()
      }
    },
    paintNum (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('paintChange', newVal)
      }
    },
    degree (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitChange()
      }
    }
  }
}
</script>

<style scoped>
  .attributes {
    background-color: black;
    color: white;
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px;
    margin: 0 60px 0 60px;
  }
  .input {
    text-align: left;
    min-width: 200px;
    padding: 5px;
  }
  input {
    padding: 7px;
    width: 60px;
    margin: 10px
  }
  label, span {
    font-size: 1.3em;
    display: inline-block;
    height: 100%;
  }
  span {
    margin-left: 15px;
  }
</style>
