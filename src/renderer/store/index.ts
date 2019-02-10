import Vue from 'vue'
import Vuex from 'vuex'
import request from 'ajax-request'
import { shell, BrowserWindow } from 'electron'
// import fs from 'fs'

import broadcaster from './broadcaster'
import init from './init'
import { RootState, BackgroundInfo, SteamUserInfo, EmptyUser } from '../types'

Vue.use(Vuex)

let state: RootState = {
  // background: null,
  // bgInfo: BackgroundInfo(),
  backgrounds: Array<BackgroundInfo>(),
  nextRandomBackgrounds: Array<BackgroundInfo>(),
  // currWindow: null,
  isMaximized: false,
  windowWidth: 1280,
  windowHeight: 720,
  previewScale: 75,
  // greenworks: null,
  user: EmptyUser,
  bgSize: {
    w: 0,
    h: 0
  }
}

export const store = new Vuex.Store({
  plugins: [init, broadcaster],
  state: state,
  mutations: {
    setBackground (state, background) {
      state.background = background
    },
    setBackgroundURL (state, value) {
      state.background = value
    },
    setBackgrounds (state, backgrounds) {
      state.backgrounds = backgrounds
      state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
    },
    setCurrentWindow (state, window) {
      state.currWindow = window
    },
    setIsMaximized (state, max) {
      state.isMaximized = max
    },
    setWindowWidth (state, value) {
      state.windowWidth = value
    },
    setWindowHeight (state, value) {
      state.windowHeight = value
    },
    setWindowSize (state, size) {
      state.windowWidth = size.width
      state.windowHeight = size.height
    },
    randomBackground (state) {
      const newBg = state.nextRandomBackgrounds.shift()
      if (newBg) {
        state.background = newBg.steamUrl
        state.bgInfo = newBg
      }

      while (state.nextRandomBackgrounds.length < 3) {
        state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
        state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
        state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
        state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
        state.nextRandomBackgrounds.push(state.backgrounds[Math.floor(state.backgrounds.length * Math.random())])
      }
    },
    setPreviewScale (state, value) {
      state.previewScale = parseInt(value)
    },
    setGreenworks (state, value) {
      state.greenworks = value
    },
    setUser (state, value) {
      state.user = value
    },
    setBgSize (state, value) {
      state.bgSize = value
    },
    setState (state, newState) {
      state = newState
    },
    setAvatar (state, avatar: string) {
      state.user = {
        ...state.user,
        avatar: avatar
      }
    }
  },
  actions: {
    downloadZip ({ state }) {
      let bgSaveInfo = {
        url: state.background,
        images: [
          { name: 'Artwork_Middle.png', 'x': 508, 'y': 298, 'w': 506, 'h': 2000 },
          { name: 'Artwork_Right_Top.png', 'x': 1022, 'y': 298, 'w': 100, 'h': 2000 },
          { name: 'Avatar.png', 'x': 499, 'y': 34, 'w': 164, 'h': 164 }
        ]
      }

      let url = 'https://steam.design/raw/' + btoa(JSON.stringify(bgSaveInfo))
      shell.openExternal(url)
    },
    openDiscord () {
      shell.openExternal('https://discord.gg/jnqnHuX')
    },
    randomBackground ({ commit }) {
      commit('randomBackground')
    },
    getCurrentBg ({ state }) {
      var _goUrl = state.bgInfo && state.bgInfo.url
        ? 'https://steamcommunity.com/market/listings/' + state.bgInfo.url
        : 'https://images.google.com/searchbyimage?image_url=' + state.background
      shell.openExternal(_goUrl)
    },
    loadBackpack ({ state }) {
      request({
        url: 'https://steam.design/backpack/' + state.user.steamId + '/items.json',
        method: 'GET'
      }, function(err, res, data) {
        console.log(err, res, data)
      });
    }
  }
})

export default store
