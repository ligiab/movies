<template>
   <div class="dashboard-view">
      <va-card outlined class="ml-4 mr-4 mt-4">
         <div class="va-h4 ml-4">Top {{ moviesRankThreshold }} Movies</div>
         <div class="row ml-4 mb-4">
            <va-chip
               v-for="option in selectedGenres"
               :key="option"
               size="small"
               class="mt-1 mr-1 my-1">
               {{ option }}
            </va-chip>
         </div>

         <va-inner-loading
               v-if="isLoading"
               loading
               :size="60">
            </va-inner-loading>
         <va-scroll-container
            style="max-height: 80vh;"
            vertical>
         
            <div
               v-if="!isLoading"
               class="movies-ranking flex flex-col flex-wrap justify-space-between">
               <movie-card :movies="topMovies"/>
               </div>
         </va-scroll-container>
      </va-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieCard from '@/components/MovieCard.vue'
import { NS_MOVIES } from '@/store/MoviesStore.js';

export default {
   components: { MovieCard },
   computed: {
      ...mapGetters( NS_MOVIES, [ 'selectedGenres', 'topMovies', 'moviesRankThreshold', 'isLoading' ] )
   }
}
</script>
<style scoped>
.dashboard-view .va-card{
   min-height: 15vh;
}
</style>