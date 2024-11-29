import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface ElectronAPI {
    sayHello: () => Promise<string>
    saveJson: (data: object) => Promise
    loadJson: () => Promise<Airdrop[]>
  }

  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
