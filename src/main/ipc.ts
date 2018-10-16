import axios from 'axios'
import { IpcMain } from 'electron';

export default class IPCServer {

  ipcMain: IpcMain

  constructor(ipcMain: IpcMain) {
    this.ipcMain = ipcMain

    ipcMain.on('axios', async (event, ...args: any[]) => {
      const id = args.shift()
      try {
        const axiosRes = await (axios as any)(...args)
        event.sender.send(`axios:${id}`, {res: axiosRes})
      } catch (e) {
        event.sender.send(`axios:${id}`, {error: e})
      }
    })
  }
}
