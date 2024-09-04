<template>
  <v-app>



    <v-main>
      <router-view />
    </v-main>
    <v-footer class="d-block flex-column mt-2" style="max-height:65px;" >
    <div class="text-center">
        © Copyright {{ new Date().getFullYear() }}. All Rights Reserved<br>
        Modify by <strong><a target="_blank" style="text-decoration: none; color: black;" href="https://www.facebook.com/lnwice0">Thatcharnon Maidee</a></strong>
    </div>
  </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
