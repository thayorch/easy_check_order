<template>
  <div class="box-index">
    <div class="text-center">
      <h1 class="text-h1 animate-fade-in font-weight-regular">
        <span class="text-amber-darken-1">H</span>
        e
        <span class="text-amber-darken-1">l</span>
        l
        <span class="text-amber-darken-1">o</span>
        CSCMU
        <span class="text-amber-darken-1">67</span>
      </h1>
      <h1 class="text-h3 pt-2 animate-fade-in">This is CSCMU Shop.</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Add your logic here in the future
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Kanit", sans-serif;
}

.box-index {
  background-image: url("/public/CSCMU-LOGO.png");
  background-position: center;
  background-size: cover;
  aspect-ratio: 16/9;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animate-fade-in {
  animation: drop 1.5s ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes drop {
  0% {
    transform: translateY(-20px);
  }
  25% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20);
  }
  75% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
