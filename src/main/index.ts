import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { Airdrop } from './helper'

const originalLog = console.log

console.log = function (...args): void {
  const error = new Error()
  const stackLine = error.stack?.split('\n')[2]
  const match = stackLine?.match(/:(\d+):\d+\)?$/)
  const lineNumber = match ? match[1] : 'unknown'

  originalLog(`[Line ${lineNumber}]`, ...args)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//json file location
const jsonFilePath = join(app.getPath('userData'), 'data/data.json')

//json file folder name
const directory = dirname(jsonFilePath)
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 680,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false, // keep nodeIntegration off for security
      contextIsolation: true // recommended for security
    },
    resizable: false,
    alwaysOnTop: true,
    fullscreenable: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const saveJsonFile = (data: Airdrop): void => {
  const jsonData = JSON.stringify(data, null, 2) // Pretty-print the JSON
  fs.writeFileSync(jsonFilePath, jsonData, 'utf-8') // Write to file
  console.log('Data saved to JSON file')
}

// Load data from the JSON file
const loadJsonFile = (): object | null => {
  console.log({ directory, dirname: __dirname, json: jsonFilePath })
  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }
  // Check if the file exists
  if (!fs.existsSync(jsonFilePath)) {
    console.log('File does not exist. Creating default JSON file.')
    const defaultData = {}
    fs.writeFileSync(jsonFilePath, JSON.stringify(defaultData, null, 2), 'utf-8')
    return defaultData
  }
  // Load and parse the JSON file
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return null
  }
}

function sayHello(): void {
  return console.log(loadJsonFile())
}

ipcMain.handle('say-hello', () => {
  sayHello()
  return { success: true }
})
// IPC handlers for saving and loading data
ipcMain.handle('save-json', (_, data) => {
  saveJsonFile(data)
  return { success: true }
})

ipcMain.handle('load-json', () => {
  return loadJsonFile()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
