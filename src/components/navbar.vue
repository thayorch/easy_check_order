<template>
  <VApp-bar
    class="px-0 d-block flex-column"
    flat
    prominent
    density="compact"
  >

    <VListItem
        :active="false"
        class="py-2 logo"
        prepend-avatar="/favicon.ico"
        title="CSCMUSHOP"
        subtitle="@ Computer Science CMU"
        nav
        to="/"
        ></VListItem>

    <VSpacer></VSpacer>

      <VTabs
      centered
      color="grey-darken-2"
      align-tabs="center"
      style="cursor: pointer;">
      <VTab
        v-for="link in links"
        key="link"
        :title="link.title"
        :prepend-icon="link.icon"
        router :to="link.route"
        >{{ link.title }}</VTab>

    </VTabs>


  </VApp-bar>


</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    let links=ref([
          { title : "Home", icon:"mdi-home", route:'/'},
          { title : "Active", icon:"mdi-cached",route:'/active'},
          { title : "Logs", icon:"mdi-console",route:'/logs'},
        ]);

    return{
      links,
    }
  },
}
</script>

