import { remote } from 'electron'
import { Store } from 'vuex'
import greenworks from '../../../lib/greenworks/greenworks.js'
import Jimp from 'jimp'

import { RootState, SteamUserInfo } from '../types'

export default (store: Store<RootState>) => {
  const state = JSON.parse(JSON.stringify(store.state))
  const { commit } = store
  const { dispatch } = store

  if (!state.backgrounds || state.backgrounds.length < 10) {
    const bgs = require('@/assets/bg.json')
    commit('setBackgrounds', bgs)
  }

  dispatch('randomBackground')

  const curWindow = remote.getCurrentWindow()
  commit('setCurrentWindow', curWindow)
  commit('setIsMaximized', curWindow.isMaximized())

  // Add resize listeners
  curWindow.addListener('maximize', () => commit('setIsMaximized', true))
  curWindow.addListener('unmaximize', () => commit('setIsMaximized', false))
  curWindow.addListener('resize', debounce(() => {
    const [width, height] = curWindow.getSize()
    commit('setWindowSize', { width, height })
  }, 100, false))

  try {
    process.activateUvLoop()
    greenworks.init()
    store.commit('setGreenworks', greenworks)

    const user: SteamUserInfo = greenworks.getSteamId()

    store.commit('setUser', user)

    greenworks.on('avatar-image-loaded', async (steamid: string, handler: number) => {
      if (handler < 1) return
      if (steamid !== store.state.user.steamId) return

      const avatarBuffer: string = await imageFromHandler(handler)

      const user = store.state.user
      user.avatar = avatarBuffer
      store.commit('setUser', user)
    })

    const handler = greenworks.getLargeFriendAvatar(user.steamId)

    if (handler > 0) {
      imageFromHandler(handler).then((avatarBuffer) => {
        store.commit('setAvatar', avatarBuffer)
      })
    }
  } catch (e) {
    console.log('Can\'t init greenworks', e)
    store.commit('setUser', 0)
  }
  dispatch('loadBackpack')
}

function debounce (func: any, wait: number, immediate: boolean) {
  var timeout: number
  return function () {
    var context: any = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    window.clearTimeout(timeout)
    timeout = window.setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

async function imageFromHandler (handle: number): Promise<string> {
  var imageBuffer = greenworks.getImageRGBA(handle)
  var size = greenworks.getImageSize(handle)
  if (!size.height || !size.width) {
    console.log('Image corrupted. Please try again')
    return ''
  }
  console.log('getImageFrom handler', size.height, size.width)
  var image = await new Jimp(size.height, size.width)
  for (var i = 0; i < size.height; ++i) {
    for (var j = 0; j < size.width; ++j) {
      var idx = 4 * (i * size.height + j)

      var hex: number = (imageBuffer[idx] * (1 << 24)) +
        (imageBuffer[idx + 1] << 16) +
        (imageBuffer[idx + 2] << 8) +
        (imageBuffer[idx + 3])

      image.setPixelColor(hex, j, i)
    }
  }

  image.quality(90)
  return new Promise<string>((resolve, reject) => {
    image.getBase64('image/jpeg', (err, image) => {
      if (err) return reject(err)
      return resolve(image)
    })
  })
}
