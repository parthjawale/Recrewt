<template>
  <div class="preloader">
    <div class="text-xs-center" style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
      <p class="headline">Please wait while we load your content</p> 
      <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  height: 100vh;
  width: 100vw;
}
</style>

