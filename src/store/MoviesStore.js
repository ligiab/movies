import MoviesApi from '@/api/MoviesApi.js';

export const NS_MOVIES = 'movies';

const getDefaultState = () => ( {
   movies: [],
   isLoading: true,
   topMovies: [],
   links: [],
   tags:[],
   selectedTags: [],
   selectedGenres: [],
   ratings: [],
   moviesRankThreshold: 10
} );

export default {
   namespaced: true,
   state: getDefaultState(),
   getters: {
      moviesRankThreshold: ( { moviesRankThreshold } ) => moviesRankThreshold,
      topMovies: ( { topMovies } ) => topMovies,
      tags: ( { tags } ) => tags,
      selectedGenres: ( { selectedGenres } ) => selectedGenres,
      isLoading: ( { isLoading } ) => isLoading,
      genres: ( { movies } ) => 
         Array.from( new Set( movies.flatMap( ( { genres } ) => genres?.split( '|' ) || [] ) ) ),
      moviesById: ( { movies }, { ratingsByMovieId, linksByMovieId } ) => {
         return movies.reduce( ( moviesByMovieId, movie ) => {
            moviesByMovieId[ movie.movieId ] = { 
               ...movie,
               genres: movie.genres?.split( '|' ) || [],
               rating: ratingsByMovieId[ movie.movieId ],
               links: {
                  imdb: `http://www.imdb.com/title/tt${linksByMovieId[ movie.movieId ].imdbId}`
               }
            };
            return moviesByMovieId;
         }, {} );
      },
      sortedMovieIdsByRatings: ( _, { moviesById } ) => {
         return Object.keys( moviesById ).sort( ( movieId1, movieId2 ) => {
            const value1 = moviesById[ movieId1 ].rating?.rating || 0;
            const value2 = moviesById[ movieId2 ].rating?.rating || 0;
            return value2 - value1;
         } );
      },
      ratingsByMovieId: ( { ratings } ) => {
         return ratings.reduce( ( ratingsByMovieId, rating ) => {
            if( !ratingsByMovieId[ rating.movieId ] ) {
               ratingsByMovieId[ rating.movieId ] = {
                  totalRating: parseFloat( rating.rating ) || 0,
                  counter: 1,
                  rating: parseFloat( rating.rating ) || 0
               }
            }
            else {
               ratingsByMovieId[ rating.movieId ].totalRating += parseFloat( rating.rating );
               ratingsByMovieId[ rating.movieId ].counter += 1;
               ratingsByMovieId[ rating.movieId ].rating = roundDownToHalf( 
                  ratingsByMovieId[ rating.movieId ].totalRating / 
                  ratingsByMovieId[ rating.movieId ].counter
               );
            }
            return ratingsByMovieId;
         }, {} );
      },
      moviesByGenre: ( { movies } )=> {
         let moviesByGenre = {};

         movies.forEach( movie => {
            const genres = movie.genres?.split( '|' ) || [];
            moviesByGenre = genres.reduce( ( map, genre ) => {
               if( !map[ genre ] ) {
                  map[ genre ] = [ movie.movieId ];
               }
               else {
                  map[ genre ].push( movie.movieId );
               }
               return map;
            }, moviesByGenre )
         } );
         return moviesByGenre
      },
      linksByMovieId: ( { links } ) => {
         return links.reduce( ( linksByMovieId, link ) => {
            linksByMovieId[ link.movieId ] = link;
            return linksByMovieId;
         }, {} );
      },
      tagsByMovieId: ( { tags } ) => {
         return tags.reduce( ( tagsByMovieId, tag ) => {
            tagsByMovieId[ tag.movieId ] = [ 
               ...( tagsByMovieId[ tag.movieId ] || [] ),
               tag
            ];
            return tagsByMovieId;
         }, {} );
      }
   },
   mutations: {
      SET_MOVIES( state, movies ) {
         state.movies = movies;
      },
      SET_TOP_MOVIES( state, topMovies ) {
         state.topMovies = topMovies;
      },
      SET_RATINGS( state, ratings ) {
         state.ratings = ratings;
      },
      SET_LINKS( state, links ) {
         state.links = links;
      },
      SET_TAGS( state, tags ) {
         state.tags = tags;
      },
      SET_SELECTED_GENRES( state, selectedGenres ) {
         state.selectedGenres = selectedGenres;
      },
      SET_IS_LOADING( state, isLoading ) {
         state.isLoading = isLoading;
      }
   },
   actions: {
      init( { commit, dispatch } ) {
         Promise.all( [
            MoviesApi.fetchMovies(),
            MoviesApi.fetchRatings(),
            MoviesApi.fetchTags(),
            MoviesApi.fetchLinks()
         ] )
            .then( ( [ movies, ratings, tags, links ] ) => {
               commit( 'SET_MOVIES', movies );
               commit( 'SET_RATINGS', ratings );
               commit( 'SET_TAGS', tags );
               commit( 'SET_LINKS', links );
            } )
            .then( () => dispatch( 'searchTopMovies', [] ) )
      },
      updateSelectedGenres( { commit }, genres ) {
         commit( 'SET_SELECTED_GENRES', genres );
         commit( 'SET_IS_LOADING', true );
      },
      searchTopMovies( 
         { 
            commit, 
            state: { moviesRankThreshold }, 
            getters: { moviesById, sortedMovieIdsByRatings, moviesByGenre } 
         },
         selectedGenres
      ) {
         
         let topMovies = [];
         let index = 0;

         if( !selectedGenres.length ) {
            topMovies = sortedMovieIdsByRatings
               .slice( 0, moviesRankThreshold )
               .map( movieId => moviesById[ movieId ] );
            
            commit( 'SET_TOP_MOVIES', topMovies );
            commit( 'SET_IS_LOADING', false );

            return;
         }

         while( topMovies.length < moviesRankThreshold && index < sortedMovieIdsByRatings.length ) {
            const movie = moviesById[ sortedMovieIdsByRatings[ index ] ];
            
            if( selectedGenres.every( genre => moviesByGenre[ genre ].includes( movie.movieId ) ) ) {
               topMovies.push( movie );
            }

            index += 1;
         }

         commit( 'SET_TOP_MOVIES', topMovies );
         commit( 'SET_IS_LOADING', false );
      }
   }
}

/**
 * The function rounds down a number to the value neareast to the half.
 * @param {number} value The value to be rounded down
 * @returns {number} The rounded down value
 */
function roundDownToHalf( value ) {
   return Math.floor( value * 2 ) / 2;
}