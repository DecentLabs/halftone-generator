<template lang="html">
  <div class="generator-type-selector">

    <label for="template"
           v-bind:class="generatorType === 'logo' ? 'selected': ''"
           @click="select('logo')">LOGO</label>

    <label for="grid"
           v-bind:class="generatorType === 'grid' ? 'selected': ''"
           @click="select('grid')">GRID</label>

    <label for="image"
           v-bind:class="generatorType === 'image' ? 'selected': ''"
           @click="select('image')">IMAGE</label>

    <label for="template"
           v-bind:class="generatorType === 'template' ? 'selected': ''"
           @click="select('template')">TEMPLATE</label>

    <div class="user">
      <p v-if="!user" @click="login">Login</p>
      <p v-if="user">{{user.displayName}}</p>
      <p v-if="user" @click="logout">Logout</p>
      <img v-if="user" :src="user.photoURL" alt="profile-picture">
    </div>

  </div>
</template>

<script>
export default {
  name: 'generatorTypeSelector',
  computed: {
    user () {
      return this.$store.state.user.user
    },
    generatorType: {
      get() {
        return this.$store.state.generator.generatorType
      },
      set(val) {
        this.$store.commit('generator/updateGeneratorType', val)
        this.$store.dispatch('generator/setPreset')
      }
    }
  },
  methods: {
    select (val) {
      this.generatorType = val
    },
    login () {
      this.$store.dispatch('user/login')
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="css">
  .generator-type-selector {
    display: flex;
    justify-content: flex-start;
    background-color: rgb(220, 220, 220);
    border-bottom: 1px solid rgba(230, 230, 230);
    flex-shrink: 0;
    background-color: white;
  }
  .generator-type-selector label {
    width: calc(100% / 5);
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border-left: 1px solid rgba(230, 230, 230);
    font-weight: bold;
    height: 35px;
  }
  .generator-type-selector label:first-child {
    border-left: 0;
  }
  label.selected {
    background-color: black;
    color: white;
  }
  .user {
    width: calc(100% / 5);
    border-left: 1px solid rgba(230, 230, 230);
    height: 35px;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
  }
  .user p {
    margin: 10px;
  }
  .user img {
    width: 35px;
    height: 35px;
  }
</style>
