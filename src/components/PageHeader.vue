<template>
   <header class="header va-navbar">
      <div class="va-navbar__left">
        <img alt="Movies logo" class="logo-image" src="@/assets/movies-logo.svg" width="30" height="30" />
        <h1 class="logo-title" color="primary">Dashboard</h1>
      </div>
      <div class="va-navbar__right">
        <search-bar 
            :options="options"
            @update-selected-options="$emit( 'update-selected-options', $event )"
            @search="$emit( 'search', $event )"/>
      </div>
   </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
   components: { SearchBar },
   props: {
      /**
       * A list of options of type string.
       */
      options: {
         type: Array,
         default: () => []
      }
   },
   emits: [ 'update-selected-options', 'search' ]
}
</script>
<style scoped>
header {
   max-height: 100vh;
   background-color: var(--va-background);
   color: var(--va-text);
   box-shadow: var(--va-box-shadow);
}
.va-navbar__left {
  align-items: baseline;
}
.logo-image {
  rotate: 45deg;
  opacity: 0.8;
}
</style>