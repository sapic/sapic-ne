import Vue from 'vue'
import axios from 'axios'
import DiscordRPC from 'discord-rpc'

import App from './App.vue'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const clientId = '477048998176489472'
const rpc = new DiscordRPC.Client({ transport: 'ipc' })

const time = new Date()

async function setActivity (): Promise<void> {
  if (!rpc) {
    return
  }

  rpc.setActivity({
    largeImageKey: 'steam_design_massive_png',
    largeImageText: 'Steam.Design',
    instance: false,
    startTimestamp: time
  })
}

rpc.on('ready', () => {
  setActivity()

  setInterval(() => {
    setActivity()
  }, 15000)
})

rpc.login({ clientId }).catch(console.error)

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
