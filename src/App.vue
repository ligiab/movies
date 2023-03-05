<template>
   <page-header 
      :options="genres"
      @update-selected-options="updateSelectedGenres"
      @search="searchTopMovies" />
   <RouterView />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { RouterView } from 'vue-router';
import PageHeader from '@/components/PageHeader.vue';

import { NS_MOVIES } from '@/store/MoviesStore.js';

export default {
   components: { RouterView, PageHeader },
   computed: {
      ...mapGetters( NS_MOVIES, [ 'genres' ] )
   },
   methods: {
      ...mapActions( NS_MOVIES, [ 'updateSelectedGenres', 'searchTopMovies' ] )
   }
}
</script>
