<template lang="html">
  <div class="login">
    <div class="input">
      <label for="loop">Login</label>
      <input type="text" v-model="email">
      <input type="password" v-model="password">
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="css">
</style>
