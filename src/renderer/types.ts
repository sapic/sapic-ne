import { BrowserWindow } from "electron";

// Store
export interface RootState {
  background?: string
  bgInfo?: BackgroundInfo
  backgrounds: BackgroundInfo[]
  nextRandomBackgrounds: BackgroundInfo[]
  currWindow?: BrowserWindow,
  isMaximized: boolean
  windowWidth: number
  windowHeight: number
  previewScale: number

  greenworks?: Object
  user: SteamUserInfo
  bgSize: {
    w: number
    h: number
  }
}

export interface BackgroundInfo {
  game: string
  hls: [number, number, number]
  name: string
  pos: [number, number, number],
  price: number
  steamUrl: string
  url: string
}

export interface SteamUserInfo {
  accountId: number
  avatar: string
  isValid: number
  level: number
  screenName: string
  staticAccountId: string
  steamId: string
  type: {
    name: string
    value: number
  }
  flags: {
    anonymous: boolean
    anonymousGameServer: boolean
    anonymousGameServerLogin: boolean
    anonymousUser: boolean
    chat: boolean
    clan: boolean
    consoleUser: boolean
    contentServer: boolean
    gameServer: boolean
    gameServerPersistent: boolean
    individual: boolean
    lobby: boolean
  }
}

export const EmptyUser: SteamUserInfo = {
  accountId: 0,
  avatar: '',
  isValid: 0,
  level: 0,
  screenName: '',
  staticAccountId: '',
  steamId: '',
  type: {
    name: '',
    value: 0,
  },
  flags: {
    anonymous: false,
    anonymousGameServer: false,
    anonymousGameServerLogin: false,
    anonymousUser: false,
    chat: false,
    clan: false,
    consoleUser: false,
    contentServer: false,
    gameServer: false,
    gameServerPersistent: false,
    individual: false,
    lobby: false,
  }
}
