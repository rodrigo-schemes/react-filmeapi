import winston from 'winston';

export const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(
			({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}] ${message}`,
		),
	),
	transports: [new winston.transports.Console()],
});

export const log = {
	info: (msg: string) => logger.info(msg),
	warn: (msg: string) => logger.warn(msg),
	error: (msg: string) => logger.error(msg),
	debug: (msg: string) => logger.debug(msg),
};
