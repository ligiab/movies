export default {
   fetchMovies: async() => {
      const module = await import( './data/movies.csv' );
      return module.default;
   },
   fetchTags: async() => {
      const module = await import ( './data/tags.csv' )
      return module.default 
   },
   fetchRatings: async() => {
      const module = await import ( './data/ratings.csv' )
      return module.default 
   },
   fetchLinks: async() => {
      const module = await import ( './data/links.csv' )
      return module.default 
   }
}
