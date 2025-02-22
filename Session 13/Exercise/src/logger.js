import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: "debug.log" }),
        new transports.Console()
    ]
});