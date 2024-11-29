// src/logger.js
export function overrideConsoleLog(): void {
  const originalLog = console.log

  console.log = (...args): void => {
    const stack = new Error().stack
    const callerLine = stack?.split('\n')[2] // Get the second line in the stack trace
    const lineInfo = callerLine?.match(/\((.*):(\d+):(\d+)\)/) // Extract file, line, and column

    if (lineInfo) {
      const [_, file, line, column] = lineInfo
      originalLog(`[${file}:${line}:${column}]`, ...args)
    } else {
      originalLog('[unknown location]', ...args)
    }
  }
}
