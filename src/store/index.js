import { createStore } from 'vuex'
import moviesStore, { NS_MOVIES } from './MoviesStore.js';

export default createStore( {
   state: () => ( {
      logger: console,
      configuration: {
         baseUrl: ''
      }
   } ),
   getters: {
      logger: ( { logger } ) => logger,
      configuration: ( { configuration } ) => configuration
   },
   mutations: {
      SET_LOGGER( state, logger ) {
         state.logger = logger
      },
      SET_CONFIGURATION( state, configuration ) {
         state.configuration = configuration
      }
   },
   actions: {
      updateLogger( { commit }, logger ) {
         commit( 'SET_LOGGER', logger )
      },
      updateConfiguration( { commit }, configuration ) {
         commit( 'SET_CONFIGURATION', configuration )
      }
   },
   modules: {
      [ NS_MOVIES ]: moviesStore
   }
} )
