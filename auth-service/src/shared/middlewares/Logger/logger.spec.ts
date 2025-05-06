import { log, logger } from './logger';

describe('Logger', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('deve logar info', () => {
		const spy = jest.spyOn(logger, 'info').mockReturnValue(undefined as any);
		log.info('mensagem info');
		expect(spy).toHaveBeenCalledWith('mensagem info');
	});

	it('deve logar warn', () => {
		const spy = jest.spyOn(logger, 'warn').mockReturnValue(undefined as any);
		log.warn('mensagem warn');
		expect(spy).toHaveBeenCalledWith('mensagem warn');
	});

	it('deve logar error', () => {
		const spy = jest.spyOn(logger, 'error').mockReturnValue(undefined as any);
		log.error('mensagem error');
		expect(spy).toHaveBeenCalledWith('mensagem error');
	});

	it('deve logar debug', () => {
		const spy = jest.spyOn(logger, 'debug').mockReturnValue(undefined as any);
		log.debug('mensagem debug');
		expect(spy).toHaveBeenCalledWith('mensagem debug');
	});
});
