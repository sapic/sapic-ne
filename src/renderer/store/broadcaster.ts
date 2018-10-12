import { ipcRenderer } from 'electron'
import { Store } from 'vuex'
import { RootState } from '../types'

export default (store: Store<RootState>) => {
  ipcRenderer.send('vuex-state', store.state)

  store.subscribe((mutation, state) => {
    ipcRenderer.send('vuex-state', state)
  })
}
