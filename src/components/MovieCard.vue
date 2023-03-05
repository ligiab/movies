<template>
   <va-card
      v-for="movie in movies"
      :key="movie.movieId"
      class="movie-card">
      <va-card-block 
         class="flex-nowrap"
         horizontal>
         <div style="flex: auto;">
            <va-card-title class="movie-card--title">
               {{ movie.title }} 
            </va-card-title>
            <va-card-content>
               <va-chip 
                  v-for="genre in movie.genres"
                  :key="genre"
                  class="mr-2 mb-2"
                  size="small"
                  outline>
                  {{ genre }}
               </va-chip>
            </va-card-content>
         </div>
         <va-divider
            class="mr-3"
            vertical />
         <div class="mt-2 pl-0 pr-0" style="flex: 0 0 200px;">
            <div class="rating-wrapper mr-4">
               <va-rating 
                  v-model="movie.rating.rating"
                  halves
                  size="medium" />
               <label class="va-text-secondary">
                  {{ movie.rating.counter }}
               </label>
               <va-icon
                  class="mr-2"
                  name="person"
                  color="secondary" />
            
            <va-card-actions class="pl-0 pr-0 pb-2 rating-wrapper--actions ">
               <va-button
                  color="warning"
                  size="small"
                  icon="open_in_new"
                  :href="movie.links.imdb">
                  <label>IMDb</label>
               </va-button>
            </va-card-actions>
         </div>
         </div>
      </va-card-block>
   </va-card>
</template>

<script>
export default {
   props: {
      /**
       * The list of movies to be displayed.
       */
      movies: {
         type: Array,
         required: true
      }
   }
}
</script>

<style>
.movie-card {
  margin: 1.25em;
  padding: 1.25em 0;
}
.movie-card--title {
  font-size: 1.25em !important;
}
.rating-wrapper {
   width: fit-content;
   float: right;
   text-align: end;
}
.rating-wrapper--actions {
   justify-content: end !important;
}
</style>