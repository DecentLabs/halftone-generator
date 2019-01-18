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

      <p v-if="!user" class="sign-in" @click="login">Sign In</p>
      <p v-if="user" @click="logout">Sign out</p>
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
    width: calc(90% / 4);
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border-left: 1px solid rgba(230, 230, 230);
    font-weight: bold;
    height: 40px;
  }
  .generator-type-selector label:first-child {
    border-left: 0;
  }
  label.selected {
    background-color: black;
    color: white;
  }
  .user {
    width: 10%;
    border-left: 1px solid rgba(230, 230, 230);
    height: 40px;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
    min-width: 125px;
  }
  .user p {
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    color: darkslateblue;
    width: calc(100% - 40px);
    /* text-decoration: underline; */
  }
  .user p:hover {
    background-color: darkslateblue;
    color: white;
  }
  .user img {
    width: 40px;
    height: 40px;
  }
  .user p.sign-in {
    width: 100%;
  }

  @media (max-width: 414px) {
    .user img {
      display: none;
    }
    .user {
      min-width: 70px;
    }
    .user p {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
    .generator-type-selector label {
      padding-left: 5px;
      padding-right: 5px;
      font-size: 14px;
    }
  }
</style>
