export enum LogLevel {
    OFF = 0,
    ERROR = 1,
    INFO = 2,
    DEBUG = 3,
}

export class Logger {
    private currentLevel: LogLevel;

    constructor(level: LogLevel = LogLevel.INFO) {
        this.currentLevel = level;
    }

    // Set the log level
    setLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    // Get the current timestamp
    private getTimestamp(): string {
        return new Date().toISOString();
    }

    // Log an info message
    info(message: string): void {
        if (this.currentLevel >= LogLevel.INFO) {
            console.info(`[${this.getTimestamp()}] [INFO]: ${message}`);
        }
    }

    // Log a debug message
    debug(message: string): void {
        if (this.currentLevel >= LogLevel.DEBUG) {
            console.debug(`[${this.getTimestamp()}] [DEBUG]: ${message}`);
        }
    }

    // Log an error message
    error(message: string, ...error: Error[]): void {
        if (this.currentLevel >= LogLevel.ERROR) {
            console.error(`[${this.getTimestamp()}] [ERROR]: ${message}`, ...error);
            // append erros
        }
    }

    isDebug(): boolean {
        return this.currentLevel >= LogLevel.DEBUG;
    }
}

export const NewLogger = (level: 'debug' | 'info' | 'error' | 'off'): Logger => {
    switch (level) {
        case 'debug':
            return new Logger(LogLevel.DEBUG);
        case 'info':
            return new Logger(LogLevel.INFO);
        case 'error':
            return new Logger(LogLevel.ERROR);
        case 'off':
            return new Logger(LogLevel.OFF);
        default:
            return new Logger(LogLevel.INFO);
    }
}