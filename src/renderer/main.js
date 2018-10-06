import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import DiscordRPC from 'discord-rpc'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const clientId = '477048998176489472'

const rpc = new DiscordRPC.Client({ transport: 'ipc' })

async function setActivity () {
  if (!rpc) {
    return
  }

  rpc.setActivity({
    largeImageKey: 'steam_design_massive_png',
    largeImageText: 'Steam.Design',
    instance: false
  })
}

rpc.on('ready', () => {
  setActivity()

  setInterval(() => {
    setActivity()
  }, 1500)
})

rpc.login({ clientId }).catch(console.error)

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
