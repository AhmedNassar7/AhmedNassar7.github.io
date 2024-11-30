export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

export class Logger {
  constructor(level = LogLevel.INFO) {
    this.level = level;
    this.levels = Object.values(LogLevel);
  }

  log(message, level = LogLevel.INFO) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString(); // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }
  }

  debug(message) {
    this.log(message, LogLevel.DEBUG);
  }

  info(message) {
    this.log(message, LogLevel.INFO);
  }

  warn(message) {
    this.log(message, LogLevel.WARN);
  }

  error(message) {
    this.log(message, LogLevel.ERROR);
  }

  shouldLog(level) {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }
}
