import { createApp } from 'vue'
import { createVuestic } from 'vuestic-ui'
import createRouter from './router'
import store from './store'
import App from './App.vue'
import 'vuestic-ui/css'

const app = createApp( App )
app.use( createRouter( store ) )
app.use( store)
app.use( createVuestic() )
app.mount( '#app' )
