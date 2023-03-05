import { createRouter, createWebHistory } from 'vue-router';
import { NS_MOVIES } from '@/store/MoviesStore';
import DashboardView from '@/views/DashboardView.vue';

export default store => {
   return createRouter( {
      history: createWebHistory( import.meta.env.BASE_URL ),
      routes: [
         {
            path: '/',
            redirect: '/dashboard'
         },
         {
            name: 'dashboard',
            path: '/dashboard',
            component: DashboardView,
            beforeEnter: ( to, from, next ) => {
               store.dispatch( `${NS_MOVIES}/init` ).then( next );
            }
         }
      ],
   } )
}
