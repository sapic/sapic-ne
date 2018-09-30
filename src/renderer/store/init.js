import { remote } from 'electron'
import greenworks from 'greenworks'
import Jimp from 'jimp'

export default store => {
  let state = JSON.parse(JSON.stringify(store.state))
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
  curWindow.addListener('maximize', e => commit('setIsMaximized', true))
  curWindow.addListener('unmaximize', e => commit('setIsMaximized', false))
  curWindow.addListener('resize', debounce(() => {
    let [width, height] = curWindow.getSize()
    commit('setWindowSize', {width, height})
  }, 100, false))

  try {
    process.activateUvLoop()
    greenworks.init()
    store.commit('setGreenworks', greenworks)

    let user = greenworks.getSteamId()

    store.commit('setUser', user)

    greenworks.on('avatar-image-loaded', async (steamid, handler) => {
      if (handler < 1) return
      let avatarBuffer = await imageFromHandler(handler)

      let user = store.state.user
      user.avatar = avatarBuffer
      store.commit('setUser', user)
    })

    let handler = greenworks.getLargeFriendAvatar(user.steamId)

    if (handler > 0) {
      imageFromHandler(handler).then((avatarBuffer) => {
        store.commit('setAvatar', avatarBuffer)
      })
    }
  } catch (e) {
    console.log('Can\'t init greenworks')
    store.commit('setUser', 0)
  }
}

function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

async function imageFromHandler (handle) {
  var imageBuffer = greenworks.getImageRGBA(handle)
  var size = greenworks.getImageSize(handle)
  if (!size.height || !size.width) {
    console.log('Image corrupted. Please try again')
    return
  }
  var image = await new Jimp(size.height, size.width)
  for (var i = 0; i < size.height; ++i) {
    for (var j = 0; j < size.width; ++j) {
      var idx = 4 * (i * size.height + j)
      var hex = Jimp.rgbaToInt(imageBuffer[idx], imageBuffer[idx + 1],
        imageBuffer[idx + 2], imageBuffer[idx + 3])
      image.setPixelColor(hex, j, i)
    }
  }

  image.quality(90)
  return new Promise((resolve, reject) => {
    image.getBase64('image/jpeg', (err, image) => {
      if (err) return reject(err)
      return resolve(image)
    })
  })
}
